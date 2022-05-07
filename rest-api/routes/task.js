const { createTask, updateTask, moveTasks, completeTask, deleteTask, deleteTasks, getTasks, getTask } = require('../controllers/taskController')

module.exports = function taskRouter(express) {
  const router = express.Router()

  //POST
  router.post('/create', createTask)
  router.post('/update', updateTask)
  router.post('/move/many', moveTasks)
  router.post('/complete', completeTask)
  router.post('/delete', deleteTask)
  router.post('/delete/many', deleteTasks)

  //GET
  router.get('/get', getTasks)
  router.get('/item', getTask)

  return router
}