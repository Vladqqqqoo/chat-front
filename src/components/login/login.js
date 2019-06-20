import React, {useEffect} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

import {ToastContainer, toast} from 'react-toastify';
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
                props.logIn(userAccess.data);
                localStorageService.setTokens(userAccess.data);
            })
            .catch(err => {
                toast.error('Failed authorization. Please check login and password!');
                console.log('Bad authorization ', err);
            });
    }

    useEffect(()=>{
        toast.configure({

        })
    },[]);

    return (
        props.user.isAuthorized
            ? <Redirect to='/'/>
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
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange
                            draggable
                            pauseOnHover
                        />
                    </Form>
                </Col>
            </Row>
    )
}

// export default withRouter(Login);
export default Login;
