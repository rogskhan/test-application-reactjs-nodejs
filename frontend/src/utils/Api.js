const Api =  {
    baseUrl: process.env.REACT_APP_BASE_API,
    call(endpoint, data, method, callback) {
        var options = {
            method: method,
            headers: {'Content-Type':'application/json'}
        }
        if (method === 'post') {
            options.body = JSON.stringify(data)
        } else {
            const params = new URLSearchParams(data).toString()
            if (params !== '') {
                endpoint = endpoint + '?' + params
            }
        }
        fetch(Api.baseUrl + endpoint, options)
        .then(async (response) => {
            const data = await response.json()
            if(response.status === 200) {
                callback(false, data)
            } else {
                callback(true, response.status)
            }
        })
        .catch((error) => {
            callback(true, error)
        })
    },
    callPost(endpoint, data, callback) {
        Api.call(endpoint, data, 'post', callback)
    },
    callGet(endpoint, data, callback) {
        Api.call(endpoint, data, 'get', callback)
    }
}

export default Api