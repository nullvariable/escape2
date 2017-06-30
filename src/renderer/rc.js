
import path from 'path'
const inherits = require('util').inherits
const EventEmitter = require('events').EventEmitter
const WebSocket = require('ws')

export default RC

function RC () {
  if (!(this instanceof RC)) return new RC()
  this._started = false
  this._wss = null

  EventEmitter.call(this)
}

inherits(RC, EventEmitter)

RC.prototype.start = function () {
  if (this.started) return

  let self = this
  self._started = true
  self.emit('started')
  const port = 2768

  const express = require('express')
  const app = express()
  // const remoteHtml = path.join(remote.app.getPath(__static, '/remote.html'))
  // let fileContents = fs.readFileSync()

  app.get('/', (request, response) => {
    response.sendFile(path.join(__static, '/remote.html'))
  })

  app.get('/startCD', (request, response) => {
    self.emit('startCD')
    response.json({
      message: 'Countdown started',
      class: 'alert-info'
    })
  })

  app.get('/stopCD', (request, response) => {
    self.emit('stopCD')
    response.json({
      message: 'Countdown stopped',
      class: 'alert-warning'
    })
  })

  app.get('/resetApp', (request, response) => {
    self.emit('resetApp')
    response.json({
      message: 'App reset',
      class: 'alert-success'
    })
  })

  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
  })

  let wss = new WebSocket.Server({ port: 9000 })

  this._wss = wss

  wss.on('connection', function (ws) {
    console.log('connected')
  })
}

RC.prototype.socketMessage = function (message) {
  let wss = this._wss
  wss.clients.forEach(function each (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}
