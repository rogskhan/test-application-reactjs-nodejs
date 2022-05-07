const { ObjectId } = require('mongodb')
const BaseModel = require('./baseModel.js')

module.exports = class List extends BaseModel {

    constructor(db) {
        super(db, "lists")
        
        this.data.name = ""
    }

    async create() {
        try {
            return await super.insertOne()
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
    
    async get(skip, limit) {
        try {
            const result = await super.aggregate([
                    {
                        $sort: { createdAt: -1 }
                    },
                    {
                        $project : {
                            _id: 1, 
                            name: 1, 
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

    async search(q) {
        try {
            const result = await super.aggregate([
                {
                    $match: {
                        "name": {'$regex' : q, '$options' : 'i'}
                    }
                },
                {
                    $sort: { name: 1 }
                },
                {
                    $project : {
                        _id: 1, 
                        name: 1
                    }
                },
                {
                    $limit: 15
                },
                {
                    $skip: 0 
                }
            ])
            return await result.toArray() 
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async validate(id) {
        try {
            let list = await super.findOne({ _id: ObjectId(id) })
            return list
        } catch (error) {
            console.error(error)
            return false
        }
    }
}