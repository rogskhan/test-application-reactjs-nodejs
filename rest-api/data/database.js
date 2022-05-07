const { MongoClient } = require('mongodb')

module.exports = function database() {

    var dbClient

    const connect = () =>  {
        var _this = this
        MongoClient.connect(process.env.DATABASE_URL + process.env.DATABASE_NAME, function(err, db) {
            if (err) throw err
            console.log("Database connected!")

            _this.dbClient = db.db(process.env.DATABASE_NAME);
            
            _this.dbClient.createCollection("lists", function(err, res) {
                console.log("Collection `lists` created!");
            })
            
            _this.dbClient.createCollection("tasks", function(err, res) {
                console.log("Collection `tasks` created!");
            })
        })
    }
    
    const get = () =>  {
        return this.dbClient
    }

    return {
        connect, get
    }
}