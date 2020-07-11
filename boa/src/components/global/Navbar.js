import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import AuthContext from "../../configs/authContext";
import roles from "../../configs/roles";

export default class NavbarComponent extends React.Component {
    static contextType = AuthContext;

    render() {
        const { user, logout } = this.context;
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                    <Navbar.Brand href="/">BOA</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={NavLink} exact to="/">
                                Home
              </Nav.Link>
                            <Nav.Link as={NavLink} to="/album/list">
                                Albuns
                  </Nav.Link>
                            <Nav.Link as={NavLink} to="/artist/list">
                                Artistas
                  </Nav.Link>
                            {user.role===roles.Admin && <Nav.Link as={NavLink} to="/genre/list">
                                Géneros
                  </Nav.Link>}
                            {user.role===roles.Admin && <Nav.Link as={NavLink} to="/user/list">
                                Utilizadores
                  </Nav.Link>}
                            <Nav.Link as={NavLink} to="/about">
                                About
              </Nav.Link>
                        </Nav>
                        <Nav>
                            {user ? (
                                <NavDropdown title={user.username} alignRight>
                                    <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                    <Nav.Link as={NavLink} to="/login">
                                        Login
                                    </Nav.Link>
                                )}
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        );
    }
}
