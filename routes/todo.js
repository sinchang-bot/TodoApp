const express = require('express')
const router = express.Router()

const {
  handleCreate,
  handleGetAll,
  handleDelete,
  handleEdit,
  handleFindById
} = require('../controller/todo.js')

/* GET users listing. */
router.get('/', handleGetAll)

router.post('/', handleCreate)

router.delete('/:id', handleDelete)

router.put('/:id', handleEdit)

router.get('/:id', handleFindById)

module.exports = router
