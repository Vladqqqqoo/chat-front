import React, {useState} from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal'
import {Alert, Button, Form} from 'react-bootstrap';


function AddRoomModal(props) {

    const [roomName, setRoomName] = useState('');

    function saveRoom() {
        axios.post('http://localhost:3000/chat', {name: roomName, createdBy: props.createdBy})
            .then((createdRoom)=>{
                props.onSave(createdRoom.data);
                props.onAddNewRoom(createdRoom.data);
                props.onHide();
            })
            .catch((error)=>{
                if(error.response.status===400){
                    setShowError(true);
                }
                console.log(error.response);
            });
    }

    const [showError, setShowError] = useState(false);

    function handleChange(event) {
        setRoomName(event.target.value);
    }

    function handleDismiss() {
        setShowError(false);
    }


    return (
        <Modal show={props.show} onHide={props.onHide} onExit={handleDismiss} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicRoomName">
                        <Form.Label>Room name</Form.Label>
                        <Form.Control onChange={handleChange} type="text" placeholder="Enter the name of room"/>
                        <Form.Text className="text-muted">
                            <span>The name of room should be uniq</span>
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={saveRoom}>Add room</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            {showError &&
            <Alert variant="danger" onClose={handleDismiss} dismissible>
                <span>This name has already been booked</span>
            </Alert>
            }
        </Modal>
    )
}

export default AddRoomModal;
