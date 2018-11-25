import React, { Component } from 'react';
import { Button, FormGroup, Input, FormFeedback, Card, CardTitle, CardBody, Row, Col, Container, Alert } from 'reactstrap';
import './Login.css';
import AuthService from './AuthService';

class Login extends Component {
    constructor(props){
        super(props);
        this.state  = {
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: true,
            passwordValid: true,
            formValid: false,
            globalError:''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (
            <div className="center">
                <Container>
                    <Row className={this.state.globalError === '' ? 'd-none' : ''}>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Alert color="danger">
                                {this.state.globalError}
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <Card body outline color="secondary" width="50%">
                                <CardTitle className="text-center">Login</CardTitle>
                                <CardBody>
                                    <form onSubmit={this.handleFormSubmit}>
                                        <FormGroup>
                                            <Input
                                                className="form-control"
                                                placeholder="E-mail"
                                                value={this.state.email}
                                                name="email"
                                                type="email"
                                                onChange={(event) => this.handleUserInput(event)}
                                                valid={this.state.emailValid}
                                                invalid={!this.state.emailValid}
                                            />
                                            <FormFeedback invalid>
                                                El e-mail no es correcto
                                            </FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input
                                                className="form-control"
                                                placeholder="Contraseña"
                                                value={this.state.password}
                                                name="password"
                                                type="password"
                                                valid={!this.state.passwordValid}
                                                invalid={!this.state.passwordValid}
                                                onChange={(event) => this.handleUserInput(event)}
                                            />
                                            <FormFeedback invalid>
                                                El password debe tener al menos 2 caracteres
                                            </FormFeedback>
                                        </FormGroup>
                                        <FormGroup className="text-center">
                                            <Button type="submit" color="primary" disabled={!this.state.formValid}>Ingresar</Button>{' '}
                                        </FormGroup>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    handleFormSubmit(e){
        e.preventDefault();
        if (!this.state.formValid) {
            return;
        }
        this.Auth.login(this.state.email,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                this.setState({
                    globalError: err
                });
            })
    }


    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' es inválido';
                break;
            case 'password':
                passwordValid = value.length >= 2;
                fieldValidationErrors.password = passwordValid ? '': ' es muy corto';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    validationStatus(error) {
        return(error.length === 0 ? 'valid' : 'invalid');
    }
}

export default Login;
