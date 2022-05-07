const Task = require('../data/models/task.js')

exports.createTask = async function(req, res) {
    /*  
    #swagger.tags = ['Task']
    #swagger.summary = 'To create a task'
    #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/TaskCreateRequest' }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TaskCreateResponse' }
    }
    */
    var result = false
    var _id = ""
    var error = ""
    try {
        let data = req.body
        if (data.listId === "") {
            error = "List cannot be empty!"
        } else if (data.name === "") {
            error = "Name cannot be empty!"
        } else if (data.description === "") {
            error = "Description cannot be empty!"
        } else if (data.deadline === "") {
            error = "Deadline cannot be empty!"
        } else {
            var task = new Task(req.db)
            task.data.listId = data.listId
            task.data.name = data.name
            task.data.description = data.description
            task.data.deadline = new Date(data.deadline)
            result = await task.create()
            _id = task._id
        }
    } catch (e) {
        error = e.message
    }
    res.json({ id: _id, success: result, error: error })
}

exports.updateTask = async function(req, res) {
    /*  
    #swagger.tags = ['Task']
    #swagger.summary = 'To update a task'
    #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/TaskUpdateRequest' }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TaskUpdateResponse' }
    }
    */
    var result = false
    var error = ""
    try {
        let data = req.body
        if (data.id === "") {
            error = "Id cannot be empty!"
        } else {
            var task = new Task(req.db)
            var newdData = {}
            if (data.name !== "") {
                newdData.name = data.name
            }
            if (data.description !== "") {
                newdData.description = data.description
            }
            if (data.deadline !== "") {
                newdData.deadline = data.deadline
            }
            result = await task.update(data.id, newdData)
        }
    } catch (e) {
        error = e.message
    }
    res.json({ success: result, error: error })
}

exports.moveTasks = async function(req, res) {
    /*  
    #swagger.tags = ['Task']
    #swagger.summary = 'To move multiple tasks'
    #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/TasksMoveRequest' }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TasksMoveResponse' }
    }
    */
    var result = false
    var _ids = []
    var error = ""
    try {
        let data = req.body
        if (data.ids.length === 0) {
            error = "Ids cannot be empty!"
        } else if (data.listId === "") {
            error = "List id cannot be empty!"
        } else {
            var task = new Task(req.db)
            result = await task.moveMany(data.ids, data.listId)
            _ids = data.ids
        }
    } catch (e) {
        error = e.message
    }
    res.json({ ids: _ids, success: result, error: error })
}

exports.completeTask = async function(req, res) {
    /*  
    #swagger.tags = ['Task']
    #swagger.summary = 'To complete a task'
    #swagger.parameters['id'] = {
            type: 'string'
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TaskCompleteResponse' }
    }
    */
    var result = false
    var _id = ""
    var error = ""
    try {
        let data = req.body
        if (data.id === "") {
            error = "Id cannot be empty!"
        } else {
            var task = new Task(req.db)
            result = await task.update(data.id, {completed: true})
            _id = data.id
        }
    } catch (e) {
        error = e.message
    }
    res.json({ id: _id, success: result, error: error })
}

exports.deleteTask = async function(req, res) {
    /*  
    #swagger.tags = ['Task']
    #swagger.summary = 'To delete a task'
    #swagger.parameters['id'] = {
            type: 'string'
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TaskDeleteResponse' }
    }
    */
    var result = false
    var _id = ""
    var error = ""
    try {
        let data = req.body
        if (data.id === "") {
            error = "Id cannot be empty!"
        } else {
            var task = new Task(req.db)
            result = await task.remove(data.id)
            _id = data.id
        }
    } catch (e) {
        error = e.message
    }
    res.json({ id: _id, success: result, error: error })
}

exports.deleteTasks = async function(req, res) {
    /*  
    #swagger.tags = ['Task']
    #swagger.summary = 'To delete multiple tasks'
    #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/TasksDeleteRequest' }
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TasksDeleteResponse' }
    }
    */
    var result = false
    var _ids = []
    var error = ""
    try {
        let data = req.body
        if (data.ids.length === 0) {
            error = "Ids cannot be empty!"
        } else {
            var task = new Task(req.db)
            result = await task.removeMany(data.ids)
            _ids = data.ids
        }
    } catch (e) {
        error = e.message
    }
    res.json({ ids: _ids, success: result, error: error })
}

exports.getTasks = async function(req, res) {
    /*  
    #swagger.tags = ['Task']
    #swagger.summary = 'To get all tasks by list id'
    #swagger.parameters['skip'] = {
            type: 'int'
    }
    #swagger.parameters['listId'] = {
            type: 'string'
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TasksGetResponse' }
    }
    */
    var results = []
    var result = true
    var error = ""
    try {
        let data = req.query
        const skip = parseInt(data.skip == null || data.skip == '' ? 0:data.skip)
        if (data.listId === "") {
            error = "Id cannot be empty!"
        } else {
            var task = new Task(req.db)
            results = await task.get(data.listId, skip, 5)
        }
    } catch (e) {
        error = e.message
        result = false
    }
    res.json({ tasks: results, success: result, error: error })
}

exports.getTask = async function(req, res) {
    /*  
    #swagger.tags = ['Task']
    #swagger.summary = 'To get a task by id'
    #swagger.parameters['id'] = {
        type: 'string',
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/TaskGetResponse' }
    }
    */
    var item = null
    var result = true
    var error = ""
    try {
        let data = req.query
        var task = new Task(req.db)
        var taskItem = await task.getOne(data.id)
        if (taskItem != null) {
            item = taskItem
        }
    } catch (e) {
        error = e.message
        result = false
    }
    res.json({ task: item, success: result, error: error })
}