import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios/index';
import {Link} from 'react-router-dom';

import './chatBoard.css'
import AddRoomModal from './addRoomModal/addRoomModal';
import DeleteRoomModal from './deleteRoomModal/deleteRoomModal';

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

    const deleteRoom = useCallback((roomId) => {
        const newRooms = [...rooms];
        const deletedRoom = newRooms.findIndex((element) => {
            return element._id === roomId
        });
        newRooms.splice(deletedRoom, 1);
        setRooms(newRooms);

    }, [rooms]);

    useEffect(() => {
        socket.on('deleted room', (roomId) => {
            deleteRoom(roomId);
        });
        return () => {
            socket.off('deleted room');
        }
    }, [socket, deleteRoom]);

    function emitDeleteRoom(roomId) {
        socket.emit('delete room', roomId);
    }


    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);
    const [deletedRoom, setDeletedRoom] = useState({roomId: '', roomName: ''});

    function handleShowAddRoomModal() {
        setShowAddRoomModal(true);
    }

    function handleCloseAddRoomModal() {
        setShowAddRoomModal(false);
    }


    function handleShowDeleteRoomModal(event, roomId, roomName) {
        event.preventDefault();
        setDeletedRoom({roomId, roomName});
        setShowDeleteRoomModal(true);
    }

    function handleCloseDeleteRoomModal() {
        setShowDeleteRoomModal(false);
    }

    return (
        <Row>
            <ListGroup sm={{span: 6, offset: 3}} md={{span: 8, offset: 2}} as={Col} variant="flush">
                <AddRoomModal
                    onAddNewRoom={emitAddNewRoom}
                    createdBy={props.user.userId}
                    show={showAddRoomModal}
                    onHide={handleCloseAddRoomModal}
                />
                <DeleteRoomModal
                    onDeleteRoom={emitDeleteRoom}
                    room={deletedRoom}
                    show={showDeleteRoomModal}
                    onHide={handleCloseDeleteRoomModal}
                />
                <ListGroup.Item>
                    <Fab onClick={handleShowAddRoomModal} size="small" color="primary" aria-label="Add">
                        <AddIcon/>
                    </Fab>
                    <span className='newRoomSpan'>New room</span>
                </ListGroup.Item>
                {
                    rooms.map((element) => {
                            return (
                                <ListGroup.Item
                                    className="roomElement"
                                    key={element._id}
                                    as={Link}
                                    to={{
                                        pathname: `/chat/${element._id}`,
                                        state: {
                                            name: element.name
                                        }
                                    }} action>
                                    <span>{element.name}</span>
                                    {
                                        element.createdBy === props.user.userId
                                        &&
                                        (<IconButton className="deleteButton"
                                                     onClick={(event) => {
                                                         return handleShowDeleteRoomModal(event, element._id, element.name)
                                                     }}>
                                            <DeleteIcon/>
                                        </IconButton>)
                                    }
                                </ListGroup.Item>
                            )
                        }
                    ).reverse()
                }
            </ListGroup>
        </Row>
    )
}

export default ChatBoard;

