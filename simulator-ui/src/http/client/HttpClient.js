import React from "react"
import {Jumbotron} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Requests from "./Requests";

function HttpClient() {
    return (
        <Container>
            <div className="mt-4">
                <Jumbotron>
                    <h3>HTTP Client Configurations</h3>
                    <Tabs defaultActiveKey="requests" id="request-tabs">
                        <Tab eventKey="requests" title="Requests">
                            <Requests/>
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