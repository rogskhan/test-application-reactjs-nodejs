let chai = require('chai')
let chaiHttp = require('chai-http')

let app = require('../app')
let List = require('../data/models/list.js')
const list = require('../routes/list')

let should = chai.should()
chai.use(chaiHttp);

describe('Lists', () => {
    describe('/Create list', () => {
        it('it should create a new list', (done) => {
            let list = {
                name: "test 1"
            }
            chai.request(app)
            .post('/api/v1/lists/create')
            .send(list)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('id')
                res.body.should.have.property('success')
                res.body.should.have.property('error')
                res.body.should.have.property('success').eql(true)
                done()
            })
        })
        it('it should not create a new list and return error', (done) => {
            let list = {
                name: ""
            }
            chai.request(app)
            .post('/api/v1/lists/create')
            .send(list)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('id')
                res.body.should.have.property('success')
                res.body.should.have.property('error')
                res.body.should.have.property('success').eql(false)
                done()
            })
        })
    })
    describe('/Get lists', () => {
        it('it should GET lists', (done) => {
            let list = {
                skip: 0
            }
            chai.request(app)
            .get('/api/v1/lists/get')
            .send(list)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('lists')
                res.body.should.have.property('success')
                res.body.should.have.property('error')
                res.body.should.have.property('lists').be.a('array')
                res.body.should.have.property('lists').to.have.lengthOf.above(0)
                done()
            })
        })
    })
})

describe('Tasks', () => {
    it('it should GET lists', (done) => {
        let list = {
            skip: 0
        }
        chai.request(app)
        .get('/api/v1/lists/get')
        .send(list)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('lists')
            res.body.should.have.property('success')
            res.body.should.have.property('error')
            res.body.should.have.property('lists').be.a('array')
            res.body.should.have.property('lists').to.have.lengthOf.above(0)
            
            var listId = res.body.lists[0]._id
            describe('Create task', () => {
                it('it should create a new task', (done) => {
                    let task = {
                        listId: listId,
                        name: "task 1",
                        description: "task desc 1",
                        deadline: new Date()
                    }
                    chai.request(app)
                    .post('/api/v1/tasks/create')
                    .send(task)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('id')
                        res.body.should.have.property('success')
                        res.body.should.have.property('error')
                        res.body.should.have.property('success').eql(true)
                        done()
                    })
                })
            })
            done()
        })
    })

})