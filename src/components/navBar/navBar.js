import React from 'react';
import {Link} from "react-router-dom";


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import localStorageService from '../../services/localStorageService';

import './navBar.css'

function NavBar(props) {

    function handleClickLogOut() {
        props.logOut();
        localStorageService.removeTokens();
    }

    return (
        <Navbar collapseOnSelect bg="light" expand="lg">
            <Navbar.Brand>SayMeWhat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href='#' to='/' as={Link}>
                        Chats
                    </Nav.Link>
                </Nav>
                <Nav>
                    {props.user.isAuthorized &&
                    (<Nav.Link href='#' onClick={handleClickLogOut}>
                        Log Out
                    </Nav.Link>)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;
