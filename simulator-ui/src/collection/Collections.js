import React from "react"
import {Jumbotron} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CollectionTable from "./CollectionTable";
import CreateCollectionForm from "./CreateCollectionForm";

function Collections() {
    return (
        <Container>
            <div className="mt-4">
                <Jumbotron>
                    <h3>Collections Management</h3>
                    <CreateCollectionForm/>
                </Jumbotron>
                <CollectionTable/>
            </div>
        </Container>
    )
}

export default Collections;