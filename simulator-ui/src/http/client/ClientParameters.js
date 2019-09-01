import React from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

function ClientParameters() {
    return (
        <div className="mt-4">
            <Form>
                <Form.Group controlId="host">
                    <InputGroup className="mb-3 col-sm-6">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="host-addon">Host</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="localhost" aria-label="Host" aria-describedby="host-addon"/>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="port">
                    <InputGroup className="mb-3 col-sm-6">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="port-addon">Port</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="enter port number here" aria-label="Port"
                                     aria-describedby="port-addon"/>
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    )
}

export default ClientParameters;