import React from 'react';
import { Button, FormGroup, Input, FormFeedback, Card, CardBody, CardHeader, CardFooter, Row, Col,
    Container, Alert, Label } from 'reactstrap';
import {Link, Redirect} from "react-router-dom";
import DatePicker from "react-datepicker";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import withAuth from "../withAuth";
import AuthService from "../AuthService";

import * as moment from 'moment';
import 'moment/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import {toast} from "react-toastify";

const Greet = ({ name }) => <div>{name}</div>

class PeriodoCrear extends React.Component {

    constructor(props){
        super(props);
        this.state  = {
            id: null,
            descripcion: '',
            fechaInicio: moment(),
            fechaInicioValid: true,
            fechaFin: moment(),
            fechaFinValid: true,
            actividad: '',
            formValid: true,
            success: false,
            error: false,
            redirect: false,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChangeFechaInicio = this.handleChangeFechaInicio.bind(this);
        this.handleChangeFechaFin = this.handleChangeFechaFin.bind(this);
        this.handleChangeActividad = this.handleChangeActividad.bind(this);

        this.Auth = new AuthService();
    }

    componentDidMount () {
        if (!this.props.user.authorities.includes('ROLE_ADMIN')) {
            this.props.history.replace('/error/401');
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/periodos'/>;
        }
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
                                <Col sm={12}>
                                    <Alert color="secondary">
                                        <h5>Consultar prioridades</h5>
                                        <ul>
                                            <li>Permite a los alumnos consultar su prioridad</li>
                                        </ul>
                                        <h5>Inscripción a coloquios</h5>
                                        <ul>
                                            <li>Permite generar inscripciones a finales</li>
                                        </ul>
                                        <h5>Inscripcion a Cursadas</h5>
                                        <ul>
                                            <li>Representa el período de inscripción a cursadas</li>
                                        </ul>
                                        <h5>Creación de coloquios</h5>
                                        <ul>
                                            <li>Permite generar fechas de finales sobre el rango de fechas que representa</li>
                                            <li>Representa el periodo donde los estudiantes pueden rendir coloquios</li>
                                        </ul>
                                        <h5>Desinscripcion cursada</h5>
                                        <ul>
                                            <li>Representa el período de desinscripción a cursadas, antes de comenzar el cuatrimestre</li>
                                        </ul>
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>Crear Periodo administrativo</CardHeader>
                                        <CardBody>
                                            <form onSubmit={this.handleFormSubmit}>
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <Label>Descripcion</Label>
                                                            <Input
                                                                className="form-control"
                                                                value={this.state.descripcion}
                                                                type="text"
                                                                onChange={(event) => this.handleDescripcionInput(event)}
                                                            />
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
                                                                <option value="CREACION_COLOQUIO">Creación de coloquios</option>
                                                                <option value="DESINSCRIPCION_CURSADA">Desinscripcion cursada</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
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
            actividad: this.state.actividad,
            descripcion: this.state.descripcion
        };
        const headers = {};
        headers['Authorization'] = 'Bearer ' + this.Auth.getToken();
        headers['Content-Type'] = 'application/json'
        return fetch(`http://localhost:8080/api/periodo-administrativos`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(data)
            }
        )
            .then((resp) => resp.json())
            .then(data => {
                toast(<Greet name="Periodo guardado correctamente" />);
                this.setState({
                    redirect: true,
                    success: true,
                });
            }).catch(err =>{
                this.setState({
                    error: true,
                });
            });
    }

    handleDescripcionInput(e) {
        const value = e.target.value;
        this.setState( {
            descripcion: value
        }, this.validateForm);
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

}


export default withAuth(PeriodoCrear);
