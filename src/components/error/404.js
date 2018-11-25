import React from 'react';
import { Link } from "react-router-dom";
import './error.css';


export default class Error404 extends React.Component {
    render() {
        return (
            <div className="error-page-container error-404">
                <div className="error-page-wrap">
                    <h1>404</h1>
                    <h2>No encontrado</h2>
                    <p>El recurso solicitado no ha sido encontrado</p>
                    <p><Link to="/">Home</Link></p>
                </div>
            </div>
        );
    }
}
