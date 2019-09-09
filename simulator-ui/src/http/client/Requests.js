import React from "react";
import Request from "./Request";

const emptyReq = {
    method: 'GET',
    uri: '',
    headers: []
};

function Requests(props) {
    return (<Request request={emptyReq}/>);
}

export default Requests;