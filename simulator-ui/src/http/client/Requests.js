import React, {useEffect, useState} from "react";
import Request from "./Request";
import URLPaths from "../../common/URLPaths";
import {fireDelete, get} from "../../common/HttpFetchConnector";
import '../../Custom.css';

function Requests(props) {
    const [requests, setRequests] = useState([]);
    const [refreshIntervalId, setRefreshIntervalId] = useState(0);

    const refreshRequests = () => {
        try {
            let url = URLPaths.httpRequests.fetch + '?collectionId=' + (props.collectionId || '');
            get(url).then(requests => {
                let headersIdResolvedRequests = requests.map(r => {
                    r.headers = r.headers.map((h, i) => {
                        h.id = i;
                        h.headerName = h.first;
                        h.value = h.second;
                        delete h.first;
                        delete h.second;
                        return h;
                    });
                    return r;
                });
                setRequests(headersIdResolvedRequests);
            }, error => {
                console.log('failed to fetch the requests list ' + this);
            });
        } catch (e) {
            console.log('failed to fetch the requests list');
        }
    };

    const deleteRequest = (requestId) => {
        fireDelete(URLPaths.httpRequests.delete + "?requestId=" + requestId).then(res => {
            console.log("Received delete request response " + res);
        }, error => {
            console.log("deleting the request failed");
        });
    };

    const syncRequestObjectWithState = (req) => {
        console.log(req);
        let requestsCopy = [...requests];
        let availableReq = requestsCopy.filter(r => r.id === req.id);
        console.log(availableReq);
        if (availableReq.length > 0) {
            requestsCopy[requestsCopy.indexOf(availableReq[0])] = req;
        } else {
            requestsCopy.push(req);
        }
        console.log(requestsCopy);
        setRequests(requestsCopy);
    };

    if (refreshIntervalId === 0) {
        refreshRequests();
        setRefreshIntervalId(
            setInterval(() => refreshRequests(), 20000)
        );
    }

    useEffect(() => {
        return () => {
            if (refreshIntervalId > 0) {
                clearInterval(refreshIntervalId);
            }
        }
    }, [refreshIntervalId]);

    const requestElements = requests.map((req) => <Request request={req} collectionId={props.collectionId} key={req.id}
                                                           onDelete={deleteRequest}
                                                           deleteModalAnimationEnd={(requestId) => setRequests(requests.filter(r => r.id !== requestId))}
                                                           savedRequestCallback={(syncRequestObjectWithState)}/>);

    return (
        <React.Fragment>
            <Request collectionId={props.collectionId} createNew={true} savedRequestCallback={(syncRequestObjectWithState)}/>
            {requestElements}
        </React.Fragment>
    );
}

export default Requests;