import React from "react"
import Table from "react-bootstrap/Table";
import {FaBoxOpen, FaCrosshairs, FaDownload, FaWpforms} from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Fade from "react-bootstrap/Fade";
import Button from "react-bootstrap/Button";
import {FaTrashAlt} from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import {Jumbotron} from "react-bootstrap";
import URLPaths from "../common/URLPaths";
import {fireDelete} from "../common/HttpFetchConnector";
import DialogModal from "../common/DialogModal";
import {FaEject} from "react-icons/fa";
import EmbeddedNotification from "../common/EmbeddedNotification";
import {FaFilter} from "react-icons/fa";

class CollectionTable extends React.Component {
    constructor(props) {
        super(props);
        let filters = {
            filtersHidden: true,
            name: '',
            description: ''
        };
        this.state = {collectionToBeDeleted: undefined, activeNotifications: [], filters: filters};
        this.deleteCollection = this.deleteCollection.bind(this);
        this.setCollectionToBeDeleted = this.setCollectionToBeDeleted.bind(this);
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
            this.props.collectionDeletedCallback(rowId);
            this.setState((prevState, props) => {
                let activeNotificationsCopy = [...prevState.activeNotifications];
                activeNotificationsCopy.push({
                    shown: true,
                    variant: "success",
                    message: "Collection " + prevState.collectionToBeDeleted.name + " deleted successfully!"
                });
                return {
                    activeNotifications: activeNotificationsCopy
                };
            });
        }, error => {
            this.setState((state) => {
                let activeNotificationsCopy = [...state.activeNotifications];
                activeNotificationsCopy.push({
                    shown: true,
                    variant: "danger",
                    message: "Oops! An error occurred while deleting the collection " + state.collectionToBeDeleted.name
                });
                return {
                    activeNotifications: activeNotificationsCopy
                }
            });
        });
    }

    unsetCollectionToBeDeleted() {
        this.setState({
            collectionToBeDeleted: undefined
        });
    }

    displayCollectionSummary(collection) {

    }

    toggleFilters() {
        this.setState((prevState) => {
            return {
                filters: {
                    filtersHidden: !prevState.filters.filtersHidden,
                    name: prevState.filters.name,
                    description: prevState.filters.description
                }
            }
        })
    }

    getFilteredRows() {
        if (this.state.filters.filtersHidden || (this.state.filters.name === '' && this.state.filters.description === '')) {
            return this.props.rows;
        }
        return this.props.rows.filter((col) => (this.state.filters.name === '' || col.name.includes(this.state.filters.name))
            && (this.state.filters.description === '' || col.description.includes(this.state.filters.description)));
    }

    mapRowsDataToTableElements(collections) {
        return collections.map((collection, index) =>
            <tr key={collection.id}>
                <td>{collection.name}</td>
                <td>{collection.description}</td>
                <td style={{textAlign: "center"}}>
                    {this.props.openCollection.id !== collection.id &&
                    <OverlayTrigger
                        key={'open-collection-' + index}
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-open-collection` + index}>
                                Open the collection
                            </Tooltip>
                        }
                    >
                        <Button className="btn" size="sm" onClick={() => this.props.openCollectionCallback(collection)}
                                style={{
                                    'backgroundColor': 'transparent',
                                    color: '#AED6F1',
                                    'border': 'none'
                                }}><FaBoxOpen/></Button>
                    </OverlayTrigger>
                    }
                    {this.props.openCollection.id === collection.id &&
                    <OverlayTrigger
                        key={'exit-collection-' + index}
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-exit-collection` + index}>
                                Exit the collection
                            </Tooltip>
                        }
                    >
                        <Button className="btn" size="sm"
                                style={{'backgroundColor': 'transparent', color: '#AED6F1', 'border': 'none'}}
                                onClick={() => this.props.openCollectionCallback({})}><FaEject/></Button>
                    </OverlayTrigger>}
                    <OverlayTrigger
                        key={'display-collection-summary-' + index}
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-summary-collection` + index}>
                                View collection summary
                            </Tooltip>
                        }
                    >
                        <Button className="btn" size="sm"
                                style={{'backgroundColor': 'transparent', color: '#AED6F1', 'border': 'none'}}
                                onClick={() => this.displayCollectionSummary(collection)}><FaWpforms/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'download-collection-' + index}
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-download-collection` + index}>
                                Download the collection as a zip file
                            </Tooltip>
                        }
                    >
                        <Button className="btn" size="sm"
                                style={{'backgroundColor': 'transparent', color: '#AED6F1', 'border': 'none'}}
                                onClick={() => this.downloadCollection(collection)}><FaDownload/></Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={'delete-collection-' + index}
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-delete-collection` + index}>
                                Delete the collection
                            </Tooltip>
                        }
                    >
                        <Button className="btn" size="sm"
                                style={{'backgroundColor': 'transparent', color: '#AED6F1', 'border': 'none'}}
                                onClick={() => this.setCollectionToBeDeleted(collection)}><FaTrashAlt/></Button>
                    </OverlayTrigger>
                </td>
            </tr>
        );
    }

    createTableControlButtons() {
        return <div className="text-right">
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        Filter collections
                    </Tooltip>
                }
            >
                <Button className="btn" size="sm"
                        style={{
                            'backgroundColor': 'transparent',
                            color: '#5D6D7E',
                            'border': 'none'
                        }}
                        onClick={() => this.toggleFilters()}><FaFilter/></Button>
            </OverlayTrigger>
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        Show open collection
                    </Tooltip>
                }
            >
                <Button className="btn" size="sm"
                        style={{
                            'backgroundColor': 'transparent',
                            color: '#5D6D7E',
                            'border': 'none'
                        }}
                        onClick={() => console.log('filter clicked')}><FaCrosshairs/>
                </Button>
            </OverlayTrigger>
        </div>;
    }

    handleNameFilterInputChange(e) {
        const newNameValue = e.nativeEvent.target.value;
        this.setState((prevState) => {
            return {
                filters: {
                    filtersHidden: prevState.filters.filtersHidden,
                    name: newNameValue,
                    description: prevState.filters.description
                }
            }
        });
    }

    handleDescriptionFilterInputChange(e) {
        const newDescriptionValue = e.nativeEvent.target.value;
        this.setState((prevState) => {
            return {
                filters: {
                    filtersHidden: prevState.filters.filtersHidden,
                    name: prevState.filters.name,
                    description: newDescriptionValue
                }
            }
        });
    }

    render() {
        if (this.props.rows.length === 0 && this.state.activeNotifications.length === 0) {
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

        let notifications = this.state.activeNotifications.map((notification, index) =>
            <EmbeddedNotification
                shown={notification.shown}
                message={notification.message}
                variant={notification.variant}
                key={"notif-" + index}
                unmountCallback={() => this.setState((prevState) => {
                    return {activeNotifications: prevState.activeNotifications.filter((notif, idx) => index !== idx)};
                })}
            />
        );

        let filteredRows = this.getFilteredRows();
        const tableRowElements = this.mapRowsDataToTableElements(filteredRows);
        return (
            <React.Fragment>
                {deleteModal}
                <Fade in={true} appear={true}>
                    <Jumbotron>
                        {notifications}
                        <div>
                            {this.createTableControlButtons()}
                            <Table bordered hover variant="dark" size="sm">
                                <thead>
                                <tr>
                                    <th className="font-weight-normal text-center" style={{'width': '20%'}}>Name
                                    </th>
                                    <th className="font-weight-normal text-center"
                                        style={{'width': '60%'}}>Description
                                    </th>
                                    <th className="font-weight-normal text-center"
                                        style={{'width': '20%'}}>Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr hidden={this.state.filters.filtersHidden}>
                                    <td>
                                        <input type="text"
                                               onChange={(e) => this.handleNameFilterInputChange(e)}/>
                                    </td>
                                    <td>
                                        <input type="text" style={{'width': '-webkit-fill-available'}}
                                               onChange={(e) => this.handleDescriptionFilterInputChange(e)}/>
                                    </td>
                                    <td>
                                        <input type="text" disabled={true}/>
                                    </td>
                                </tr>
                                {tableRowElements}
                                </tbody>
                            </Table>
                        </div>
                    </Jumbotron>
                </Fade>
            </React.Fragment>
        )
    }

    downloadCollection(collection) {

    }
}

export default CollectionTable;