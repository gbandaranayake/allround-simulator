import React from "react";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";

function SuccessNotification(props) {
    console.log(props);
    return (
        <Collapse in={props.shown} timeout={5000} duration={5000}>
            <Alert variant="success">
                {props.message}
            </Alert>
        </Collapse>
    );
}

export default SuccessNotification;