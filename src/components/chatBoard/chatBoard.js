import React from 'react';

import './chatBoard.css'

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from "react-bootstrap/Button";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';





function ChatBoard(props) {
    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item action>
                            <Fab size="small" color="primary" aria-label="Add">
                                <AddIcon/>
                            </Fab>
                            <span className='newRoomSpan'>New room</span>
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link1">
                            Link 1
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            Link 2
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#link1">
                            <h1>Link #1</h1>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2">
                            <h1>Link #2</h1>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default ChatBoard;
