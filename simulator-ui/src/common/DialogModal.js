import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function DialogModal(props) {
    const [lgShow, setLgShow] = useState(true);
    return (
        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            onExited={props.onExited}
            aria-labelledby="example-modal-sizes-title-lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success"
                    onClick={() => {
                        setLgShow(false);
                        props.onConfirm();
                    }}
                >
                    Confirm
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        setLgShow(false);
                    }}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DialogModal;