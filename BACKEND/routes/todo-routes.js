const express = require ('express')

const router = express.Router()

const todoControllers  = require('../controllers/todo-controllers')

router.get('/' , todoControllers.getTodos)
router.post('/', todoControllers.createTodo)
module.exports = router