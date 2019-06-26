import React, {useState, useEffect, useRef} from 'react';
import Textarea from 'react-textarea-autosize';

import './room.css';

import {Row, Col, Container, Form, Toast} from 'react-bootstrap'

import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

function Room(props) {

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const socket = props.chat.socket;
    const roomId = props.match.params.id;
    const userId = props.user.userId;
    const userName = props.user.userName;
    const messagesEndRef = useRef(null);


    useEffect(() => {
        socket.emit('join room', {roomId});

        return () => {
            socket.emit('leave room', {roomId});
            socket.off();
        }
    }, [socket, roomId]);

    useEffect(() => {
        socket.on('new message received', (message) => {
            console.log('new message received ', message);
            setMessages([...messages, message]);
            setInputText('');
            scrollToBottom();
        });
        return () => {
            socket.off('new message received');
        }
    }, [socket, messages]);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    };

    function sendMessage() {
        console.log('send');
        props.chat.socket.emit('new message', {roomId, text: inputText, fromUserId: userId, fromUserName: userName});
    }

    function handleInputTextArea(event) {
        setInputText(event.target.value);
    }

    const messagesList = messages.map((message) => {
        let isMyMessage = userId === message.fromUserId;
        return (
            <Row key={message.messageId}>
                {isMyMessage
                    ? (
                        <Col key={message.messageId} sm={{span: 8, offset: 4}}
                             md={{span: 6, offset: 6}}>
                            <Toast className="myMessage" key={message.messageId} style={{maxWidth: '350px'}}>
                                <Toast.Header closeButton={false}>
                                    <img src="" alt=""/>
                                    <strong className="mr-auto">{message.fromUserName}</strong>
                                    <small>11 mins ago</small>
                                </Toast.Header>
                                <Toast.Body style={{wordWrap: 'break-word'}}>
                                    {message.text}
                                </Toast.Body>
                            </Toast>
                        </Col>)
                    : (<Col sm={{span: 8, offset: 0}} md={{span: 6, offset: 0}}>
                        <Toast className="othersMessage" key={message.messageId} style={{maxWidth: '350px'}}>
                            <Toast.Header closeButton={false}>
                                <img src="" alt=""/>
                                <strong className="mr-auto">{message.fromUserName}</strong>
                                <small>11 mins ago</small>
                            </Toast.Header>
                            <Toast.Body style={{wordWrap: 'break-word'}}>
                                {message.text}
                            </Toast.Body>
                        </Toast>
                    </Col>)
                }
            </Row>
        )
    });

    return (
        <Container className='roomClass'>
            <Row className='messageClass'>
                <Col md={{span: 10, offset: 1}}>
                    {messagesList}
                </Col>
                <Col md={{span: 10}}>
                    <div
                        className="messageEnd"
                        ref={messagesEndRef}>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr/>
                </Col>
            </Row>
            <Row className='sendingClass'>
                <Col md={{span: 6, offset: 3}} className="sendArea">
                    <Form className="formMessage">
                        <Form.Group controlId="formGroupMessage">
                            <Form.Control
                                value={inputText}
                                onChange={handleInputTextArea}
                                minRows={2}
                                maxRows={4}
                                style={{resize: 'none'}}
                                as={Textarea} type="text"
                                placeholder="Enter your message"
                            />
                        </Form.Group>
                    </Form>
                    <Fab onClick={sendMessage} color="primary" className="sendButton" aria-label="Add" size="medium">
                        <SendIcon/>
                    </Fab>
                </Col>
            </Row>
        </Container>
    )
}

export default Room;


//     <Col sm={{span: 8, offset: 4}} md={{span: 6, offset: 6}}>
