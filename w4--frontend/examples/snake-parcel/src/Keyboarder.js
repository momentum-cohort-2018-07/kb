// ## Keyboarder class
//
// This utility class gets cut and pasted into almost every game I write.
// It tracks what keys are currently pressed using event handlers to track
// keydown and keyup events.
class Keyboarder {
  constructor () {
    this.keyState = {}

    window.addEventListener('keydown', function (e) {
      this.keyState[e.keyCode] = true
    }.bind(this))

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false
    }.bind(this))
  }

  isDown (keyCode) {
    return this.keyState[keyCode] === true
  }

  // For our snake game, we don't actually care which keys are pressed
  // at any moment. Instead, we want to respond at the moment a key is pressed.
  // Our `.on` method wraps `window.addEventListener` to check the keycode
  // before triggering the callback.
  on (keyCode, callback) {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === keyCode) {
        callback()
      }
    })
  }
}

// Each key has a key code associated with it. Since we don't want to
// remember them, we set up an object with names for common key codes.
Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 }

export default Keyboarder
