const List = require('../data/models/list.js')
const Task = require('../data/models/task.js')

exports.createList = async function(req, res) {
    /*  
    #swagger.tags = ['List']
    #swagger.summary = 'To create a list'
    #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/ListCreateRequest' }
    }
    #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ListCreateResponse' }
    }
    */
    var result = false
    var _id = ""
    var error = ""
    try {
        let data = req.body
        if (data.name === "") {
            error = "Name cannot be empty!"
        } else {
            var list = new List(req.db)
            list.data.name = data.name
            result = await list.create()
            _id = list._id
        }
    } catch (e) {
        error = e.message
    }
    res.json({ id: _id, success: result, error: error })
}

exports.deleteList = async function(req, res) {
    /*  
    #swagger.tags = ['List']
    #swagger.summary = 'To delete a list'
    #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/ListDeleteRequest' }
    }
    #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ListDeleteResponse' }
    }
    */
    var result = false
    var _id = ""
    var error = ""
    try {
        let data = req.body
        if (data.id === "") {
            error = "List id cannot be empty!"
        } else {
            var task = new Task(req.db)
            var deletedTasks = await task.removeByList(data.id)
            if (deletedTasks) {
                var list = new List(req.db)
                result = await list.remove(data.id)
                _id = data.id
            } else {
                error = "Failed to delete all tasks related to the list!"
            }
        }
    } catch (e) {
        error = e.message
    }
    res.json({ id: _id, success: result, error: error })
}

exports.getLists = async function(req, res) {
    /*  
    #swagger.tags = ['List']
    #swagger.summary = 'To get all lists'
    #swagger.parameters['skip'] = {
        type: 'int',
    }
    #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ListGetResponse' }
    }
    */
    var results = []
    var result = true
    var error = ""
    try {
        let data = req.query
        const skip = parseInt(data.skip == null || data.skip == '' ? 0:data.skip)
        var list = new List(req.db)
        results = await list.get(skip, 5)
    } catch (e) {
        error = e.message
        result = false
    }
    res.json({ lists: results, success: result, error: error })
}

exports.findList = async function(req, res) {
    /*  
    #swagger.tags = ['List']
    #swagger.summary = 'To search lists by name'
    #swagger.parameters['q'] = {
        type: 'string',
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/ListFindResponse' }
    }
    */
    var results = []
    var result = true
    var error = ""
    try {
        let data = req.query
        const q = data.q == null ? '':data.q
        var list = new List(req.db)
        results = await list.search(q)
    } catch (e) {
        error = e.message
        result = false
    }
    res.json({ lists: results, success: result, error: error })
}