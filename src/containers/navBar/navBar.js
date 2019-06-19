import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {logOut} from '../../actions/authActions';
import localStorageService from '../../services/localStorageService';

import './navBar.css'

function NavBar(props) {

    function handleClickLogOut() {
        props.logOut();
        localStorageService.removeTokens();
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>SayMeWhat</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link to='/' as={Link}>
                        Chats
                    </Nav.Link>
                </Nav>
                <Nav>
                    {props.user.isAuthorized &&
                    (<Nav.Link onClick={handleClickLogOut}>
                        Log Out
                    </Nav.Link>)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => {
            dispatch(logOut())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
