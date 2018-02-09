const {
  createTodo,
  getAllTodo,
  deleteTodo,
  findOneTodo,
  updateTodo
} = require('../model/todo')

/**
 * @api {post} /todo/ Create A New Todo
 * @apiName CreateNewTodor
 * @apiGroup Todo
 *
 * * @apiParam {String} title  Todo Title.
 *
 * @apiSuccess {String} message Status Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "success"
 *     }
 */

exports.handleCreate = (req, res) => {
  const title = req.body.title

  if (!title) return res.status(400).json({ message: 'Title is required' })

  createTodo(title)
    .then(() => res.json({ message: 'success' }))
    .catch(err => res.status(500).json({ message: err.message }))
}

/**
 * @api {get} /todo/ Request All Todos
 * @apiName GetAllTodos
 * @apiGroup Todo
 *
 * @apiSuccess {String} message Status Message.
 * @apiSuccess {Array} todo  All Todos.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "success",
 *       "todo": [{"id":5,"title":"买菜去","isDone":true,"createdAt":"2018-02-09T07:10:11.000Z","updatedAt":"2018-02-09T07:31:41.000Z"}]
 *     }
 */

exports.handleGetAll = (req, res) => {
  getAllTodo()
    .then(data => res.json({ message: 'success', todo: data }))
    .catch(err => res.status(500).json({ message: err.message }))
}

/**
 * @api {delete} /todo/:id Delete A Todo
 * @apiName deleteTodo
 * @apiGroup Todo
 *
 * @apiParam {Number} id Todo Unique ID.
 *
 * @apiSuccess {String} message Status Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "success"
 *     }
 */
exports.handleDelete = (req, res) => {
  const id = req.params.id
  deleteTodo(id)
    .then(() => res.json({ message: 'success' }))
    .catch(err => res.status(500).json({ message: err.message }))
}

/**
 * @api {get} /todo/:id Find A Todo By Id
 * @apiName FindById
 * @apiGroup Todo
 *
 * @apiParam {Number} id Todo unique ID.
 *
 * @apiSuccess {String} message Status Message.
 * @apiSuccess {Object} todo Todo Data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "success",
 *       "todo": {"id":5,"title":"买菜去","isDone":true,"createdAt":"2018-02-09T07:10:11.000Z","updatedAt":"2018-02-09T07:31:41.000Z"}
 *     }
 */
exports.handleFindById = (req, res) => {
  const id = req.params.id
  findOneTodo(id)
    .then((data) => res.json({ message: 'success', todo: data }))
    .catch(err => res.status(500).json({ message: err.message }))
}

/**
 * @api {put} /todo/:id Edit Todo
 * @apiName EditTodo
 * @apiGroup Todo
 *
 * @apiParam {Number} id Todo Unique ID.
 * @apiParam {String} title Todo Title.
 * @apiParam {Number} isDone Todo Status 0(undone) or 1(done).
 *
 * @apiSuccess {String} message Status Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "success"
 *     }
 */
exports.handleEdit = (req, res) => {
  const id = req.params.id
  const body = req.body

  updateTodo(body, id)
    .then((data) => res.json({ message: 'success' }))
    .catch(err => res.status(500).json({ message: err.message }))
}
