import React from "react"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HttpClient from "../http/client/HttpClient";
import Container from "react-bootstrap/Container";
import Collections from "../collection/Collections";
import Badge from "react-bootstrap/Badge";

class DefaultNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tab: "collections", openCollection: {}};
        this.changeTab = this.changeTab.bind(this);
    }

    getTab(tabName) {
        switch (tabName) {
            case 'collections':
                return <Collections openCollectionCallback={(d) => this.setState({openCollection: d})}
                                    openCollection={this.state.openCollection}/>;
            case 'httpClient' :
                return <HttpClient collectionId={(this.state.openCollection || {}).id}/>;
            case 'httpServer' :
                return <HttpClient/>;
            case 'settings' :
                return <HttpClient/>;
            default:
                return <Collections openCollectionCallback={(d) => this.setState({openCollection: d})}
                                    openCollection={this.state.openCollection}/>;
        }
    }

    changeTab = eventKey => {
        this.setState({tab: eventKey})
    };

    render() {
        return (
            <Container fluid>
                <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav variant="pills" defaultActiveKey="collections" onSelect={this.changeTab}>
                            <Nav.Item>
                                <Nav.Link eventKey="collections">
                                    Collections {this.state.openCollection.name &&
                                <Badge variant="success">{this.state.openCollection.name}</Badge>}
                                </Nav.Link>
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
                {this.getTab(this.state.tab)}
            </Container>
        )
    }
}

export default DefaultNavBar;