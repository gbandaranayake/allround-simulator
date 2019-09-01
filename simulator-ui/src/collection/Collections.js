import React from "react"
import {Jumbotron} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CollectionTable from "./CollectionTable";
import CollectionInfoInput from "./CollectionInfoInput";

function Collections() {
    return (
        <Container>
            <div className="mt-4">
                <Jumbotron>
                    <h3>Collections Management</h3>
                    <CollectionInfoInput/>
                </Jumbotron>
                <Jumbotron>
                    <CollectionTable/>
                </Jumbotron>
            </div>
        </Container>
    )
}

export default Collections;