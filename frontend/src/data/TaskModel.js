import Api from "../utils/Api"

const TaskModel = {
    async create(listId, name, description, deadline) {
        return await new Promise(function(resolve, reject) {
            Api.callPost("tasks/create", { listId: listId, name: name, description: description, deadline: deadline }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve()
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    },
    async update(id, name, description, deadline) {
        return await new Promise(function(resolve, reject) {
            Api.callPost("tasks/update", { id: id, name: name, description: description, deadline: deadline }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve()
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    },
    async delete(id) {
        return await new Promise(function(resolve, reject) {
            Api.callPost("tasks/delete", { id: id }, function(error, data) {
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
    async complete(id) {
        return await new Promise(function(resolve, reject) {
            Api.callPost("tasks/complete", { id: id }, function(error, data) {
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
    async deleteMany(ids) {
        return await new Promise(function(resolve, reject) {
            Api.callPost("tasks/delete/many", { ids: ids }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve(data.ids)
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    },
    async moveMany(listId, ids) {
        return await new Promise(function(resolve, reject) {
            Api.callPost("tasks/move/many", { listId: listId, ids: ids }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve(data.ids)
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    },
    async get(listId, skip) {
        return await new Promise(function(resolve, reject) {
            Api.callGet("tasks/get", { listId: listId, skip: skip }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve(data.tasks)
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    },
    async item(id) {
        return await new Promise(function(resolve, reject) {
            Api.callGet("tasks/item", { id: id }, function(error, data) {
                if (error) {
                    reject(error)
                } else {
                    if (data.success) {
                        resolve(data.task)
                    } else {
                        reject(data.error)
                    }
                }
            })
        })
    }
}

export default TaskModel