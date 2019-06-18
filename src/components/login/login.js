import React from 'react';
import axios from 'axios';

import './login.css'
import useFormInput from '../../customHooks/useFormInput';
import {setTokens} from '../../services/localStorageService';

import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button'

function Login(props) {

    const loginReg = /^[a-zA-Z][a-zA-Z0-9-_.]{1,20}$/;
    const passwordReg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const login = useFormInput(loginReg);
    const password = useFormInput(passwordReg);

    function sendLogin(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/login', {login: login.value, password: password.value})
            .then((userAccess)=>{
                console.log('Success authorization');
                props.logIn(userAccess.data);
                setTokens(userAccess.data);

            })
            .catch((error)=>{
                console.log('Bad authorization');
            });
    }

    return (
        <Row className='login'>
            <Col md={{span: 5, offset: 4}}>
                <h1>Welcome abroad!</h1>
                <br/>
                <Form onSubmit={sendLogin}>
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
                </Form>
            </Col>
        </Row>
    )
}

export default Login;
