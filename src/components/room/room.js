import React from 'react';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Room(props) {
    return (
        <Row className=''>
            <Col xs={{span: 10, offset: 1}} md={{span: 6, offset: 3}} lg={{span: 5, offset: 4}}
                 xl={{span: 4, offset: 4}}>
                <h1>Hi {props.match.params.id}!</h1>
            </Col>
        </Row>
    )
}

export default Room;
