import React from 'react';
import { Button, FormGroup, Input, FormFeedback, Card, CardBody, CardHeader, CardFooter, Row, Col,
    Container, Alert, Label } from 'reactstrap';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import withAuth from "../withAuth";

class CursoCrear extends React.Component {
    constructor(props){
        super(props);
        this.state  = {
            estado: '',
            vacantes: '',
            numero: '',
            materia: '',
            profesor: '',
            periodo: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            globalError:''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className="content">
                    <div className="content-inside" id="content">
                        <Container>
                            <Row className={this.state.globalError === '' ? 'd-none' : ''}>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>
                                    <Alert color="danger">
                                        {this.state.globalError}
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>Crear Curso</CardHeader>
                                        <CardBody>
                                            <form onSubmit={this.handleFormSubmit}>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="exampleCity">Estado</Label>
                                                            <Input
                                                                className="form-control"
                                                                value={this.state.estado}
                                                                name="estado"
                                                                type="select"
                                                                onChange={(event) => this.handleUserInput(event)}
                                                                valid={this.state.emailValid}
                                                                invalid={!this.state.emailValid}
                                                            >
                                                                <option value="ACTIVO">Activo</option>
                                                                <option value="INACTIVO">Inactivo</option>
                                                                <option value="ELIMINADO">Eliminado</option>
                                                            </Input>
                                                            <FormFeedback invalid>
                                                                El e-mail no es correcto
                                                            </FormFeedback>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="exampleCity">Vacantes</Label>
                                                            <Input
                                                                className="form-control"
                                                                placeholder="Vacantes"
                                                                value={this.state.vacantes}
                                                                name="vacantes"
                                                                type="number"
                                                                min="1"
                                                                valid={!this.state.passwordValid}
                                                                invalid={!this.state.passwordValid}
                                                                onChange={(event) => this.handleUserInput(event)}
                                                            />
                                                            <FormFeedback invalid>
                                                                El password debe tener al menos 2 caracteres
                                                            </FormFeedback>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="exampleCity">Número</Label>
                                                            <Input
                                                                className="form-control"
                                                                value={this.state.numero}
                                                                name="numero"
                                                                type="number"
                                                                min={1}
                                                                max={12}
                                                            />
                                                            <FormFeedback invalid>
                                                                El e-mail no es correcto
                                                            </FormFeedback>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label for="exampleCity">Período</Label>
                                                            <Input
                                                                className="form-control"
                                                                placeholder="Vacantes"
                                                                value={this.state.vacantes}
                                                                name="vacantes"
                                                                type="number"
                                                                min="1"
                                                                valid={!this.state.passwordValid}
                                                                invalid={!this.state.passwordValid}
                                                                onChange={(event) => this.handleUserInput(event)}
                                                            />
                                                            <FormFeedback invalid>
                                                                El password debe tener al menos 2 caracteres
                                                            </FormFeedback>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>


                                            </form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button type="submit" color="primary" disabled={!this.state.formValid}>Registrar</Button>{' '}
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <Footer />
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
}


export default withAuth(CursoCrear);
