import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:8080'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        // Get a token
        return this.fetch(`${this.domain}/api/authenticate`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.id_token);
            return Promise.resolve(this._getUserData());
        }).catch(err =>{
            return Promise.reject("Usuario o contraseña invalido");
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to sessionStorage
        console.log(idToken);
        sessionStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from sessionStorage
        return sessionStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from sessionStorage
        sessionStorage.removeItem('id_token');
    }

    getProfile() {
        return JSON.parse(sessionStorage.getItem("user"));
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    _getUserData() {
        return this.fetch(`${this.domain}/api/account`, {
            method: 'GET',
        }).then(res => {
            if (!res.authorities.includes('ROLE_ADMIN') && !res.authorities.includes('ROLE_ADM_DPTO')) {
                this.logout();
                return Promise.reject("No es un usuario Admin");
            }
            sessionStorage.setItem("user", JSON.stringify(res));
            return Promise.resolve(res);
        });
    }
}
