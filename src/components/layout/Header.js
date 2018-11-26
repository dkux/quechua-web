import React from 'react';
import { Link } from "react-router-dom";
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
import withAuth from "../withAuth";
const Auth = new AuthService();

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            userAuthorities: []
        };
    }

    componentWillMount() {
        this.setState({
            userAuthorities: this.props.user.authorities
        })
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
                                        <Link to="/cursos">Cursos</Link>
                                    </DropdownItem>
                                    <div className={this.state.userAuthorities.includes('ROLE_ADMIN') ? '' : 'd-none'}>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <Link to="/periodos">Periodos</Link>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <Link to="/alumnos/cargaMasiva">Importar Alumnos</Link>
                                        </DropdownItem>
                                    </div>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to="/profesores/cargaMasiva">Importar Profesores</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to="/reportes">Reporte</Link>
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

export default withAuth(Header);

