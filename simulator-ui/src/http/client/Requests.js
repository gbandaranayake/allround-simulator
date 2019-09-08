import React from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import '../../Custom.css';
import {post} from "../../common/HttpFetchConnector";
import URLPaths from "../../common/URLPaths";
import EmbeddedNotification from "../../common/EmbeddedNotification";
import KeyValueInputPair from "../../common/KeyValueInputPair";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FaPlusCircle} from "react-icons/fa";

const emptyReq = {
    method: 'GET',
    uri: '',
    headers: []
};

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingReq: JSON.parse(JSON.stringify(emptyReq)),
            activeNotifications: []
        }
    }

    handleRequestMethodChange(val) {
        this.setEditingReqValueInState('method', val);
    }

    handleUriChange(e) {
        this.setEditingReqValueInState('uri', e.target.value)
    }

    setEditingReqValueInState(key, val) {
        this.setState((prevState) => {
            let copy = JSON.parse(JSON.stringify(prevState.editingReq));
            copy[key] = val;
            return {editingReq: copy};
        });
    }

    addToActiveNotifications(notification, resetEditingReq = false) {
        this.setState((state) => {
            let activeNotificationsCopy = [...state.activeNotifications];
            activeNotificationsCopy.push(notification);
            return {
                activeNotifications: activeNotificationsCopy,
                editingReq: resetEditingReq ? JSON.parse(JSON.stringify(emptyReq)) : state.editingReq
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        post(URLPaths.httpRequests.create, this.state.editingReq)
            .then((res) => {
                this.handleSubmitRes(res);
            }, (error) => {
                this.addToActiveNotifications({
                    id: Date.now(),
                    shown: true,
                    variant: "danger",
                    message: "Oops! An error occurred while creating the request " + this.state.editingReq.name
                });
            });
    }

    handleSubmitRes(res) {
        if (res.status && res.status !== 200) {
            this.addToActiveNotifications({
                id: Date.now(),
                shown: true,
                variant: "danger",
                message: "Oops! An error occurred while creating the request " + this.state.editingReq.name
            });
        } else {
            this.addToActiveNotifications({
                id: res.id,
                shown: true,
                variant: "success",
                message: "Request " + res.name + " created successfully!"
            }, true)
        }
    }

    addHeaderToEditingReq() {
        this.setState((prevState) => {
            let copy = JSON.parse(JSON.stringify(prevState.editingReq));
            let newHeader = {id: copy.headers.length, headerName: '', value: ''};
            copy.headers.push(newHeader);
            return {editingReq: copy};
        })
    }

    render() {
        let notifications = this.state.activeNotifications.map((notification) =>
            <EmbeddedNotification
                shown={notification.shown}
                message={notification.message}
                variant={notification.variant}
                key={notification.id}
                unmountCallback={() => this.setState((prevState) => {
                    return {activeNotifications: prevState.activeNotifications.filter((notif) => notif.id !== notification.id)};
                })}
            />
        );

        let headerElements = this.state.editingReq.headers.map((h) => (
            <KeyValueInputPair
                id={h.id}
                key={h.id}
                keyLabel="Header name"
                valueLabel="Header value"
                keyValue={h.headerName}
                value={h.value}
                onKeyChange={(d) => {
                    this.setState((state) => {
                        let copy = JSON.parse(JSON.stringify(state.editingReq));
                        copy.headers.find(head => head.id === h.id).keyValue = d;
                        return {
                            editingReq: copy
                        }
                    })
                }}
                onValueChange={(d) => {
                    this.setState((state) => {
                        let copy = JSON.parse(JSON.stringify(state.editingReq));
                        copy.headers.find(head => head.id === h.id).value = d;
                        return {
                            editingReq: copy
                        }
                    })
                }}
                onDelete={(d) => {
                    this.setState((state) => {
                        let copy = JSON.parse(JSON.stringify(state.editingReq));
                        copy.headers = copy.headers.filter(head => head.id !== h.id);
                        return {
                            editingReq: copy
                        }
                    })
                }}
            />));

        return (
            <div className="mt-4">
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group controlId="method">
                        <InputGroup className="mb-3 col-sm-6">
                            <ButtonToolbar>
                                <ToggleButtonGroup type="radio" name="request-method" defaultValue={'GET'}
                                                   onChange={(val) => this.handleRequestMethodChange(val)}>
                                    <ToggleButton value={'GET'} variant={'success'}>GET</ToggleButton>
                                    <ToggleButton value={'POST'} variant={'success'}>POST</ToggleButton>
                                    <ToggleButton value={'PUT'} variant={'success'}>PUT</ToggleButton>
                                    <ToggleButton value={'DELETE'} variant={'success'}>DELETE</ToggleButton>
                                    <ToggleButton value={'PATCH'} variant={'success'}>PATCH</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="uri">
                        <InputGroup className="mb-3 col-sm-12">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="uri-label">URI</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Paste URI here.." aria-label="URI" aria-describedby="uri-label"
                                         onChange={(e) => this.handleUriChange(e)}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="col-sm-12" controlId="body">
                        <Form.Label id="body-label">Request body</Form.Label>
                        <Form.Control as="textarea" rows="6" aria-describedby="body-label"/>
                    </Form.Group>
                    {headerElements}
                    <div className="text-right mr-2">
                        <OverlayTrigger
                            placement="right"
                            overlay={
                                <Tooltip>
                                    Add HTTP header
                                </Tooltip>
                            }
                        >
                            <Button className="btn" size="sm"
                                    style={{
                                        'backgroundColor': 'transparent',
                                        color: '#14bd00',
                                        'border': 'none'
                                    }}
                                    onClick={() => this.addHeaderToEditingReq()}><FaPlusCircle/></Button>
                        </OverlayTrigger>
                    </div>
                    <Button variant="success" type="submit">
                        Save
                    </Button>
                </Form>
                <div className={'mt-3'}>
                    {notifications}
                </div>
            </div>
        );
    }
}

export default Requests;