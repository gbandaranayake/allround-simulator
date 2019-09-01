import React from "react"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HttpClient from "../http/client/HttpClient";
import Container from "react-bootstrap/Container";
import Collections from "../collection/Collections";

class DefaultNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tab: "collections"};
        this.changeTab = this.changeTab.bind(this);
    }

    tabs = {
        'collections': <Collections/>,
        'httpClient': <HttpClient/>,
        'httpServer': <HttpClient/>,
        'settings': <HttpClient/>
    };

    changeTab = eventKey => {
        this.setState({tab: eventKey})
    };

    render() {
        return (
            <Container fluid>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav variant="pills" defaultActiveKey="collections" onSelect={this.changeTab}>
                            <Nav.Item>
                                <Nav.Link eventKey="collections">Collections</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="httpClient">HTTP Client</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="httpServer">HTTP Server</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="settings">Settings</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {this.tabs[this.state.tab]}
            </Container>
        )
    }
}

export default DefaultNavBar;