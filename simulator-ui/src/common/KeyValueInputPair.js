import React from "react";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";

function KeyValueInputPair(props) {
    return (
        <Form.Row className="col-sm-12">
            <Col>
                <Form.Control placeholder={props.keyLabel} defaultValue={props.keyValue} onChange={(e) => props.keyHandler && props.keyHandler(e.target.value)}/>
            </Col>
            <Col>
                <Form.Control placeholder={props.valueLabel} defaultValue={props.value} onChange={(e) => props.valueHandler && props.valueHandler(e.target.value)}/>
            </Col>
        </Form.Row>
    );
}

export default KeyValueInputPair;