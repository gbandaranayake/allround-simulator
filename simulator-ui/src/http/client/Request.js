import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import FormControl from "react-bootstrap/FormControl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import DismissibleResponse from "./DismissibleResponse";
import EmbeddedNotification from "../../common/EmbeddedNotification";
import KeyValueInputPair from "../../common/KeyValueInputPair";
import {post} from "../../common/HttpFetchConnector";
import URLPaths from "../../common/URLPaths";
import {FaPlusCircle} from "react-icons/fa";
import '../../Custom.css';

function Request(props) {
    const [notifications, setNotifications] = useState([]);
    const [request, setRequest] = useState(props.request);

    const createNotifications = () => {
        return notifications.map((notification) =>
            <EmbeddedNotification
                shown={notification.shown}
                message={notification.message}
                variant={notification.variant}
                key={notification.id}
                unmountCallback={() => setNotifications(notifications.filter((notif) => notif.id !== notification.id))}
            />
        );
    };

    const createRequestHeaders = () => {
        return request.headers.map((h) => (
            <KeyValueInputPair
                id={h.id}
                key={h.id}
                keyLabel="Header name"
                valueLabel="Header value"
                keyValue={h.headerName}
                value={h.value}
                onKeyChange={(d) => {
                    let copy = JSON.parse(JSON.stringify(request));
                    copy.headers.find(head => head.id === h.id).keyValue = d;
                    setRequest(copy);
                }}
                onValueChange={(d) => {
                    let copy = JSON.parse(JSON.stringify(request));
                    copy.headers.find(head => head.id === h.id).value = d;
                    setRequest(copy);
                }}
                onDelete={() => {
                    let copy = JSON.parse(JSON.stringify(request));
                    copy.headers = copy.headers.filter(head => head.id !== h.id);
                    setRequest(copy);
                }}
            />));
    };

    const updateRequestParam = (paramKey, value) => {
        let copy = JSON.parse(JSON.stringify(request));
        copy[paramKey] = value;
        setRequest(copy);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let copy = JSON.parse(JSON.stringify(request));
        copy.collectionId = props.collectionId;
        post(URLPaths.httpRequests.create, copy)
            .then((res) => {
                handleSubmitResp(res);
            }, (error) => {
                addToNotifications({
                    id: Date.now(),
                    shown: true,
                    variant: "danger",
                    message: "Oops! An error occurred while creating the request " + request.name
                });
            });
    };

    const handleSubmitResp = (res) => {
        if (res.status && res.status !== 200) {
            addToNotifications({
                id: Date.now(),
                shown: true,
                variant: "danger",
                message: "Oops! An error occurred while creating the request " + request.name
            });
        } else {
            addToNotifications({
                id: res.id,
                shown: true,
                variant: "success",
                message: "Request " + res.name + " created successfully!"
            });
        }
    };

    const addToNotifications = (notification) => {
        let activeNotificationsCopy = [...notifications];
        activeNotificationsCopy.push(notification);
        setNotifications(activeNotificationsCopy)
    };

    const addNewHeader = () => {
        let copy = JSON.parse(JSON.stringify(request));
        let newHeader = {id: copy.headers.length, headerName: '', value: ''};
        copy.headers.push(newHeader);
        setRequest(copy);
    };

    let notificationElements = createNotifications();
    let headerElements = createRequestHeaders();

    return (
        <div className="mt-4">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId="method">
                    <InputGroup className="mb-3 col-sm-6">
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="request-method" defaultValue={'GET'}
                                               onChange={(val) => updateRequestParam('method', val)}>
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
                                     onChange={(e) => updateRequestParam('uri', e.target.value)}/>
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
                                onClick={() => addNewHeader()}><FaPlusCircle/></Button>
                    </OverlayTrigger>
                </div>
                <ButtonToolbar>
                    <Button variant="info" className="mr-2">
                        Send
                    </Button>
                    <Button variant="success" type="submit">
                        Save
                    </Button>
                </ButtonToolbar>
            </Form>
            <div className={'mt-3'}>
                {notificationElements}
            </div>
            <DismissibleResponse/>
        </div>
    );
}

export default Request;