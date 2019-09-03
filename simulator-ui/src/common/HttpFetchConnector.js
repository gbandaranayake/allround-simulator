export function get(url, responseHandler, errorHandler) {
    return fetch(url).then(res => res.json())
}

export function post(url, body, responseHandler, errorHandler) {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export function fireDelete(url, content) {
    return fetch(url, {
        method: "DELETE",
        mode: "cors",
        body: JSON.stringify(content),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

