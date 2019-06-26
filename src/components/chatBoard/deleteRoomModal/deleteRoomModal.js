import React, {useState} from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal'
import {Button} from 'react-bootstrap';


function DeleteRoomModal(props) {

    function deleteRoom() {
        // axios.delete('http://localhost:3000/chat', {})
        //     .then((createdRoom)=>{
        //         props.onAddNewRoom(createdRoom.data);
        //         props.onHide();
        //     })
        //     .catch((error)=>{
        //         console.log(error.response);
        //     });
    }


    return (
        <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete <u>{props.roomName}</u> room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>Are you sure about deleting this room?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={deleteRoom}>Delete</Button>
                <Button variant="outline-secondary" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteRoomModal;
