import React, { Component } from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify';
import { Navbar, Container, Nav, NavDropdown, Col }
    from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './Navebar.css';
import logo_site from '../storage/logo.png'

export default class Navebar extends Component {
    handleLogOut = async event => {
        event.preventDefault();
        try {
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
        } catch (error) {
            console.log(error.message)
        }

    }

    render() {

        return (
            <Navbar className='Ali-navbar' bg="primary" variant="dark" expand="lg">
                <Container>
                    {!this.props.auth.isAuthenticated  && (
                        <Navbar.Brand href="/"><img src={logo_site} /></Navbar.Brand>
                    )}
                    {this.props.auth.isAuthenticated && (
                        <Navbar.Brand href="/Signup"><img src={logo_site} /></Navbar.Brand>
                    )}
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav navbarScroll" >
                        {!this.props.auth.isAuthenticated && (
                            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                                <Nav.Link href="/">Welcome</Nav.Link>
                                <Nav.Link href="/About">About</Nav.Link>
                            </Nav>
                        )}
                        {this.props.auth.isAuthenticated && (
                            <Nav className="me-auto">
                                <Navbar.Brand href="/Signup">
                                    {this.props.auth.isAuthenticated && this.props.auth.user && (
                                        <h6 className='user_welcoming'>welcome {this.props.auth.user.username}</h6>

                                    )}
                                </Navbar.Brand>
                                <Nav.Link href="/Analytics">Analytics</Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {!this.props.auth.isAuthenticated && (
                                <Nav.Link href="/Signup">Signup</Nav.Link>
                            )}
                            {this.props.auth.isAuthenticated && (
                                <Col xs={6} md={4}>
                                    <NavDropdown title=""
                                        id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/Settings">Settings</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item >

                                            <AmplifySignOut />

                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Col>

                            )}
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        )
    }
}

