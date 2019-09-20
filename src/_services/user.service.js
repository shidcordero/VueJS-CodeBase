import config from "config";

export const userService = {
    createUser,
    getAll,
    getById,
    update,
    delete: _delete
};

function createUser(user) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getAll(pagination) {
    const requestOptions = {
        method: "GET"
    };

    return fetch(`${config.apiUrl}/users?page=${pagination.page}&per_page=${pagination.perPage}`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}