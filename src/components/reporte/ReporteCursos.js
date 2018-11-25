import React from 'react'
import { Button, FormGroup, Input, Card, CardBody, CardHeader, CardFooter, Row, Col,
    Container, Alert, Label } from 'reactstrap';
import { render } from 'react-dom'
import {Link} from "react-router-dom";
import MateriasChart from './MateriasChart'
import CursosChart from './CursosChart'

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import withAuth from "../withAuth";
import AuthService from "../AuthService";



class ReporteCursos extends React.Component {

    constructor(props){
        super(props);
        this.state  = {
            departamentoId: undefined,
            periodoId: undefined,
            materiaId: undefined,
            validForm: false,
            departamentos: [],
            periodos:[],
            materiasChartData: [],
            cursosChartData:[],
        };
        this.Auth = new AuthService();
    }


    componentWillMount() {
        this.getData();
    }

    render () {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className="content">
                    <div className="content-inside" id="content">
                        <Container fluid={true}>

                            <Row>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>Reporte de inscripciones</CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col sm={"6"}>
                                                    <FormGroup>
                                                        <Label>Departamento</Label>
                                                        <Input type="select"
                                                               name="departamentoId"
                                                               value={ this.state.departamentoId }
                                                               onChange={ (e) => { this.handleUserInput(e) } }
                                                        >
                                                            <option value="">Seleccione un Departamento</option>
                                                            {this.state.departamentos.map(departamento =>
                                                                <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
                                                            )};
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                <Col sm={"6"}>
                                                    <FormGroup>
                                                        <Label for="departamentoSelect">Período</Label>
                                                        <Input type="select"
                                                               name="periodoId"
                                                               value={ this.state.periodoId }
                                                               onChange={ (e) => { this.handleUserInput(e) } }
                                                        >
                                                            <option value="">Seleccione un Periodo</option>
                                                            {this.state.periodos.map(periodo =>
                                                                <option key={periodo.id} value={periodo.id}>{periodo.cuatrimestre+"-"+periodo.anio}</option>
                                                            )};
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={"6"}>
                                                    <MateriasChart
                                                        chartData={this.state.materiasChartData}
                                                        onClickMateria={ (e) => { this.handleClickMateria(e) }}
                                                    />
                                                </Col>
                                                <Col sm={"6"}>
                                                    <CursosChart
                                                        chartData={this.state.cursosChartData}
                                                    />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                        <CardFooter>
                                            <Button color="secondary" tag={Link} to={`/`} >Volver</Button>
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

    handleUserInput(e){
        const name = e.target.name;
        const value = e.target.value;
        let departamentoId = this.state.departamentoId;
        let periodoId = this.state.periodoId;
        let validForm;
        let obj  = {};
        if (name === "departamentoId") {
            obj['departamentoId'] = value;
            departamentoId = value;
        } else {
            obj['periodoId'] = value;
            periodoId = value;
        }
        obj['materiaId'] = undefined;
        validForm = (departamentoId !== undefined && departamentoId !== "" && periodoId !== undefined && periodoId !== "");
        obj['validForm'] = validForm;
        console.log(obj);
        this.setState(obj);
        console.log(this.state);
        if (validForm) {
            this.getMateriasChartData(departamentoId, periodoId);
        } else {
            this.setState({
                materiasChartData: [],
                cursosChartData:[]
            });
        }
    }

    getMateriasChartData(departamentoId, periodoId){
        this.Auth.fetch(`http://localhost:8080/api/reportes/materias?departamentoId=`+departamentoId+`&periodoId=`+periodoId+``, {
            method: 'GET'
        }).then(res => {
            this.setState({
                materiasChartData: res,
                cursosChartData:[]
            });
        });
    }

    getData(){
        let departamentos, periodos;
        this.Auth.fetch(`http://localhost:8080/api/departamentos`, {
            method: 'GET'
        }).then(res => {
            departamentos = res;
            this.Auth.fetch(`http://localhost:8080/api/periodos`, {
                method: 'GET'
            }).then(res => {
                periodos = res;
                this.setState({
                    departamentos: departamentos,
                    periodos: periodos
                })
            });
        });
    }

    handleClickMateria(materiaId) {
        this.Auth.fetch(`http://localhost:8080/api/reportes/cursos?materiaId=`+materiaId+`&periodoId=`+this.state.periodoId+``, {
            method: 'GET'
        }).then(res => {
            this.setState({
                cursosChartData: res,
            });
        });
    }
}

export default withAuth(ReporteCursos);
