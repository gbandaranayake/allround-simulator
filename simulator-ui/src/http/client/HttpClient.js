import React from "react"
import {Jumbotron} from "react-bootstrap";
import ClientParameters from "./ClientParameters";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function HttpClient() {
    return (
        <Container>
            <div className="mt-4">
                <Jumbotron>
                    <h3>HTTP Client Configurations</h3>
                    <Tabs defaultActiveKey="connection" id="uncontrolled-tab-example">
                        <Tab eventKey="connection" title="Connection">
                            <ClientParameters/>
                        </Tab>
                        <Tab eventKey="requests" title="Requests">
                        </Tab>
                        <Tab eventKey="automation" title="Automation">
                        </Tab>
                    </Tabs>
                </Jumbotron>
            </div>
        </Container>
    )
}

export default HttpClient;