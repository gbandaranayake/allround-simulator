import React from "react"
import Table from "react-bootstrap/Table";
import {FaBoxOpen} from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Fade from "react-bootstrap/Fade";
import Button from "react-bootstrap/Button";
import {FaTrashAlt} from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import {Jumbotron} from "react-bootstrap";
import URLPaths from "../common/URLPaths";
import {fireDelete, get} from "../common/HttpFetchConnector";

class CollectionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rows: []};
        this.fetchCollections = this.fetchCollections.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
    }

    fetchCollections = () => {
        try {
            let url = URLPaths.collections.fetch;
            get(url).then(collections => {
                this.setState({
                    rows: collections
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

    deleteCollection(rowId) {
        fireDelete(URLPaths.collections.delete, {
            id: rowId
        }).then(res => {
            this.setState({rows: this.state.rows.filter(r => r.id !== rowId)})
        });
    }

    render() {
        if (this.state.rows.length === 0) {
            return null;
        }
        const tableRowElements = this.state.rows.map((collection) =>
            <tr key={collection.id}>
                <Fade in={true} appear={true} timeout={5000} duration={5000}>
                    <td>{collection.name}</td>
                </Fade>
                <Fade in={true} appear={true} timeout={5000} duration={5000}>
                    <td>{collection.description}</td>
                </Fade>
                <td style={{textAlign: "center"}}>
                    <OverlayTrigger
                        key="open-collection"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-open-collection`}>
                                Open collection
                            </Tooltip>
                        }
                    >
                        <Button className="btn"
                                style={{'backgroundColor': 'transparent', 'border': 'none'}}><FaBoxOpen/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key="delete-collection"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-delete-collection`}>
                                Delete collection
                            </Tooltip>
                        }
                    >
                        <Button className="btn" style={{'backgroundColor': 'transparent', 'border': 'none'}}
                                onClick={() => this.deleteCollection(collection.id)}><FaTrashAlt/></Button>
                    </OverlayTrigger>
                </td>
            </tr>
        );

        return (
            <Jumbotron>
                <Table bordered hover variant="dark" size="sm">
                    <thead>
                    <tr>
                        <th className="font-weight-normal">Name</th>
                        <th className="font-weight-normal">Description</th>
                        <th className="font-weight-normal text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableRowElements}
                    </tbody>
                </Table>
            </Jumbotron>
        )
    }
}

export default CollectionTable;