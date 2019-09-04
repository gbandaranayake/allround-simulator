import React from "react"
import Container from "react-bootstrap/Container";
import CollectionTable from "./CollectionTable";
import CreateCollectionForm from "./CreateCollectionForm";

function Collections() {
    return (
        <Container>
            <div className="mt-4">
                <CreateCollectionForm/>
                <CollectionTable/>
            </div>
        </Container>
    )
}

export default Collections;