const base = "http://127.0.0.1:8080/";

const URLPaths = {
    base : base,
    collections : {
        fetch : base + 'collections/all',
        create : base + 'collections/create',
        delete : base + 'collections/delete'
    },
    httpRequests : {
        fetch: base + 'http/requests/all',
        create: base + 'http/requests/create',
        delete: base + 'http/requests/delete',
        update: base + 'http/requests/update'
    }
};

export default URLPaths;