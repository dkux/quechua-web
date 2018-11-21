import React from 'react';
import { Link } from "react-router-dom";
import './error.css';


export default class Error401 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="error-page-container error-401">
                <div className="error-page-wrap">
                    <h1>401</h1>
                    <h2>No autorizado</h2>
                    <p>No tiene permisos para acceder al recurso solicitado</p>
                    <p><Link to="/">Home</Link></p>
                </div>
            </div>
        );
    }
}
