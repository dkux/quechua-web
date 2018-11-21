import React from 'react';
import ReactDOM from 'react-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Our Components
import Login from './components/Login';
import MainPage from './components/mainPage/MainPage';
import AlumnoCargaMasiva from './components/cargaMasiva/AlumnosCargaMasiva';
import ProfesorCargaMasiva from './components/cargaMasiva/ProfesoresCargaMasiva';
import PeriodoIndex from './components/periodo/PeriodoIndex';
import PeriodoEditar from './components/periodo/PeriodoEditar';
import PeriodoCrear from './components/periodo/PeriodoCrear';
import CursoIndex from './components/curso/CursoIndex';
import CursoEditar from './components/curso/CursoEditar';
import CursoCrear from './components/curso/CursoCrear';
import ReporteCursos from './components/reporte/ReporteCursos';
import Error401 from './components/error/401'
import Error404 from './components/error/404'

ReactDOM.render((
    <div style={{height:'100%'}}>
        <ToastContainer position={"top-left"} className="toastify-container" toastClassName="toastify-toast" />
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/crearCurso" component={CursoCrear} />
                <Route exact path="/alumnos/cargaMasiva" component={AlumnoCargaMasiva} />
                <Route exact path="/profesores/cargaMasiva" component={ProfesorCargaMasiva} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/periodos" component={PeriodoIndex} />
                <Route exact path="/periodos/edit/:id" component={PeriodoEditar} />
                <Route exact path="/periodos/crear" component={PeriodoCrear} />
                <Route exact path="/cursos" component={CursoIndex} />
                <Route exact path="/cursos/crear" component={CursoCrear} />
                <Route exact path="/cursos/edit/:id" component={CursoEditar} />
                <Route exact path="/reportes" component={ReporteCursos} />
                <Route exact path="/error/401" component={Error401} />
                <Route path="*" component={Error404} />

            </Switch>
        </BrowserRouter>
    </div>), document.getElementById('root')
);
registerServiceWorker();


