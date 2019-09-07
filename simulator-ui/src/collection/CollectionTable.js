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
import DialogModal from "../common/DialogModal";
import {FaEject} from "react-icons/fa";

class CollectionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rows: [], collectionToBeDeleted: undefined};
        this.fetchCollections = this.fetchCollections.bind(this);
        this.deleteCollection = this.deleteCollection.bind(this);
        this.setCollectionToBeDeleted = this.setCollectionToBeDeleted.bind(this);
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

    setCollectionToBeDeleted(collection) {
        this.setState(
            {
                collectionToBeDeleted: collection
            }
        );
    }

    deleteCollection(rowId) {
        fireDelete(URLPaths.collections.delete, {
            id: rowId
        }).then(res => {
            this.setState((prevState, props) => {
                return {
                    rows: prevState.rows.filter(r => r.id !== rowId)
                };
            });
        });
    }

    unsetCollectionToBeDeleted() {
        this.setState((prevState, props) => {
            return {
                collectionToBeDeleted: undefined
            };
        });
    }

    render() {
        if (this.state.rows.length === 0) {
            return null;
        }
        const deleteModal = this.state.collectionToBeDeleted && (
            <DialogModal
                show={true}
                header="Delete Collection"
                body={"Are you sure you want to delete " + this.state.collectionToBeDeleted.name + "?"}
                onConfirm={() => this.deleteCollection(this.state.collectionToBeDeleted.id)}
                onExited={() => this.unsetCollectionToBeDeleted()}
            />);
        const tableRowElements = this.state.rows.map((collection, index) =>
            <tr key={collection.id}>
                <td>{collection.name}</td>
                <td>{collection.description}</td>
                <td style={{textAlign: "center"}}>
                    <OverlayTrigger
                        key={'open-collection-' + index}
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-open-collection` + index}>
                                Open collection
                            </Tooltip>
                        }
                    >
                        <Button className="btn" onClick={() => this.props.openCollectionCallback(collection)}
                                style={{'backgroundColor': 'transparent', 'border': 'none'}}><FaBoxOpen/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'delete-collection-' + index}
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-delete-collection` + index}>
                                Delete collection
                            </Tooltip>
                        }
                    >
                        <Button className="btn" style={{'backgroundColor': 'transparent', 'border': 'none'}}
                                onClick={() => this.setCollectionToBeDeleted(collection)}><FaTrashAlt/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'exit-collection-' + index}
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-exit-collection` + index}>
                                Exit collection
                            </Tooltip>
                        }
                    >
                        <Button className="btn" style={{'backgroundColor': 'transparent', 'border': 'none'}}
                                onClick={() => this.props.openCollectionCallback()}><FaEject/></Button>
                    </OverlayTrigger>
                </td>
            </tr>
        );
        return (
            <React.Fragment>
                {deleteModal}
                <Fade in={true} appear={true}>
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
                </Fade>
            </React.Fragment>
        )
    }
}

export default CollectionTable;