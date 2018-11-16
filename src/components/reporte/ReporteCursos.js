import React from 'react'
import { Button, FormGroup, Input, Card, CardBody, CardHeader, CardFooter, Row, Col,
    Container, Alert, Label } from 'reactstrap';
import { render } from 'react-dom'
import {Link} from "react-router-dom";
import * as Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official'

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import withAuth from "../withAuth";
import AuthService from "../AuthService";


const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Alumnos incriptos por curso'
    },
    tooltip: {
        useHTML: true,
        headerFormat: '<b>{point.key}</b><table>',
        pointFormat: `<tr>
                            <td style="color: {series.color}">#Inscriptos: </td>
                            <td style="text-align: right"><b>{point.inscriptos}</b></td>
                      </tr>
                      <tr>
                            <td style="color: {series.color}">#Docentes: </td>
                            <td style="text-align: right"><b>{point.docentes}</b></td>
                      </tr>
                      <tr>
                            <td style="color: {series.color}">#Cursos: </td>
                            <td style="text-align: right"><b>{point.cursos}</b></td>
                      </tr>`,
        footerFormat: '</table>',
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Algoritmos I',
            y: 61.41,
            inscriptos: 20,
            docentes: 2,
            cursos:4
        }, {
            name: 'Algritmos II',
            y: 11.84,
            inscriptos: 22,
            docentes: 5,
            cursos:7
        }, {
            name: 'Algoritmos III',
            y: 10.85,
            inscriptos: 27,
            docentes: 6,
            cursos:8,
        }, {
            name: 'Taller I',
            y: 4.67,
            inscriptos: 29,
            docentes: 11,
            cursos:11,
        }, {
            name: 'Organización de datos',
            y: 4.18,
            inscriptos: 33,
            docentes: 3,
            cursos:1,
        }]
    }]
}

class ReporteCursos extends React.Component {

    constructor(props){
        super(props);
        this.state  = {
            id: null,
            fechaInicioValid: true,
            fechaFinValid: true,
            actividad: '',
            formValid: true,
            success: false,
            error: false,
            redirect: false,
        };
        this.Auth = new AuthService();
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
                                        <CardHeader>Crear Periodo administrativo</CardHeader>
                                        <CardBody>
                                            <Row>
                                                <HighchartsReact
                                                    highcharts={Highcharts}
                                                    options={options}
                                                />
                                            </Row>
                                        </CardBody>
                                        <CardFooter>
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


}


export default withAuth(ReporteCursos);
