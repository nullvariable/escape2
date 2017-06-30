const inherits = require('util').inherits
const EventEmitter = require('events').EventEmitter
const _ = require('lodash')

export default CountDown

function CountDown () {
  if (!(this instanceof CountDown)) return new CountDown()
  this._started = false
  this._end = 0
  this._timer = false

  EventEmitter.call(this)
}

inherits(CountDown, EventEmitter)

CountDown.prototype.start = function () {
  let self = this
  self.emit('started')
  if (self._end < 1000) self._end = (20 * 60 * 1000)
  self._started = true
  self._timer = setInterval(self.nextTick, 1000, self)
}
CountDown.prototype.stop = function () {
  let self = this
  if (self._timer !== false && !_.isNull(self._timer)) {
    clearInterval(self._timer)
    self._timer = false
    self.emit('stopped')
  }
}
CountDown.prototype.nextTick = function (self) {
  let timeleft = self._end -= 1000 // subtract 1 second from the end time
  self.emit('downtick', timeleft)
  if (timeleft < 1000) {
    self.emit('end')
    clearInterval(self._timer)
  }
}
CountDown.prototype.reset = function () {
  let self = this
  self.stop()
  self.emit('reset')
  clearInterval(self._timer)
  self._timer = null
  self._end = null
}
