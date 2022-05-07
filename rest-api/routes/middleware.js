const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../data/swagger-output.json')

module.exports = function middleware(app, express, db) {
    //This is to ensure incoming request body contains a json object, 
    //so the request handling function do need to handle the parsing.
    app.use(express.json())

    //We need to allow which application domain can access the api services.
    //it's best to handle this via database if the api service is used by multiple 3rd party services, 
    //for now it will access the value from .env file.
    app.use(cors({
        origin: process.env.SERVICE_USER_HOST
    }))
    
    //We set the database connection into the request object, 
    //this will allow other functions to access the database object via req.db without any hassle.
    app.use((req, res, next) => {
        req.db = db.get()
        next()
    })
    
    //Developer documentation with swagger, custom css to hide default tag from api doc
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {customCss: '#operations-tag-default { display: none }'}))
}