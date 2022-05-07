module.exports = class BaseModel {

    constructor(db, collection) {
        this.db = db
        this.collection = collection

        //Collection attributes
        this.data = {
            _id: null,
            createdAt: null,
            updatedAt: null
        }
    }
    
    async insertOne() {
        //We set the create at timestamp on the base model 
        //so we don't have to reimplement this on every db model
        this.data.createdAt = new Date(Date.now())
        this.data.updatedAt = new Date(Date.now())
        try {
            let result = await this.db.collection(this.collection).insertOne(this.data)
            this._id = result.insertedId
            return (result.acknowledged && result.insertedId != null && result.insertedId != '')
        } catch (error) {
            console.error(error)
            return false
        }
    }
    
    async updateOne(where, set) {
        set.updatedAt = new Date(Date.now())
        try {
            let result =  await this.db.collection(this.collection).updateOne(where, {$set: set})
            return (result.acknowledged && result.modifiedCount == 1)
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async updateMany(where, set) {
        set.updatedAt = new Date(Date.now())
        try {
            let result =  await this.db.collection(this.collection).updateMany(where, {$set: set})
            return (result.acknowledged && result.modifiedCount > 0)
        } catch (error) {
            console.error(error)
            return false
        }
    }
 
    async findOne(where) {
        try {
            let result = await this.db.collection(this.collection).findOne(where)
            return result
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async findMany(where) {
        try {
            let result = await this.db.collection(this.collection).find(where)
            return await result.toArray()
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async deleteOne(where) {
        try {
            let result = await this.db.collection(this.collection).deleteOne(where)
            return (result.acknowledged && result.deletedCount == 1)
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async deleteMany(where) {
        try {
            let result = await this.db.collection(this.collection).deleteMany(where)
            return (result.acknowledged && result.deletedCount >= 0)
        } catch (error) {
            console.error(error)
            return false
        }
    }
    
    async aggregate(options) {
        try {
            return await this.db.collection(this.collection).aggregate(options)
        } catch (error) {
            return error
        }
    }
}