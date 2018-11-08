import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// Our Components
import Login from './components/Login';
import MainPage from './components/mainPage/MainPage';
import CursoCrear from './components/curso/CursoCrear';
import AlumnoCargaMasiva from './components/cargaMasiva/AlumnosCargaMasiva';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/crearCurso" component={CursoCrear} />
            <Route exact path="/alumnos/cargaMasiva" component={AlumnoCargaMasiva} />
            <Route exact path="/login" component={Login} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
