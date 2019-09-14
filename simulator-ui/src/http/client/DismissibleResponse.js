import React, {useState} from "react";
import Alert from "react-bootstrap/Alert";

function DismissibleResponse(props) {
    const [show, setShow] = useState(props.show);

    function formatAsJsonIfJson(content) {
        try {
            return JSON.stringify(JSON.parse(props.response.body), undefined, 2);
        } catch (e) {
            return content
        }
    }

    return (
        <Alert variant="success" show={show} onClose={() => {
            setShow(false);
            !!props.onClose && props.onClose();
        }} dismissible>
            <Alert.Heading>{props.response.status} {props.response.reason}</Alert.Heading>
            <hr/>
            <p style={{'whiteSpace': 'pre-wrap'}}>
                {props.response.headers.map(h => h.first + " : " + h.second + "\n")}
            </p>
            <hr/>
            <pre className="mb-0">
                {formatAsJsonIfJson(props.response.body)}
            </pre>
        </Alert>
    );
}

export default DismissibleResponse;