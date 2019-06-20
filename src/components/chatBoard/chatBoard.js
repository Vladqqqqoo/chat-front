import React from 'react';
import {Link} from 'react-router-dom';

import './chatBoard.css'

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


function ChatBoard(props) {
    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Fab size="small" color="primary" aria-label="Add">
                                <AddIcon/>
                            </Fab>
                            <span className='newRoomSpan'>New room</span>
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            <div>123</div>
                            <div>123</div>
                            <div>123</div>
                            <div>123</div>
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            Link 2
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            Link 3
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default ChatBoard;

