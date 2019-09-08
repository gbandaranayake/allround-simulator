import React from "react"
import {Jumbotron} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Requests from "./Requests";

function HttpClient(props) {
    return (
        <Container>
            <div className="mt-4">
                <Jumbotron>
                    <h3>HTTP Requests</h3>
                    <Tabs defaultActiveKey="requests" id="request-tabs">
                        <Tab eventKey="requests" title="Requests">
                            <Requests collectionId={props.collectionId}/>
                        </Tab>
                        <Tab eventKey="statistics" title="Statistics">
                        </Tab>
                        <Tab eventKey="tests" title="Tests">
                        </Tab>
                    </Tabs>
                </Jumbotron>
            </div>
        </Container>
    )
}

export default HttpClient;