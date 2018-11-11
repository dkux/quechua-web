import React from 'react';

import Header from "../layout/Header";
import {Alert} from 'reactstrap';
import Footer from "../layout/Footer";
import withAuth from "../withAuth";
import AuthService from "../AuthService";
const Auth = new AuthService();

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        };

    }
    componentWillMount() {
        let userName = this.props.user.firstName + " " + this.props.user.lastName;
        this.setState({
            userName: userName
        })
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className="content">
                    <div className="content-inside" id="content ">
                        <Alert color="primary">
                            Bienvenido {this.state.userName}!!
                        </Alert>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withAuth(MainPage);
