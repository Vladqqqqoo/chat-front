import React, {useState} from 'react';

import './room.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

function Room(props) {

    const [messages, setMessages] = useState([]);

    function sendMessage() {

    }


    return (
        <Container>
            <Row>
                <Col md={{span: 10, offset: 1}}>
                    <div>12</div>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 6, offset: 3}} className="sendArea">
                    <Form className="formMessage">
                        <Form.Group controlId="formGroupMessage">
                            <Form.Control as="textarea" type="text" placeholder="Enter your message"/>
                        </Form.Group>
                    </Form>
                    <Fab color="primary" className="sendButton" aria-label="Add" size="medium">
                        <SendIcon/>
                    </Fab>
                </Col>
            </Row>
        </Container>
    )
}

export default Room;
