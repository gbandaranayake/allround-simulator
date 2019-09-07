import React from "react"
import Container from "react-bootstrap/Container";
import CollectionTable from "./CollectionTable";
import CreateCollectionForm from "./CreateCollectionForm";
import URLPaths from "../common/URLPaths";
import {get} from "../common/HttpFetchConnector";

class Collections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collections: []}
    }

    fetchCollections = () => {
        try {
            let url = URLPaths.collections.fetch;
            get(url).then(collections => {
                this.setState({
                    collections: collections
                });
            }, error => {
                console.log('failed to fetch the collections list ' + this);
            });
        } catch (e) {
            console.log('failed to fetch the collections list');
        }
    };

    componentDidMount() {
        this.fetchCollections();
        this.timerId = setInterval(
            () => this.fetchCollections(),
            60000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }


    render() {
        return (
            <Container>
                <div className="mt-4">
                    <CreateCollectionForm
                        newCollectionAddedCallback={(collection) => this.setState((prevState) => {
                            let collectionsCopy = [...prevState.collections];
                            collectionsCopy.push(collection);
                            return {collections: collectionsCopy};
                        })}
                    />
                    <CollectionTable
                        openCollection={this.props.openCollection}
                        openCollectionCallback={this.props.openCollectionCallback}
                        rows={this.state.collections}
                        collectionDeletedCallback={(rowId) => this.setState((prevState) => {
                            return {collections: prevState.collections.filter(r => r.id !== rowId)};
                        })}
                    />
                </div>
            </Container>
        )
    }
}

export default Collections;