import React from 'react';
import { Button, FormGroup, CustomInput, Input, FormFeedback, Card, CardBody, CardHeader, CardFooter, Row, Col,
    Container, Alert, Label } from 'reactstrap';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import withAuth from "../withAuth";
import AuthService from '../AuthService';


class AlumnosCargaMasiva extends React.Component {
    constructor(props){
        super(props);
        this.state  = {
            selectedFile: null,
            fileValid: true,
            fileValidSize: true,
            fileValidExtension: true,
            formValid: false,
            warningMessages: [],
            errorMessages: [],
            processedSuccess: 0
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className="content">
                    <div className="content-inside" id="content">
                        <Container>
                            <Row className={this.state.processedSuccess === 0 ? 'd-none' : ''}>
                                <Col sm="12">
                                    <Alert color="success">
                                        Se procesaron {this.state.processedSuccess} registros satisfactoriamente
                                    </Alert>
                                </Col>
                            </Row>
                            <Row className={this.state.warningMessages.length === 0 ? 'd-none' : ''}>
                                <Col sm="12">
                                    <Alert color="warning">
                                        <ul>
                                            {this.state.warningMessages.map(function(name){
                                                return <li>{name}</li>;
                                            })}
                                        </ul>
                                    </Alert>
                                </Col>
                            </Row>
                            <Row className={this.state.errorMessages.length === 0 ? 'd-none' : ''}>
                                <Col sm="12">
                                    <Alert color="danger">
                                        <ul>
                                            {this.state.errorMessages.map(function(name){
                                                return <li>{name}</li>;
                                            })}
                                        </ul>
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>Cargar Alumnos</CardHeader>
                                        <CardBody>
                                            <form encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                                                <Row form>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label>Seleccione un archivo CSV que contenga los alumnos a cargar</Label>
                                                            <Input
                                                                type="file"
                                                                id="upload_file"
                                                                name="selectedFile"
                                                                label="Yo, pick a file!"
                                                                onChange={(event) => this.handleSelectedFile(event)}
                                                                valid={this.state.fileValid }
                                                                invalid={!this.state.fileValid}
                                                            />
                                                            <FormFeedback invalid>
                                                                <p>{!this.state.fileValidExtension ? "La extensión debe ser CSV" : ""}</p>
                                                                <p>{!this.state.fileValidSize ? "El tamaño debe ser menor a 5MB" : ""}</p>
                                                            </FormFeedback>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button type="submit" color="primary" disabled={!this.state.formValid} onClick={this.handleFormSubmit}>Procesar</Button>{' '}
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

    handleFormSubmit(event){
        event.preventDefault();
        if (!this.state.formValid) {
            return;
        }
        let formData = new FormData();
        const fileInput = document.querySelector('#upload_file');
        formData.append("file", fileInput.files[0]);
        const headers = {};
        headers['Authorization'] = 'Bearer ' + this.Auth.getToken();
        return fetch(`http://localhost:8080/api/administradores/cargarAlumnos`,
            {
                headers: headers,
                method: 'POST',
                body: formData
            }
        )
        .then((resp) => resp.json())
        .then(data => {
            let warnings = data.warningMessages;
            let errors = data.errorMessages;
            let totalSuccess = data.successCount;
            this.setState({
                    warningMessages: warnings,
                    errorMessages: errors,
                    processedSuccess: totalSuccess
                });

        }).catch(err =>{
        });
    }

    handleSelectedFile(event) {
        const name = event.target.name;
        const value = event.target.files[0];
        this.setState(
            {
                selectedFile: event.target.files[0]
            },
            () => { this.validateField(name, value) }
        );
    }

    validateField(fieldName, value) {
        if (value === undefined) {
            this.setState(
                {
                    fileValid: true,
                    fileValidSize: true,
                    fileValidExtension: true,
                    selectedFile: null
                }, this.validateForm
            );
            return;
        }
        let fileValidSize = this.state.fileValidSize;
        let fileValidExtension = this.state.fileValidExtension;
        switch(fieldName) {
            case 'selectedFile':
                const allowedExtensions = /(\.csv)$/i;
                fileValidSize = (value.size <= 5*1024);
                fileValidExtension = allowedExtensions.exec(value.name) !== null;
                break;
            default:
                break;
        }
        this.setState(
            {
                fileValid: (fileValidSize && fileValidExtension),
                fileValidSize: fileValidSize,
                fileValidExtension: fileValidExtension,
            }, this.validateForm
        );
    }

    validateForm() {
        this.setState({formValid: this.state.fileValidSize && this.state.fileValidExtension && this.state.selectedFile != null});
    }
}


export default withAuth(AlumnosCargaMasiva);
