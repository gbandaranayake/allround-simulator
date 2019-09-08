import React from "react";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FaMinusCircle} from "react-icons/all";

function KeyValueInputPair(props) {
    return (
        <Form.Row className="mb-3 col-sm-12">
            <Col>
                <Form.Control placeholder={props.keyLabel} defaultValue={props.keyValue}
                              onChange={(e) => props.onKeyChange && props.onKeyChange(e.target.value)}/>
            </Col>
            <Col>
                <Form.Control placeholder={props.valueLabel} defaultValue={props.value}
                              onChange={(e) => props.onValueChange && props.onValueChange(e.target.value)}/>
            </Col>
            <Col className="col-sm-1">
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip>
                            Delete the header
                        </Tooltip>
                    }
                >
                    <Button className="btn" size="sm"
                            style={{
                                'backgroundColor': 'transparent',
                                color: '#bd0030',
                                'border': 'none'
                            }}
                            onClick={() => props.onDelete && props.onDelete()}><FaMinusCircle/></Button>
                </OverlayTrigger>
            </Col>
        </Form.Row>
    );
}

export default KeyValueInputPair;