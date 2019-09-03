import React from "react"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import URLPaths from "../common/URLPaths";

class CreateCollectionForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {collectionName : '', description : ''}
    }

    handleChange(event) {
        let stateKey = event.nativeEvent.target.id;
        this.setState({ [stateKey] : event.nativeEvent.target.value || ''})
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(URLPaths.collections.create, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({name : this.state.collectionName, description : this.state.description}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error);
        });
        this.setState({collectionName : '', description : ''});
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group controlId="collectionName">
                    <InputGroup className="mb-3 col-sm-6">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="name" aria-label="Name" value={this.state.collectionName} onChange={this.handleChange.bind(this)}/>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="description">
                    <InputGroup className="mb-3 col-sm-10">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Description</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="What this collection is about..." aria-label="Description" value={this.state.description}
                                     onChange={this.handleChange.bind(this)}/>
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        )
    }
}

export default CreateCollectionForm;