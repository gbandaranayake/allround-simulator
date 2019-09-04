import React from "react";
import Collapse from "react-bootstrap/Collapse";
import Alert from "react-bootstrap/Alert";

class SuccessNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shown: props.shown}
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({shown: false});
        }.bind(this), 5000);
    }

    render() {
        return (
            <Collapse in={this.state.shown} appear={true} unmountOnExit={true}>
                <div>
                    <Alert variant={this.props.variant}>
                        {this.props.message}
                    </Alert>
                </div>
            </Collapse>
        );
    }
}

export default SuccessNotification;