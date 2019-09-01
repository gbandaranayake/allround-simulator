import React from "react"
import Table from "react-bootstrap/Table";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import {FaTrashAlt} from "react-icons/fa";
import {FaBoxOpen} from "react-icons/fa";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class CollectionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rows: props.rows};

        this.deleteRow = this.deleteRow.bind(this);
    }

    deleteRow(rowId) {
        this.setState({rows: this.state.rows.filter(r => r.id !== rowId)})
    }

    render() {
        const tableRowElements = this.state.rows.map((collection) =>
            <tr>
                <td>collection.id</td>
                <td>collection.name</td>
                <td>collection.description</td>
                <td>
                    <ButtonToolbar>
                        <OverlayTrigger
                            placement="right-start"
                            delay={{show: 250, hide: 400}}
                            overlay={props => <div
                                {...props}
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                    padding: '2px 10px',
                                    color: 'white',
                                    borderRadius: 3,
                                    ...props.style,
                                }}
                            >
                                Open
                            </div>
                            }
                        >
                            <Button variant="success"><FaBoxOpen/></Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="right-start"
                            delay={{show: 250, hide: 400}}
                            overlay={props => <div
                                {...props}
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                    padding: '2px 10px',
                                    color: 'white',
                                    borderRadius: 3,
                                    ...props.style,
                                }}
                            >
                                Delete
                            </div>
                            }
                        >
                            <Button variant="danger" onClick={this.delete(collection.id)}><FaTrashAlt/></Button>
                        </OverlayTrigger>
                    </ButtonToolbar>
                </td>
            </tr>);

        return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableRowElements}
                </tbody>
            </Table>
        )
    }
}

export default CollectionTable;