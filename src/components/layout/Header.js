import React from 'react';
import './main.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';
import AuthService from "../AuthService";
import App from "../../App";
const Auth = new AuthService();

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout(){
        Auth.logout()
        this.props.history.replace('/login');
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">
                        <img src="/logo-fiuba.svg" width="30" height="30" alt=""/>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Acciones
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <a href="/crearCurso">Crear Curso</a>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <a href="/alumnos/cargaMasiva">Importar alumnos</a>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Importar Profesores
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="#" onClick={this.handleLogout.bind(this)}>
                                    Salir
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
