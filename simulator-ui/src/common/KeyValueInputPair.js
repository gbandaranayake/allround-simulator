import React from "react";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";

function KeyValueInputPair(props) {
    return (
        <Form.Row className="col-sm-12">
            <Col>
                <Form.Control placeholder={props.keyLabel}/>
            </Col>
            <Col>
                <Form.Control placeholder={props.valueLabel}/>
            </Col>
        </Form.Row>
    );
}

export default KeyValueInputPair;