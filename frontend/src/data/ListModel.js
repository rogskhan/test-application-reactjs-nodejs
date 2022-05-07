import Api from "../utils/Api"

const ListModel = {
    async create(name) {
        return await new Promise(function(resolve, reject) {
            Api.callPost("lists/create", { name: name }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve(data.id)
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    },
    async delete(id) {
        return await new Promise(function(resolve, reject) {
            Api.callPost("lists/delete", { id: id }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve(data.id)
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    },
    async get(skip) {
        return await new Promise(function(resolve, reject) {
            Api.callGet("lists/get", { skip: skip }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve(data.lists)
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    },
    async find(q) {
        return await new Promise(function(resolve, reject) {
            Api.callGet("lists/find", { q: q }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve(data.lists)
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    }
}

export default ListModel