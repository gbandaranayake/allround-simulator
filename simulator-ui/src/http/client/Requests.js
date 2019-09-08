import React from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import styles from '../../Custom.css';

class Requests extends React.Component {
    render() {
        return (
            <div className="mt-4">
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group controlId="method">
                        <InputGroup className="mb-3 col-sm-6">
                            <ButtonToolbar>
                                <ToggleButtonGroup type="radio" name="request-method" defaultValue={'GET'}>
                                    <ToggleButton value={'GET'} variant={'success'}>GET</ToggleButton>
                                    <ToggleButton value={'POST'} variant={'success'}>POST</ToggleButton>
                                    <ToggleButton value={'DELETE'} variant={'success'}>DELETE</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="host">
                        <InputGroup className="mb-3 col-sm-6">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="uri">URI</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Paste URI here.." aria-label="Host" aria-describedby="uri"/>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Save
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Requests;