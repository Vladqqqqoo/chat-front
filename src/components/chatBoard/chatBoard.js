import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './chatBoard.css'
import AddRoomModal from './addRoomModal/addRoomModal';
import DeleteRoomModal from './deleteRoomModal/deleteRoomModal';

import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';


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


    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);

    function handleShowAddRoomModal() {
        setShowAddRoomModal(true);
    }

    function handleCloseAddRoomModal() {
        setShowAddRoomModal(false);
    }


    function handleShowDeleteRoomModal() {
        setShowDeleteRoomModal(true);
    }

    function handleCloseDeleteRoomModal() {
        setShowDeleteRoomModal(false);
    }

    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={{span: 6, offset: 3}} md={{span: 8, offset: 2}}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Fab onClick={handleShowAddRoomModal} size="small" color="primary" aria-label="Add">
                                <AddIcon/>
                            </Fab>
                            <span className='newRoomSpan'>New room</span>
                            <AddRoomModal
                                onAddNewRoom={emitAddNewRoom}
                                onSave={addRoom}
                                createdBy={props.user.userId}
                                show={showAddRoomModal}
                                onHide={handleCloseAddRoomModal}
                            />
                        </ListGroup.Item>
                        <DeleteRoomModal
                            show={showDeleteRoomModal}
                            onHide={handleCloseDeleteRoomModal}
                        />
                        {
                            rooms.map((element) => {
                                    return (
                                        <ListGroup.Item key={element._id} as="div" action>
                                            <Row className="roomElement">
                                                <Col md={10}>
                                                    <Row as={Link} to={`/chat/${element._id}`}>
                                                        {element.name}
                                                    </Row>
                                                </Col>
                                                <Col md={2}>
                                                    {
                                                        element.createdBy === props.user.userId
                                                        &&
                                                        (<IconButton className="deleteButton"
                                                                     onClick={handleShowDeleteRoomModal}>
                                                            <DeleteIcon/>
                                                        </IconButton>)
                                                    }
                                                </Col>
                                            </Row>
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

