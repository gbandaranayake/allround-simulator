import React from "react";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";

function SuccessNotification(props) {
    return (
        <Collapse in={props.shown} appear={true} unmountOnExit={true}>
            <div>
                <Alert variant="success">
                    {props.message}
                </Alert>
            </div>
        </Collapse>
    );
}

export default SuccessNotification;