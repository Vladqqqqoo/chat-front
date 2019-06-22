import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './chatBoard.css'
import AddRoomModal from './addRoomModal/addRoomModal';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


function ChatBoard(props) {

    const [rooms, setRooms] = useState([]);

    const socket = props.chat.socket;

    useEffect(() => {
        axios.get('http://localhost:3000/chat/list')
            .then((roomsList) => {
                setRooms(roomsList.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        socket.emit('join guest room');

        return () => {
            socket.emit('leave guest room');
            socket.off();
        }
    }, [socket]);

    const addRoom = useCallback((dataRoom) => {
        const newRooms = [...rooms, dataRoom];
        setRooms(newRooms);
    }, [rooms]);

    useEffect(() => {
        socket.on('added new room', (newRoom) => {
            addRoom(newRoom);
        });
        return () => {
            socket.off('added new room');
        }
    }, [socket, addRoom]);

    function emitAddNewRoom(newRoom) {
        socket.emit('add new room', newRoom);
    }


    const [showStatus, setShowStatus] = useState(false);

    function handleCloseModal() {
        setShowStatus(false);
    }

    function handleShowModal() {
        setShowStatus(true);
    }

    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={{span: 6, offset: 3}}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Fab onClick={handleShowModal} size="small" color="primary" aria-label="Add">
                                <AddIcon/>
                            </Fab>
                            <span className='newRoomSpan'>New room</span>
                            <AddRoomModal onAddNewRoom={emitAddNewRoom} onSave={addRoom} show={showStatus}
                                          onHide={handleCloseModal}/>
                        </ListGroup.Item>
                        {
                            rooms.map((element) => {
                                    return (
                                        <ListGroup.Item key={element._id} as={Link} to={`/chat/${element._id}`} action>
                                            <span>{element.name}</span>
                                        </ListGroup.Item>
                                    )
                                }
                            ).reverse()
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export default ChatBoard;

