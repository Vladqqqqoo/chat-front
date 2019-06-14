import React, {useState} from 'react';
import './login.css'

import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button'

function Login(props) {

    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordReg = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const email = useFormInput(emailReg);
    const password = useFormInput(passwordReg);

    function sendLogin(event) {
        event.preventDefault();
        console.log('send');
    }


    return (
        <Row className='login'>
            <Col md={{span: 5, offset: 4}}>
                <Form onSubmit={sendLogin}>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control {...email} type="email"
                                      placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...password} type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button disabled={!(email.field.isValid && password.field.isValid)} variant="dark" type="submit">
                        Log In
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

function useFormInput(regExp) {
    const [field, setField] = useState({value: '', isValid: false, isInvalid: false});

    function handleChange(event) {
        setField({...field, value: event.target.value});
    }

    function handleBlur(event) {
        const value = event.target.value;
        if (value.match(regExp)) {
            setField({...field, isValid: true, isInvalid: false});
        } else {
            setField({...field, isValid: false, isInvalid: true});
        }
    }

    return {
        field,
        onChange: handleChange,
        onBlur: handleBlur,
        isValid: field.isValid,
        isInvalid: field.isInvalid
    };
}

export default Login;
