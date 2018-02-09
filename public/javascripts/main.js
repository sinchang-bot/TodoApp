$(function () {
  var list = document.getElementById('list')
  var submitBtn = document.getElementById('submitBtn')

  // 获取 todo 列表
  getTodos()

  // 添加 todo
  submitBtn.addEventListener('click', function () {
    var title = document.getElementById('title').value

    if (!title) return

    addTodo(title)

  }, false)

  document.addEventListener('click', function(e) {
    var id = e.target.dataset.id
    var classList = e.target.classList

    if (classList.contains('delete-btn')) {
      deleteTodo(id)
      return
    }

    if (classList.contains('edit-btn')) {
      var title = prompt("What's your new Title?")
      if (!title) return

      updateTodo({
        title
      }, id)

      return
    }

    if (classList.contains('done-btn')) {
      var isDone = e.target.dataset.status === '0' ? 1 : 0

      updateTodo({
        isDone
      }, id)
    }

  }, false)

})

function getTodos() {
  $.ajax({
    url: '/todo',
    method: 'GET',
    success: function (data) {
      var tpl = ''
      data.todo.forEach(item => {
        const status = item.isDone ? '完成' : '未完成'
        tpl += `<li>${item.title} (${status}) <button class="edit-btn" data-id=${item.id}>Edit</button><button class="delete-btn" data-id=${item.id}>Delete</button><button class="done-btn" data-status="${item.isDone}" data-id=${item.id}>${ item.isDone ? 'UnDone' : 'Done'}</button></li>`
      })

      list.innerHTML = tpl
    }
  })
}

function addTodo(title) {
  $.ajax({
    url: 'todo',
    method: 'POST',
    data: {
      title
    },
    success: function (data) {
      alert('Added')
      getTodos()
    }
  })
}


function deleteTodo(id) {
  $.ajax({
    url: 'todo/' + id,
    method: 'DELETE',
    data: {
      id
    },
    success: function (data) {
      alert('Done')
      getTodos()
    }
  })
}

function updateTodo(body, id) {
  $.ajax({
    url: 'todo/' + id,
    method: 'PUT',
    data: body,
    success: function (data) {
      alert('Done')
      getTodos()
    }
  })
}
