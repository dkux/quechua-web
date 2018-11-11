import React from 'react';
import { Button, FormGroup, Input, FormFeedback, Card, CardBody, CardHeader, CardFooter, Row, Col,
    Container, Alert, Label } from 'reactstrap';
import {Link} from "react-router-dom";
import DatePicker from "react-datepicker";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import withAuth from "../withAuth";
import AuthService from "../AuthService";

import * as moment from 'moment';
import 'moment/locale/es';
import "react-datepicker/dist/react-datepicker.css";

class PeriodoEditar extends React.Component {

    constructor(props){
        super(props);
        this.state  = {
            id: null,
            fechaInicio: moment(),
            fechaInicioValid: true,
            fechaFin: moment(),
            fechaFinValid: true,
            actividad: '',
            formValid: true,
            success: false,
            error: false
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChangeFechaInicio = this.handleChangeFechaInicio.bind(this);
        this.handleChangeFechaFin = this.handleChangeFechaFin.bind(this);
        this.handleChangeActividad = this.handleChangeActividad.bind(this);

        this.Auth = new AuthService();
    }
    componentDidMount () {
        let periodoId = this.props.history.location.pathname.split("/").pop();
        this.getPeriodo(periodoId);
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className="content">
                    <div className="content-inside" id="content">
                        <Container>
                            <Row className={!this.state.success ? 'd-none' : ''}>
                                <Col sm="12">
                                    <Alert color="success">
                                        Periodo gurdado satisfactoriamente
                                    </Alert>
                                </Col>
                            </Row>
                            <Row className={!this.state.error ? 'd-none' : ''}>
                                <Col sm="12">
                                    <Alert color="danger">
                                        Ha sucedido un error, por favor vuelva a intentar nuevamente
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>Periodo administrativo</CardHeader>
                                        <CardBody>
                                            <form onSubmit={this.handleFormSubmit}>
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <Label>Fecha de Inicio</Label>
                                                            <DatePicker
                                                                locale="es"
                                                                selectsStart
                                                                className="form-control"
                                                                selected={this.state.fechaInicio}
                                                                startDate={this.state.fechaInicio}
                                                                endDate={this.state.fechaFin}
                                                                onChange={this.handleChangeFechaInicio}
                                                                valid={this.state.fechaInicioValid}
                                                                invalid={!this.state.fechaInicioValid}
                                                            />
                                                            <FormFeedback invalid>
                                                                La fecha de inicio es requerida
                                                            </FormFeedback>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup>
                                                            <Label>Fecha de Fin</Label>
                                                            <DatePicker
                                                                locale="es"
                                                                selectsEnd
                                                                className="form-control"
                                                                selected={this.state.fechaFin}
                                                                startDate={this.state.fechaInicio}
                                                                endDate={this.state.fechaFin}
                                                                onChange={this.handleChangeFechaFin}
                                                                invalid
                                                            />
                                                            <FormFeedback invalid>
                                                                La fecha de fin es requerida
                                                            </FormFeedback>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col>
                                                        <FormGroup>
                                                            <Label>Actividad</Label>
                                                            <Input
                                                                type="select"
                                                                value={this.state.actividad}
                                                                onChange={this.handleChangeActividad}
                                                            >
                                                                <option value="CONSULTAR_PRIORIDAD">Consultar prioridades</option>
                                                                <option value="INSCRIPCION_COLOQUIO">Inscripción a coloquios</option>
                                                                <option value="INSCRIPCION_CURSADA">Inscripcion a Cursadas</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button type="submit" color="primary" disabled={!this.state.formValid} onClick={this.handleFormSubmit}>Guardar</Button>{' '}
                                            <Button color="secondary" tag={Link} to={`/periodos`} >Volver</Button>
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
        let data = {
            id: this.state.id,
            fechaInicio: this.state.fechaInicio,
            fechaFin: this.state.fechaFin,
            actividad: this.state.actividad
        };
        const headers = {};
        headers['Authorization'] = 'Bearer ' + this.Auth.getToken();
        headers['Content-Type'] = 'application/json'
        return fetch(`http://localhost:8080/api/periodo-administrativos`,
            {
                headers: headers,
                method: 'PUT',
                body: JSON.stringify(data)
            }
        )
            .then((resp) => resp.json())
            .then(data => {
                this.setState({
                    success: true,
                });
            }).catch(err =>{
                this.setState({
                    error: true,
                });
            });
    }

    handleChangeFechaInicio(value) {
        this.setState({
            fechaInicio: value,
            fechaInicioValid : value !== null
        }, this.validateForm);
    }

    handleChangeFechaFin(value) {
        this.setState({
            fechaFin: value,
            fechaFinValid : value !== null
        }, this.validateForm);
    }

    handleChangeActividad(event) {
        this.setState({
            actividad: event.target.value,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.fechaInicioValid && this.state.fechaFinValid});
    }


    getPeriodo(periodoId) {
        const headers = {};
        headers['Authorization'] = 'Bearer ' + this.Auth.getToken();
        return fetch(`http://localhost:8080/api/periodo-administrativos/${periodoId}`, {
            headers: headers,
            method: 'GET'
        }).then((resp) => resp.json()
        ).then(data => {
            this.setState({
                id: data.id,
                fechaInicio: moment(data.fechaInicio, 'YYYY-MM-DD'),
                fechaFin: moment(data.fechaFin, 'YYYY-MM-DD'),
                actividad: data.actividad

            });
        }).catch(err => {
        });
    }
}


export default withAuth(PeriodoEditar);
