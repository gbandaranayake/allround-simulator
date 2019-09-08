import React from "react"
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Jumbotron} from "react-bootstrap";
import EmbeddedNotification from "../common/EmbeddedNotification";
import {post} from "../common/HttpFetchConnector";
import URLPaths from "../common/URLPaths";
import ValidationErrorOverlay from "../common/ValidationErrorOverlay";

class CreateCollectionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collectionName: '', description: '', activeNotifications: [], errors: {}};
        this.nameWarningRef = React.createRef();
        this.descWarningRef = React.createRef();
    }

    handleChange(event) {
        let stateKey = event.nativeEvent.target.id;
        let input = event.nativeEvent.target.value || '';
        let error = this.validateRequiredStringInput(input);
        this.setState((prevState) => {
            let copy = JSON.parse(JSON.stringify(prevState.errors));
            if (error) {
                copy[stateKey] = error;
            } else {
                delete copy[stateKey];
            }
            return {
                [stateKey]: input,
                errors: copy
            };
        });
    }

    validateFormDataForSubmit() {
        let nameError = this.validateRequiredStringInput(this.state.collectionName);
        let descError = this.validateRequiredStringInput(this.state.description);
        let errors = {};
        if (nameError) {
            errors['collectionName'] = nameError;
        }
        if ((descError)) {
            errors['description'] = descError;
        }
        return errors;
    }

    handleSubmit(event) {
        event.preventDefault();
        const errors = this.validateFormDataForSubmit();
        if ((errors['collectionName'] || errors['description'])) {
            this.setState({errors: errors});
            return;
        }
        post(URLPaths.collections.create, {
            name: this.state.collectionName,
            description: this.state.description
        }).then((res) => {
            this.setState((state) => {
                let activeNotificationsCopy = [...state.activeNotifications];
                activeNotificationsCopy.push({
                    id: res.id,
                    shown: true,
                    variant: "success",
                    message: "Collection " + state.collectionName + " created successfully!"
                });
                return {
                    activeNotifications: activeNotificationsCopy,
                    collectionName: '',
                    description: ''
                }
            });
            this.props.newCollectionAddedCallback(res);
        }, (error) => {
            this.setState((state) => {
                let activeNotificationsCopy = [...state.activeNotifications];
                activeNotificationsCopy.push({
                    id: Date.now(),
                    shown: true,
                    variant: "danger",
                    message: "Oops! An error occurred while creating the collection " + state.collectionName
                });
                return {
                    activeNotifications: activeNotificationsCopy
                }
            });
        });
    }

    validateRequiredStringInput(input) {
        if (!input || input === '') {
            return 'This value cannot be empty!';
        }
    }

    render() {
        let notifications = this.state.activeNotifications.map((notification) =>
            <EmbeddedNotification
                shown={notification.shown}
                message={notification.message}
                variant={notification.variant}
                key={notification.id}
                unmountCallback={() => this.setState((prevState) => {
                    return {activeNotifications: prevState.activeNotifications.filter((notif) => notif.message !== notification.message)};
                })}
            />
        );

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
                                         onChange={this.handleChange.bind(this)} ref={this.nameWarningRef}/>
                            <ValidationErrorOverlay
                                show={this.state.errors['collectionName'] !== undefined}
                                target={this.nameWarningRef.current}
                                message={this.state.errors['collectionName']}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <InputGroup className="mb-3 col-sm-10">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="What this collection is about..." aria-label="Description"
                                         value={this.state.description} onChange={this.handleChange.bind(this)}
                                         ref={this.descWarningRef}/>
                            <ValidationErrorOverlay
                                show={this.state.errors['description'] !== undefined}
                                target={this.descWarningRef.current}
                                message={this.state.errors['description']}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Create
                    </Button>
                </Form>
            </Jumbotron>
        )
    }
}

export default CreateCollectionForm;