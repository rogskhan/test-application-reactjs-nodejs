const { createList, deleteList, getLists, findList } = require('../controllers/listController')

module.exports = function listRouter(express) {
  const router = express.Router()

  //POST
  router.post('/create', createList)
  router.post('/delete', deleteList)

  //GET
  router.get('/get', getLists)
  router.get('/find', findList)
  
  return router
}