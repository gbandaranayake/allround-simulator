import React from "react"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

//todo make this a text area and put explicit label and remove prepend
function CollectionInput() {
    return (
            <Form>
                <Form.Group controlId="name">
                    <InputGroup className="mb-3 col-sm-6">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="name">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="name" aria-label="Name"/>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="description">
                    <InputGroup className="mb-3 col-sm-10">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="description-addon">Description</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="What this collection is about..." aria-label="Description"/>
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
    )
}

export default CollectionInput;