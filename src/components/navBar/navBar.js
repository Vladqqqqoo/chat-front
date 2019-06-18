import React from 'react';
import {Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>SayMeWhat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to={'/'}>
                        <span>HOME</span>
                        {/*<Nav.Link>Home</Nav.Link>*/}
                    </Link>
                    <Nav.Link>Link</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;
