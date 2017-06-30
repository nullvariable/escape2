// let Raspi = require('./mocks/raspi-io')
// let five = require('./mocks/johnny-five')
// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'production') {
const Raspi = require('raspi-io');
const five = require('johnny-five')
// }


export default Hardware

function Hardware () {
  if (!(this instanceof Hardware)) return new Hardware()

  let self = this
  this._digits = false

  let board = function () {
    return {
      on: function () {}
    }
  }

  if (process.env.NODE_ENV === 'production') {
    board = new five.Board({
      io: new Raspi(),
      repl: false
    })
  }

  console.log(board)
  if (process.env.NODE_ENV !== 'development' && typeof board === 'Board') {
    board.on('ready', function () {
      console.log('board ready')
      this.digits = new five.Led.Digits({
        controller: 'HT16K33',
        pins: {
          data: 'P1-3',
          clock: 'P1-5'
        }
      })
      this.digits.print('0.0.:0.0.')
      self._digits = this.digits
    })
  }

}

Hardware.prototype.update = function (timeleft) {
  let seconds = Math.round(timeleft / 1000)
  let minutes = (seconds > 60) ? Math.round(seconds / 60) : 0
  let remainingSeconds = (seconds > 0) ? 60 - ((minutes * 60) - seconds) : 0
  let left = prefix((seconds > 60) ? minutes - 1 : minutes)
  let right = prefix(remainingSeconds)
  if (this._digits) {
    this._digits.print(left + ':' + right)
  } else {
    console.log(left + ':' + right)
  }

  function prefix (value) {
    if (value.toFixed().length === 1) return '0' + value.toFixed()
    return value
  }
}
