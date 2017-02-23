// audio.js
let app = getApp()
let time = require("../../utils/util.js")
Page({
  data: {
      input:'',
      todos:[],
      logs:[],
  },
  save: function(e) {
    let todos = this.data.todos
    let logs = this.data.logs
    wx.setStorageSync('todoList',todos)
    wx.setStorageSync('logList',logs)
  },
  load: function() {
    let todos = wx.getStorageSync('todoList')
    let logs = wx.getStorageSync('logList')
    if(todos) {
        this.setData({
            input:'',
            todos:todos,
        })
    }
    if(logs) {
        this.setData({
            logs: logs
        })
    }
},
  onLoad: function() {
     this.load()
 },
  inputHandle: function(e){
      this.setData({
          input:e.detail.value
      })
  },
  addTodo:function(e){
      let todos = this.data.todos
      let logs = this.data.logs
      todos.push(
          {
            content:this.data.input,
            // content:e.detail.value,
            status:false
          }
      )
      logs.push(
          {
              time:time.getLocalTime(),
              content:this.data.input,
              action:"新增"
          }
      )
      this.setData({
          input: '',
          todos: todos,
          logs: logs
      })
      this.save()
  },
  removeSingle : function(e) {
      let index = e.currentTarget.dataset.index
      let todos = this.data.todos
      let logs = this.data.logs
      let remain = todos.splice(index,1)[0]
      logs.push(
          {
              time:time.getLocalTime(),
              content:remain.content,
              action:"删除单项"
          }
      )
      this.setData({
          input:'',
          todos:todos,
          logs:logs
      })
      this.save()
  },
  toggleTodo : function(e) {
      console.log('触发toggle')
      let index = e.currentTarget.dataset.index
      let todos = this.data.todos
      todos[index].status = !todos[index].status
      let logs = this.data.logs
      logs.push(
          {
              time:time.getLocalTime(),
              content:todos[index].content,
              action:"更改任务状态"
          }
      )
      this.setData({
          input: '',
          todos: todos,
          log: logs
      })
      this.save()

  },
  alldone : function() {
      let todos = this.data.todos
      let logs = this.data.logs
      for (let i = 0; i < todos.length; i++) {
          todos[i].status = true
      }
      logs.push({
              time:time.getLocalTime(),
              content:'所有任务',
              action:"选择全部完成"
          })
      this.setData({
          input: '',
          todos: todos,
          logs: logs
      })
      this.save()
  },
  deleteDone : function() {
      let remain = []
      let logs = this.data.logs
      let todos = this.data.todos
      for(let i = 0; i < todos.length; i++) {
          if (!todos[i].status) {
              remain.push(todos[i])
          }
      }
      logs.push(
          {
              time:time.getLocalTime(),
              content:'选择所有已完成的',
              action:"删除已完成的"
          }
      )
      this.setData({
          input: '',
          todos: remain,
          logs: logs
      })
      this.save()
  },
  deleteAll : function() {
      let todos = this.data.todos
      let logs =  this.data.logs
      todos = []
      logs.push(
          {
              time:time.getLocalTime(),
              content:'选择所有任务',
              action:"删除全部"
          }
      )
      this.setData({
          input:'',
          todos:todos,
          logs: logs
      })
      this.save()
  }
})
