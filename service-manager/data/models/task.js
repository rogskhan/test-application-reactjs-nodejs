const { ObjectId } = require("mongodb")
const BaseModel = require('./baseModel.js')

///TODO: Should move this class into separate package so both rest-api and service-manager can share it.
module.exports = class Task extends BaseModel {

    constructor(db) {
        super(db, "tasks")
    }

    async update(id, newData) {
        try {
            return await super.updateOne({_id: ObjectId(id)}, newData)
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async getExpiredTasks() {
        try {
            const result = await super.aggregate([
                {
                    $match: {
                        deadline: { 
                            $lt: new Date() 
                        },
                        emailSent: false
                    }
                },
                {
                    $project : {
                        _id: 1
                    }
                }
            ])
            return await result.toArray() 
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async getCompletedTasks() {
        try {
            const result = await super.aggregate([
                {
                    $match: {
                        completed: true,
                        emailSent: false
                    }
                },
                {
                    $project : {
                        _id: 1
                    }
                }
            ])
            return await result.toArray() 
        } catch (error) {
            console.error(error)
            return []
        }
    }
}