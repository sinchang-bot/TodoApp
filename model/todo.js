const {
  sequelize,
  Sequelize
} = require('../db')

const Todo = sequelize.define('todo', {
  title: {
    type: Sequelize.STRING
  },
  isDone: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

exports.createTodo = title => {
  return Todo.sync().then(() => {
    return Todo.create({
      title
    })
  })
}

exports.getAllTodo = title => {
  return Todo.findAll()
}

exports.deleteTodo = id => {
  return Todo.destroy({
    where: {
      id
    }
  })
}

exports.updateTodo = (body, id) => {
  return Todo.update(body, {
    where: {
      id
    }
  })
}

exports.findOneTodo = (id) => {
  return Todo.findById(id)
}
