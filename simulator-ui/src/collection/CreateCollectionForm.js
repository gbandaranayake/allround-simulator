import React from "react"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import URLPaths from "../common/URLPaths";
import {post} from "../common/HttpFetchConnector";
import {Jumbotron} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Fade from "react-bootstrap/Fade";
import Collapse from "react-bootstrap/Collapse";
import SuccessNotification from "../common/SuccessNotification";

class CreateCollectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collectionName: '', description: '', activeNotifications: []}
    }

    handleChange(event) {
        let stateKey = event.nativeEvent.target.id;
        this.setState({[stateKey]: event.nativeEvent.target.value || ''})
    }

    handleSubmit(event) {
        event.preventDefault();
        post(URLPaths.collections.create, {
            name: this.state.collectionName,
            description: this.state.description
        }).then(function (response) {
            let activeNotificationsCopy = [...this.state.activeNotifications];
            activeNotificationsCopy.push({shown: true, message: "Collection " + this.state.collectionName + "created successfully!"});
            this.setState({activeNotifications: activeNotificationsCopy});
        }.bind(this), function (error) {
            console.log(error);
        });
        this.setState({collectionName: '', description: ''});
    }

    render() {
        let notifications = this.state.activeNotifications.map((notification, index) => {
            setTimeout(function () {
                this.setState({
                    activeNotifications: this.state.activeNotifications.filter((n, i) => i !== index)
                });
            }.bind(this), 7000);
            return notification;
        }).map((notification, index) => <SuccessNotification shown={notification.shown} message={notification.message} key={"notif-" + index}/>);

        return (
            <Jumbotron>
                <h3>Create a new collection</h3>
                {notifications}
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group controlId="collectionName">
                        <InputGroup className="mb-3 col-sm-6">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="name" aria-label="Name" value={this.state.collectionName}
                                         onChange={this.handleChange.bind(this)}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <InputGroup className="mb-3 col-sm-10">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="What this collection is about..." aria-label="Description"
                                         value={this.state.description}
                                         onChange={this.handleChange.bind(this)}/>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Jumbotron>
        )
    }
}

export default CreateCollectionForm;