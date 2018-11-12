import React from 'react';
import { Button, FormGroup, Input, Card, CardBody, CardHeader, CardFooter, Row, Col,
    Container, Alert, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';
import {Link, Redirect} from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import withAuth from "../withAuth";
import AuthService from "../AuthService";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const Greet = ({ name }) => <div>{name}</div>

class CursoEditar extends React.Component {

    constructor(props){
        super(props);
        this.state  = {
            id: null,
            estado: '',
            vacantes: '',
            numero: '',
            materia: '',
            profesor: '',
            periodo: '',
            removedHorarios: [],
            horarios: [{dia: '', sede: '', aula: '', horaInicio: '', horaFin: ''}],
            periodos: [],
            materias:[],
            profesores:[],
            formValid: true,
            error: false,
            success: false,
            redirect: false,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    componentDidMount () {
        let cursoId = this.props.history.location.pathname.split("/").pop();
        this.getCurso(cursoId);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/cursos'/>;
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
                                        Curso guardado satisfactoriamente
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
                                        <CardHeader>Curso</CardHeader>
                                        <CardBody>
                                            <AvForm onSubmit={this.handleFormSubmit}>
                                                <Row>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label>Estado</Label>
                                                            <Input
                                                                className="form-control"
                                                                value={this.state.estado}
                                                                name="estado"
                                                                type="select"
                                                                onChange={(event) => this.handleUserInput(event)}
                                                            >
                                                                <option value="ACTIVO">Activo</option>
                                                                <option value="INACTIVO">Inactivo</option>
                                                                <option value="ELIMINADO">Eliminado</option>
                                                            </Input>

                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label>Vacantes</Label>
                                                            <AvField
                                                                className="form-control"
                                                                placeholder="Vacantes"
                                                                value={this.state.vacantes}
                                                                name="vacantes"
                                                                type="number"
                                                                min="1"
                                                                onChange={(event) => this.handleUserInput(event)}
                                                                validate={{
                                                                    required: { value: true, errorMessage: 'Este campo es obligatorio.' },
                                                                    number: { value: true, errorMessage: 'Este campo debe ser un número.' },
                                                                    min: {value: 10, errorMessage: 'Al menos deben haber 10 vacantes'}
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label>Número</Label>
                                                            <AvField
                                                                className="form-control"
                                                                value={this.state.numero}
                                                                name="numero"
                                                                type="number"
                                                                min={1}
                                                                max={12}
                                                                onChange={(event) => this.handleUserInput(event)}
                                                                validate={{
                                                                    required: { value: true, errorMessage: 'Este campo es obligatorio.' },
                                                                    number: { value: true, errorMessage: 'Este campo debe ser un número.' },
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label>Período</Label>
                                                            <Input
                                                                className="form-control"
                                                                placeholder="Vacantes"
                                                                value={this.state.periodo}
                                                                name="periodo"
                                                                type="select"
                                                                min="1"
                                                                onChange={(event) => this.handleUserInput(event)}
                                                            >
                                                                {this.state.periodos.map(periodo =>
                                                                    <option key={periodo.id} value={periodo.id}>{periodo.cuatrimestre+"-"+periodo.anio}</option>
                                                                )};
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label>Materia</Label>
                                                            <Input
                                                                className="form-control"
                                                                value={this.state.materia}
                                                                name="materia"
                                                                type="select"
                                                                onChange={(event) => this.handleUserInput(event)}
                                                            >
                                                                {this.state.materias.map(materia =>
                                                                    <option key={materia.id} value={materia.id}>{materia.nombre+"("+materia.codigo+")"}</option>
                                                                )};
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <Label>Profesor</Label>
                                                            <Input
                                                                className="form-control"
                                                                value={this.state.profesor}
                                                                name="profesor"
                                                                type="select"
                                                                onChange={(event) => this.handleUserInput(event)}
                                                            >
                                                                {this.state.profesores.map(profesor =>
                                                                    <option key={profesor.id} value={profesor.id}>{profesor.nombre+", "+profesor.apellido}</option>
                                                                )};
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col md={2}><h3>Horarios</h3></Col>
                                                    <Col>
                                                        <Button type="submit" color="primary" disabled={this.state.horarios.length === 2} onClick={(event) => this.handleAddHorario(event)}>Agregar</Button>{' '}
                                                    </Col>
                                                </Row>
                                                {this.state.horarios.map((horario, index) =>
                                                    <Row>
                                                        <Col>
                                                            <FormGroup>
                                                                <Label>Día</Label>
                                                                <Input
                                                                    className="form-control"
                                                                    value={horario.dia}
                                                                    name={`dia_${index}`}
                                                                    type="select"
                                                                    onChange={(event) => this.handleUserInputHorario(event)}
                                                                >
                                                                    <option value="LUNES">Lunes</option>
                                                                    <option value="MARTES">Martes</option>
                                                                    <option value="MIERCOLES">Miércoles</option>
                                                                    <option value="JUEVES">Jueves</option>
                                                                    <option value="VIERNES">Viernes</option>
                                                                    <option value="SABADO">Sábado</option>
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col>
                                                            <FormGroup>
                                                                <Label>Sede</Label>
                                                                <Input
                                                                    className="form-control"
                                                                    value={horario.sede}
                                                                    name={`sede_${index}`}
                                                                    type="select"
                                                                    onChange={(event) => this.handleUserInputHorario(event)}
                                                                >
                                                                    <option value="PC">Paseo Colon</option>
                                                                    <option value="LH">Las Heras</option>
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col>
                                                            <FormGroup>
                                                                <Label>Aula</Label>
                                                                <AvField
                                                                    className="form-control"
                                                                    value={horario.aula}
                                                                    name={`aula_${index}`}
                                                                    type="text"
                                                                    onChange={(event) => this.handleUserInputHorario(event)}
                                                                    validate={{
                                                                        required: { value: true, errorMessage: 'Campo obligatorio.' }
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col>
                                                            <FormGroup>
                                                                <Label>Hora Inicio</Label>
                                                                <AvField
                                                                    className="form-control"
                                                                    value={horario.horaInicio}
                                                                    name={`horaInicio_${index}`}
                                                                    index={index}
                                                                    type="text"
                                                                    onChange={(event) => this.handleUserInputHorario(event)}
                                                                    validate={{
                                                                        required: { value: true, errorMessage: 'Campo obligatorio.' },
                                                                        pattern: { value: '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$', errorMessage: 'Formato inválido HH:MM.' },
                                                                        async: this.validate
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col>
                                                            <FormGroup>
                                                                <Label>Hora Fin</Label>
                                                                <AvField
                                                                    className="form-control"
                                                                    value={horario.horaFin}
                                                                    name={`horaFin_${index}`}
                                                                    type="text"
                                                                    onChange={(event) => this.handleUserInputHorario(event)}
                                                                    validate={{
                                                                        required: { value: true, errorMessage: 'Campo obligatorio.' },
                                                                        pattern: { value: '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$', errorMessage: 'Formato inválido HH:MM.' },
                                                                        async: this.validate
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col style={{paddingTop: 30+'px'}}>
                                                            <Button color="danger" value={horario.id} onClick={(event) => this.handleDeleteHorario(event, horario.id)} ><FontAwesomeIcon icon={faTrash} /></Button>
                                                        </Col>
                                                    </Row>

                                                )}

                                            </AvForm>
                                        </CardBody>
                                        <CardFooter>
                                            <Button type="submit" color="primary" disabled={!this.state.formValid} onClick={this.handleFormSubmit}>Guardar</Button>{' '}
                                            <Button color="secondary" tag={Link} to={`/cursos`} >Volver</Button>
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
        let periodo = this.state.periodos.filter(periodo => periodo.id === parseInt(this.state.periodo))[0];
        let profesor = this.state.profesores.filter(profesor => profesor.id === parseInt(this.state.profesor))[0];
        let materia = this.state.materias.filter(materia => materia.id === parseInt(this.state.materia))[0];

        let data = {
            id: this.state.id,
            estado: this.state.estado,
            vacantes: this.state.vacantes,
            numero: this.state.numero,
            periodo: periodo,
            materia: materia,
            profesor: profesor,
            horarios: this.state.horarios
        };
        const headers = {};
        headers['Authorization'] = 'Bearer ' + this.Auth.getToken();
        headers['Content-Type'] = 'application/json'
        return fetch(`http://localhost:8080/api/cursosAndHorarios`,
            {
                headers: headers,
                method: 'PUT',
                body: JSON.stringify(data)
            }
        ).then((resp) => resp.json()
        ).then(data => {
            toast(<Greet name="Curso guardado correctamente" />);
            this.setState({
                redirect: true,
                success: true,
            });
        }).catch(err => {
            this.setState({
                error: true,
            });
        });
    }

    handleUserInputHorario (e) {
        const names = e.target.name.split('_');
        const index = names.pop();
        const name = names.pop();
        const value = e.target.value;
        let horarios = this.state.horarios;
        if (name === 'dia') {
            horarios[index].dia = value;
        } else if (name === 'sede') {
            horarios[index].sede = value;
        } else if (name === 'aula') {
            horarios[index].aula = value;
        } else if (name === 'horaInicio') {
            horarios[index].horaInicio = value;
        } else if (name === 'horaFin') {
            horarios[index].horaFin = value;
        }
        this.setState({horarios: horarios},() => { this.handleValidate() });
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => { this.handleValidate() });
    }

    handleValidate() {
        let horarios = this.state.horarios;
        let valido;
        let aulaValid = false;
        let horaInicioValid = false;
        let horaFinValid = false;
        let vacantesValid = (parseInt(this.state.vacantes) > 9);
        let numeroValid = (parseInt(this.state.numero) > 0);
        valido = vacantesValid && numeroValid && horarios.length > 0;
        if (valido) {
            const horaRegex = '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';
            for(let i = 0; i < horarios.length; i++) {
                aulaValid = horarios[i].aula.length > 0;
                horaInicioValid = horarios[i].horaInicio.length > 0 && horarios[i].horaInicio.match(horaRegex);
                horaFinValid = horarios[i].horaFin.length > 0 && horarios[i].horaFin.match(horaRegex);
                valido = aulaValid && horaInicioValid && horaFinValid;
                if (!valido){
                    break;
                }
            }
        }
        this.setState({formValid: valido});
    }

    handleAddHorario() {
        let horarios = this.state.horarios;
        let removedHorarios = this.state.removedHorarios;
        let horario;
        if (removedHorarios.length === 0) {
            horario = {
                id: null,
                dia: 'LUNES',
                sede: 'PC',
                aula: '',
                horaInicio: '',
                horaFin: ''
            }
        } else {
            horario = removedHorarios.pop();
        }
        horarios.push(horario);
        this.setState({
            horarios: horarios,
            removedHorarios: removedHorarios
        },() => { this.handleValidate() })
    }

    handleDeleteHorario(event, id) {
        let horarios = this.state.horarios;
        let removedHorarios = this.state.removedHorarios;
        let horario;
        for(let i = 0; i < horarios.length; i++){
            horario = horarios[i];
            if (horario.id === id) {
                horario.dia = 'LUNES';
                horario.sede = 'PC';
                horario.aula = '';
                horario.horaInicio = '';
                horario.horaFin = '';
                removedHorarios.push(horario);
                horarios.splice(i, 1);
                break;
            }
        }
        this.setState({
            horarios: horarios,
            removedHorarios: removedHorarios
        },() => { this.handleValidate() })
    }

    validate(value, ctx, input, cb) {
        /*console.log(value);
        console.log(ctx);
        console.log(input);
        console.log(cb);*/

    }

    getCurso(cursoId) {
        let id, estado, vacantes, numero, profesor, periodo, materia, horarios, profesores, materias, periodos;
        this.Auth.fetch(`http://localhost:8080/api/cursos/${cursoId}`, {
            method: 'GET',
        }).then(res => {
            id = res.id;
            estado = res.estado;
            vacantes = res.vacantes;
            numero = res.numero;
            profesor = res.profesor.id;
            periodo = res.periodo.id;
            materia = res.materia.id;
            horarios = res.horarios;
            this.Auth.fetch(`http://localhost:8080/api/profesors`, {
                method: 'GET'
            }).then(res => {
                profesores = res;
                this.Auth.fetch(`http://localhost:8080/api/materias`, {
                    method: 'GET'
                }).then(res => {
                    materias = res;
                    this.Auth.fetch(`http://localhost:8080/api/periodos`, {
                        method: 'GET'
                    }).then(res => {
                        periodos = res;
                        this.setState({
                            id: id,
                            estado: estado,
                            vacantes: vacantes,
                            numero: numero,
                            profesor: profesor,
                            periodo: periodo,
                            materia: materia,
                            horarios: horarios,
                            profesores: profesores,
                            materias: materias,
                            periodos: periodos,
                        })
                    });
                });
            });

        });
    }
}


export default withAuth(CursoEditar);
