import React from "react"
import {Jumbotron} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CollectionTable from "./CollectionTable";
import CollectionInfoInput from "./CollectionInfoInput";

class Collections extends React.Component{
    constructor(props) {
        super(props);
        this.state = {collections : []};

        this.fetchCollections = this.fetchCollections.bind(this);
    }

    fetchCollections = () =>{
        let url = 'http://127.0.0.1:8080/collections/all';
        fetch(url).
        then(response => response.json()).then((collections) => {
            this.setState({
                collections: collections
            });
        });
    };

    componentDidMount() {
        this.timerId = setInterval(
            () => this.fetchCollections(),
            5000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <Container>
                <div className="mt-4">
                    <Jumbotron>
                        <h3>Collections Management</h3>
                        <CollectionInfoInput/>
                    </Jumbotron>
                    <Jumbotron>
                        <CollectionTable rows={this.state.collections}/>
                    </Jumbotron>
                </div>
            </Container>
        )
    }
}

export default Collections;