import React from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {toast} from 'react-toastify';

import './registration.css'
import useFormInput from '../../customHooks/useFormInput';
import localStorageService from '../../services/localStorageService';

import {Form, Row, Col, Button} from 'react-bootstrap';

function Registration(props) {
    const loginReg = /^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/;
    const passwordReg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const login = useFormInput(loginReg);
    const password = useFormInput(passwordReg);
    const email = useFormInput(emailReg);

    function sendSignUpRequest(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/signup', {login: login.value, password: password.value, email: email.value})
            .then((userAccess) => {
                console.log(userAccess);
                props.logIn(userAccess.data);
                localStorageService.setTokens(userAccess.data);
                props.history.push('/');
            })
            .catch((error) => {
                toast.error('Failed registration. User with this email or login already exist')
            });
    }

    return (
        props.user.isAuthorized
            ? <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
            : <Row className='registration'>
                <Col xs={{span: 10, offset: 1}} md={{span: 6, offset: 3}} lg={{span: 5, offset: 4}}
                     xl={{span: 4, offset: 4}}>
                    <h1>Welcome abroad!</h1>
                    <br/>
                    <Form onSubmit={sendSignUpRequest}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control {...email} type="email"
                                          placeholder="exapmle@gmail.com"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupLogin">
                            <Form.Label>Login</Form.Label>
                            <Form.Control {...login} type="text"
                                          placeholder="Uniq username"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...password} type="password" placeholder="password"/>
                        </Form.Group>
                        <Button disabled={!(login.isValid && password.isValid && email.isValid)} variant="dark" type="submit">
                            Sign Up
                        </Button>
                        <div className="loginLink">
                            <Link to='/login'>
                                <span>have an account?</span>
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
    )
}

export default Registration;
