require('dotenv').config()
const express = require('express')
const app = express()

const schedule = require('node-schedule')

const database = require('./data/database.js')
const Task = require('./data/models/task.js')

//Connect mongodb and set db client object
const db = database()
db.connect()

//Runs every 5 mins
const completedTasksJob = schedule.scheduleJob('*/5 * * * *', async function() {
    console.log('Running completed tasks email job.');
    let dbClient = db.get()
    let task = new Task(dbClient)
    let tasks = await task.getCompletedTasks()
    console.log(tasks)
    tasks.forEach(item => {
        console.log("Send completed email >>>>>> sending... >> " + item._id)
        task.update(item._id, { emailSent: true })
    })
})

//Runs every 5 mins
const expiredTasksJob = schedule.scheduleJob('*/5 * * * *', async function() {
    console.log('Running expired tasks email job.');
    let dbClient = db.get()
    let task = new Task(dbClient)
    let tasks = await task.getExpiredTasks()
    console.log(tasks)
    tasks.forEach(item => {
        console.log("Send expired email >>>>>> sending... >> " + item._id)
        task.update(item._id, { emailSent: true })
    })
})

app.listen(8899, () => {
    console.log(`Service manager app is running.`)
})