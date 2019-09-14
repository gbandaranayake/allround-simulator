import React, {useState, useEffect} from "react";
import Request from "./Request";
import URLPaths from "../../common/URLPaths";
import {get} from "../../common/HttpFetchConnector";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import '../../Custom.css';
import {FaRegWindowMaximize} from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {FaRegTrashAlt} from "react-icons/fa";

function Requests(props) {
    const [requests, setRequests] = useState([]);
    const [refreshIntervalId, setRefreshIntervalId] = useState(0);

    const refreshRequests = () => {
        try {
            let url = URLPaths.httpRequests.fetch + '?collectionId=' + props.collectionId;
            get(url).then(requests => {
                setRequests(requests);
            }, error => {
                console.log('failed to fetch the requests list ' + this);
            });
        } catch (e) {
            console.log('failed to fetch the requests list');
        }
    };

    if (refreshIntervalId === 0) {
        setRefreshIntervalId(
            setInterval(() => refreshRequests(), 5000)
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
        <Accordion defaultActiveKey="0" key={index} className="mt-3">
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
                        <Button className="btn" size="lg" onClick={() => console.log('delete req clicked')} variant="outline-danger"
                                style={{cssFloat: 'right'}}><FaRegTrashAlt/></Button>
                    </OverlayTrigger>
                    <Accordion.Toggle as={Button} variant="outline-success" eventKey="0" size="lg" style={{cssFloat: 'right'}}>
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
                        <Accordion.Toggle as={Button} variant="outline-success" eventKey="0" size="lg" style={{cssFloat: 'right'}}>
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