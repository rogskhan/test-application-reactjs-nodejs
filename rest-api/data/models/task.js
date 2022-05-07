const { ObjectId } = require("mongodb")
const BaseModel = require('./baseModel.js')
const List = require('./list.js')

module.exports = class Task extends BaseModel {

    constructor(db) {
        super(db, "tasks")
        
        this.data.listId = null
        this.data.name = ""
        this.data.description = ""
        this.data.deadline = null
        this.data.completed = false
        this.data.emailSent = false
    }

    async create() {
        try {
            let list = new List(this.db)
            let validated = await list.validate(this.data.listId)
            if (validated) {
                this.data.listId = ObjectId(this.data.listId)
                return await super.insertOne()
            }
        } catch (error) {
            console.error(error)
        }

        return false
    }

    async update(id, newData) {
        try {
            return await super.updateOne({_id: ObjectId(id)}, newData)
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async moveMany(ids, listId) {
        try {
            let list = new List(this.db)
            let validated = await list.validate(listId)
            if (validated) {
                var oIds = []
                for(var i = 0; i < ids.length; i++) {
                    oIds.push(ObjectId(ids[i]))
                }
                return await super.updateMany({_id:{$in:oIds}},{listId: ObjectId(listId)})
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async remove(id) {
        try {
            return await super.deleteOne({_id: ObjectId(id)})
        } catch (error) {
            console.error(error)
            return false
        }
    }
    
    async removeByList(listId) {
        try {
            let list = new List(this.db)
            let validated = await list.validate(listId)
            if (validated) {
                return await super.deleteMany({listId: ObjectId(listId)})
            }
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async removeMany(ids) {
        try {
            var oIds = []
            for(var i = 0; i < ids.length; i++) {
                oIds.push(ObjectId(ids[i]))
            }
            return await super.deleteMany({_id:{$in:oIds}})
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async get(listId, skip, limit) {
        try {
            const result = await super.aggregate([
                    {
                        $match: { listId: ObjectId(listId) }
                    },
                    {
                        $sort: { createdAt: -1 }
                    },
                    {
                        $project : {
                            _id: 1, 
                            name: 1, 
                            description: 1,
                            deadline: 1, 
                            completed: 1,
                            createdAt: 1,
                            updatedAt: 1
                        }
                    },
                    {
                        $limit: skip + limit
                    },
                    {
                        $skip: skip 
                    }
                ])
            return await result.toArray() 
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async getOne(id) {
        try {
            return await super.findOne({_id: ObjectId(id)})
        } catch (error) {
            console.error(error)
            return null
        }
    }
}