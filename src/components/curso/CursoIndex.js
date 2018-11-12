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



const columns = [
    {
        dataField: 'materia.nombre',
        text: 'Materia',
        sort: true,
        formatter: materiaFormatter
    }, {
        dataField: 'numero',
        text: 'Curso',
        sort: true
    }, {
        dataField: 'profesor.nombre',
        text: 'Profesor',
        sort: true,
        formatter: profesorFormatter
    }, {
        dataField: 'estado',
        text: 'Estado',
        sort: true,
    }, {
        dataField: 'id',
        text: 'Accion',
        formatter: accionFormatter
    }
];

class CursoIndex extends React.Component {

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
        this.getCursos();
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
                                        <CardHeader>Cursos</CardHeader>
                                        <CardBody>
                                            <BootstrapTable keyField='id' data={this.state.data} columns={ columns } striped hover bootstrap4 />
                                        </CardBody>
                                        <CardFooter>
                                            <Button color="primary" tag={Link} to={`/cursos/crear`} >Crear Curso</Button>
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

    getCursos(){
        const headers = {};
        headers['Authorization'] = 'Bearer ' + this.Auth.getToken();
        return fetch(`http://localhost:8080/api/cursos`,
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

function materiaFormatter(cell, row) {
    return cell +"("+row.materia.codigo+")";
}

function profesorFormatter(cell, row) {
    return cell+", "+row.profesor.apellido;
}

function handleDelete(periodoId) {
    console.log(this);
    const headers = {};
    headers['Authorization'] = 'Bearer ' + (new AuthService()).getToken();
    return fetch('http://localhost:8080/api/curso/'+periodoId, {
        headers: headers,
        method: 'DELETE'
    }).then(() => {
        window.location.reload();
    }).catch(err => {
    });
}

function accionFormatter(cell) {
    return (
        <div>
            <Button color="primary" tag={Link} to={`/cursos/edit/${cell}`} ><FontAwesomeIcon icon={faEdit} /></Button>
        </div>
    );

}

export default withAuth(CursoIndex);

