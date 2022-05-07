const middleware = require('./middleware.js') 
const listRouter = require('./list.js') 
const taskRouter = require('./task.js') 

module.exports = function routes(app, express, db) {
    
    //Setup the middleware to handle authentication and other access level validations.
    middleware(app, express, db)

    //Routes
    app.use('/api/v1/lists', listRouter(express))
    app.use('/api/v1/tasks', taskRouter(express))
}