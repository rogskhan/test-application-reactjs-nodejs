require('dotenv').config()
const express = require('express')
const app = express()

const database = require('./data/database.js')

//Connect mongodb and set db client object
const db = database()
db.connect()

//Set api routes
const routes = require('./routes/index.js')
routes(app, express, db)

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`App listening at http://${process.env.HOST}:${process.env.PORT}`)
})

module.exports = app; // for testing