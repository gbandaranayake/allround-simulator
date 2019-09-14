import React, {useEffect, useState} from "react";
import Request from "./Request";
import URLPaths from "../../common/URLPaths";
import {fireDelete, get} from "../../common/HttpFetchConnector";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import '../../Custom.css';
import {FaRegTrashAlt, FaRegWindowMaximize} from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Requests(props) {
    const [requests, setRequests] = useState([]);
    const [refreshIntervalId, setRefreshIntervalId] = useState(0);

    const refreshRequests = () => {
        try {
            let url = URLPaths.httpRequests.fetch + '?collectionId=' + (props.collectionId || '');
            get(url).then(requests => {
                let headersIdResolvedRequests = requests.map(r => {
                    r.headers = r.headers.map((h, i) => {
                        h.id = i;
                        h.headerName = h.first;
                        h.value = h.second;
                        delete h.first; delete h.second;
                        return h;
                    });
                    return r;
                });
                setRequests(headersIdResolvedRequests);
            }, error => {
                console.log('failed to fetch the requests list ' + this);
            });
        } catch (e) {
            console.log('failed to fetch the requests list');
        }
    };

    const deleteRequest = (requestId) => {
        fireDelete(URLPaths.httpRequests.delete + "?requestId=" + requestId).then(res => {
            setRequests(requests.filter(r => r.id !== requestId));
        }, error => {
            console.log("deleting the request failed");
        });
    };

    if (refreshIntervalId === 0) {
        refreshRequests();
        setRefreshIntervalId(
            setInterval(() => refreshRequests(), 20000)
        );
    }

    useEffect(() => {
        return () => {
            if (refreshIntervalId > 0) {
                clearInterval(refreshIntervalId);
            }
        }
    }, [refreshIntervalId]);

    const requestElements = requests.map((req, index) =>
        <Accordion key={index} className="mt-3">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="outline-success" eventKey="0" size="lg">
                        {req.name}
                    </Accordion.Toggle>
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-open-collection` + index}>
                                Delete the request
                            </Tooltip>
                        }
                    >
                        <Button className="btn" size="lg" onClick={() => deleteRequest(req.id)}
                                variant="outline-danger"
                                style={{cssFloat: 'right'}}><FaRegTrashAlt/></Button>
                    </OverlayTrigger>
                    <Accordion.Toggle as={Button} variant="outline-success" eventKey="0" size="lg"
                                      style={{cssFloat: 'right'}}>
                        <FaRegWindowMaximize/>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Request request={req} collectionId={props.collectionId}/>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );


    return (
        <React.Fragment>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="outline-success" eventKey="0" size="lg">
                            Create new HTTP request
                        </Accordion.Toggle>
                        <Accordion.Toggle as={Button} variant="outline-success" eventKey="0" size="lg"
                                          style={{cssFloat: 'right'}}>
                            <FaRegWindowMaximize/>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Request collectionId={props.collectionId}/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            {requestElements}
        </React.Fragment>
    );
}

export default Requests;