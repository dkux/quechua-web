import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Our Components
import Login from './components/Login';
import MainPage from './components/mainPage/MainPage';
import CursoCrear from './components/curso/CursoCrear';
import AlumnoCargaMasiva from './components/cargaMasiva/AlumnosCargaMasiva';
import PeriodoIndex from './components/periodo/PeriodoIndex';
import PeriodoEditar from './components/periodo/PeriodoEditar';
import PeriodoCrear from './components/periodo/PeriodoCrear';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/crearCurso" component={CursoCrear} />
            <Route exact path="/periodos" component={PeriodoIndex} />
            <Route exact path="/alumnos/cargaMasiva" component={AlumnoCargaMasiva} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/periodos/edit/:id" component={PeriodoEditar} />
            <Route exact path="/periodos/crear" component={PeriodoCrear} />
        </Switch>
    </BrowserRouter>), document.getElementById('root')
);
registerServiceWorker();


