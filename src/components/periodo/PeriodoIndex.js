import React from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Col, Card, CardHeader, CardBody, Row, Container, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import withAuth from "../withAuth";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AuthService from "../AuthService";

import * as moment from 'moment';


const columns = [
    {
        dataField: 'fechaInicio',
        text: 'Fecha Inicio',
        sort: true,
        formatter: fechaFormatter
    }, {
        dataField: 'fechaFin',
        text: 'Fecha Fin',
        sort: true,
        formatter: fechaFormatter
    }, {
        dataField: 'actividad',
        text: 'Actividad',
        sort: true,
        formatter: actividadFormatter
    }
];

class PeriodoIndex extends React.Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            data: [],
            showDialog: false,
            periodoId: null
        };
    }

    componentWillMount(){
        this.getPeriodos();
    }

    render() {
        return (
            <div>
                <Header history={this.props.history}/>
                <div className="content">
                    <div className="content-inside" id="content">
                        <Container>
                            <Row>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>Periodos administrativo</CardHeader>
                                        <CardBody>
                                            <BootstrapTable keyField='id' data={this.state.data} columns={ columns } striped hover bootstrap4 />
                                        </CardBody>
                                        <CardFooter>
                                            <Button color="primary" tag={Link} to={`/periodos/crear`} >Crear Periodo</Button>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <Footer/>

            </div>
        );

    }

    getPeriodos(){
        const headers = {};
        headers['Authorization'] = 'Bearer ' + this.Auth.getToken();
        return fetch(`http://localhost:8080/api/periodo-administrativos`,
            {
                headers: headers,
                method: 'GET'
            }
        )
        .then((resp) => resp.json())
        .then(data => {
            this.setState({
                data: data
            });
        })
        .catch(err =>{
        });
    }
}

function actividadFormatter(cell) {
    if (cell === 'INSCRIPCION_CURSADA') {
        return 'Inscripción a cursadas';
    } else if (cell === 'CONSULTAR_PRIORIDAD') {
        return 'Consultar prioridades';
    } else if (cell === 'INSCRIPCION_COLOQUIO') {
        return 'Inscripción a coloquios';
    } else if (cell === 'CREACION_COLOQUIO') {
        return "Creación de coloquios";
    } else if (cell === 'DESINSCRIPCION_CURSADA') {
        return 'Desinscripcion cursada';
    }
    return cell;
}

function fechaFormatter(cell) {
    return moment(cell).format("DD/MM/YYYY")
}

function handleDelete(periodoId) {
    console.log(this);
    const headers = {};
    headers['Authorization'] = 'Bearer ' + (new AuthService()).getToken();
    return fetch('http://localhost:8080/api/periodo-administrativos/'+periodoId, {
        headers: headers,
        method: 'DELETE'
    }).then(data => {
        window.location.reload();
    }).catch(err => {
    });
}

function accionFormatter(cell) {
    return (
        <div>
            <Button color="primary" tag={Link} to={`/periodos/edit/${cell}`} ><FontAwesomeIcon icon={faEdit} /></Button>
            <Button color="danger" onClick={() => { if (window.confirm('Desea eliminar el periodo?')) handleDelete(cell) } } ><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    );

}

export default withAuth(PeriodoIndex);

