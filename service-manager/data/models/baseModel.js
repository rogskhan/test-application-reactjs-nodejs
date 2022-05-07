///TODO: Should move this class into separate package so both rest-api and service-manager can share it.
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

    async aggregate(options) {
        try {
            return await this.db.collection(this.collection).aggregate(options)
        } catch (error) {
            return error
        }
    }
}