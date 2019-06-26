import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.css'
import useFormInput from '../../customHooks/useFormInput';
import localStorageService from '../../services/localStorageService';

import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button'

function Login(props) {
    const loginReg = /^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/;
    const passwordReg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const login = useFormInput(loginReg);
    const password = useFormInput(passwordReg);

    function sendLogInRequest(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/login', {login: login.value, password: password.value})
            .then((userAccess) => {
                toast.info('You successfully authorized', {
                    autoClose: 2000
                });
                localStorageService.setTokens(userAccess.data);
                props.logIn(userAccess.data);
            })
            .catch((error) => {
                toast.error('Failed authorization. Please check login and password!');
            });
    }

    return (
        props.user.isAuthorized
            ? <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
            : <Row className='login'>
                <Col xs={{span: 10, offset: 1}} md={{span: 6, offset: 3}} lg={{span: 5, offset: 4}}
                     xl={{span: 4, offset: 4}}>
                    <h1>Welcome abroad!</h1>
                    <br/>
                    <Form onSubmit={sendLogInRequest}>
                        <Form.Group controlId="formGroupLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control {...login} type="text"
                                          placeholder="Enter your login"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...password} type="password" placeholder="Enter your password"/>
                        </Form.Group>
                        <Button disabled={!(login.isValid && password.isValid)} variant="dark" type="submit">
                            Log In
                        </Button>
                        <div className="registrationLink">
                            <Link to='/registration'>
                                <span>don't have an account?</span>
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
    )
}

// export default withRouter(Login);
export default Login;
