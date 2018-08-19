// ## Constants
//
// These variables are used throughout the game as settings. Keeping them
// all in one place makes it easy to tweak the game.

// Snake is a game with _discrete movement_; that is, instead of moving pixel
// by pixel across the screen, the snake moves one square at a time on a grid.
// GRID_SIZE determines the size of each of those squares. This value should
// divide into the overall width and height of the canvas with no remainder.
const GRID_SIZE = 20

// The speed of the snake. Increasing this slows the snake. Ticks happen
// approximately 60x/sec, so with TICKS_PER_MOVE of 10, the snake moves
// 6x/sec.
const TICKS_PER_MOVE = 10

// How many pellets should be on the screen at any one time.
const PELLET_COUNT = 2

// Object with all the colors used in the game.
const COLORS = {
  snakeHead: '#9BC53D',
  snakeBody: '#FDE74C',
  wall: '#404E4D',
  background: '#FFFFFF',
  grid: '#5BC0EB',
  pellet: '#C3423F'
}

// Display the underlying grid.
const SHOW_GRID = false

// ## Functions

// Collision detection in Snake is a lot easier than in games with continuous
// movement. We just care if two things are in the same square. This function
// takes any two objects that have `x` and `y` properties and checks to see
// if their `x`s and `y`s are the same.
function isSamePos (pos, otherPos) {
  return pos.x === otherPos.x && pos.y === otherPos.y
}

// The snake segments and the pellets are both in arrays, so we created this
// helper function to find out if a position is found within an array, allowing
// us to check for the snake eating pellets or running into itself using
// the same function.
function doesIntersectWithArray (pos, posArray) {
  // A shorter way to write this:
  //
  // `return posArray.some((otherPos) => isSamePos(pos, otherPos))`

  for (let otherPos of posArray) {
    if (isSamePos(pos, otherPos)) {
      return true
    }
  }
  return false
}

// ## Game class
//
// This class orchestrates the entire game. It is responsible for keeping game
// state, running the game loop, and drawing the canvas.

class Game {
  // The constructor creates an object. It sets up all the properties we will
  // use to run the game.
  constructor (canvasId) {
    // The `canvas` element is used for bitmap drawing. To get the object with
    // drawing commands -- which we will call `screen` -- we have to run
    // `.getContext('2d')` on the canvas.
    this.canvas = document.getElementById(canvasId)
    this.screen = this.canvas.getContext('2d')

    // The number of squares on our grid is determined by dividing the pixel width
    // and height by the size of the grid. Again, we assume the width and height of
    // the canvas is divisible by the grid size.
    this.size = { width: this.canvas.width, height: this.canvas.height }
    this.squares = { x: this.size.width / GRID_SIZE, y: this.size.height / GRID_SIZE }

    // `.ticks` will track every frame of the animation -- approximately 60/sec.
    this.ticks = 0

    // `.gameOver` is a boolean flag we'll use to indicate when the game should stop.
    this.gameOver = false

    // Our game object contains both the snake object and all the pellets that will
    // appear during the game. One common option here is to create an array of
    // "bodies," with each body being an object with a position and size. This can
    // be useful when all interacting bodies in the game can be represented the same
    // way. Given that our snake grows over time, we went a different route and
    // kept the snake and the pellets in separate properties.
    this.snake = new Snake(this, {
      x: Math.floor(this.squares.x / 2),
      y: Math.floor(this.squares.y / 2)}, 3)
    this.pellets = []

    // This `tick` function runs the game loop. On each run, it increments
    // `this.ticks`, calls `.update` and `.draw` and then, if the game is
    // still running, uses `window.requestAnimationFrame` with itself as an
    // argument to run `tick` again.
    //
    // Why did we define this as a function in the constructor instead of as
    // a method on the object? We could have done either. First, we were looking
    // at an example that did the same thing. Second, by writing it this way,
    // using an arrow function, we ensure `this` is bound correctly inside the
    // function, which is important with functions used for callbacks.
    //
    // We then assign this function to `this.tick` so we have it available
    // outside the constructor.
    let tick = () => {
      this.ticks++
      this.update()
      this.draw()
      if (!this.gameOver) {
        window.requestAnimationFrame(tick)
      }
    }

    this.tick = tick
  }

  // ### Main game methods

  // On each tick, our `update` method is called, updating the game state. In
  // our version of Snake, the updates are limited:
  //
  // * Make sure we have enough pellets on the board.
  // * Tell the snake object to update
  // * Check to see if we've triggered game over by running into a wall
  //   or into the snake's tail.
  update () {
    while (this.pellets.length < PELLET_COUNT) {
      this.placePellet()
    }

    this.snake.update(this.ticks)

    this.checkGameOver()
  }

  // After `update` is called on each tick, `draw` is called. `draw` will
  // clear the screen, draw the static elements of the game (the wall and
  // possibly a grid), and then call `draw` on all the game elements (the
  // snake and the pellets.)
  //
  // At first glance, this may seem strange -- why clear the screen every
  // tick? This is how we animate things, though. We start from scratch each
  // time to prevent visual artifacts from previous draws.
  draw () {
    this.screen.clearRect(0, 0, this.size.width, this.size.height)

    this.drawWall()
    if (SHOW_GRID) {
      this.drawGrid()
    }

    for (let pellet of this.pellets) {
      pellet.draw(this.screen)
    }
    this.snake.draw(this.screen)
    if (this.gameOver) {
      this.drawGameOver()
    }
  }

  // An alias for `.tick` so that our code is more readable.
  start () {
    this.tick()
  }

  // ### Helper methods
  //
  // The following methods are called from our `.update` and `.draw` methods.
  // Unlike `.update` and `.draw`, which should be found in every game, these
  // will differ between games.

  // If our snake hits a wall or its own tail, set the game to be over.
  checkGameOver () {
    if (this.snakeHitsWall() || doesIntersectWithArray(this.snake.head(), this.snake.tail())) {
      this.gameOver = true
    }
  }

  // Detecting collision with the wall looks to see if the snake head is
  // "out of bounds": that is, if it has an x or y position that is beyond
  // where it's supposed to be.
  snakeHitsWall () {
    let snakeHead = this.snake.head()
    return (
      snakeHead.x === 0 ||
      snakeHead.y === 0 ||
      snakeHead.x === this.squares.x - 1 ||
      snakeHead.y === this.squares.y - 1
    )
  }

  // The following functions all draw parts of the game using the
  // canvas and are not individually commented.

  drawWall () {
    this.screen.fillStyle = COLORS.wall
    this.screen.fillRect(0, 0, this.size.width, this.size.height)

    this.screen.fillStyle = COLORS.background
    this.screen.fillRect(
      GRID_SIZE,
      GRID_SIZE,
      (this.squares.x - 2) * GRID_SIZE,
      (this.squares.y - 2) * GRID_SIZE)
  }

  drawGrid () {
    this.screen.strokeStyle = COLORS.grid
    this.screen.lineWidth = 1

    // See https://dreisbach.us/notes/begin-path/ to understand why we need to
    // call `this.screen.beginPath()` here.
    this.screen.beginPath()
    for (var x = 0; x < this.size.width; x += GRID_SIZE) {
      this.screen.moveTo(x, 0)
      this.screen.lineTo(x, this.size.height)
    }

    for (var y = 0; y < this.size.height; y += GRID_SIZE) {
      this.screen.moveTo(0, y)
      this.screen.lineTo(this.size.width, y)
    }

    this.screen.stroke()
  }

  drawGameOver () {
    this.screen.textAlign = 'center'
    this.screen.font = '48px Helvetica'
    this.screen.fillStyle = COLORS.wall
    this.screen.fillText('game over', this.size.width / 2, this.size.height / 2)
  }

  // Put a new pellet on the grid. Ensure that the pellet is not on top of a
  // current pellet or on top of the snake.
  placePellet () {
    // `foundValidPos` is an example of a common practice, the _flag_. We use
    // this when we need to iterate an unknown number of times. In our case,
    // we need to come up with a random location and then check to make sure
    // it's in a valid position. We set `foundValidPos` to false and then
    // use a while loop to pick a position and check its validity. Once
    // valid, we set `foundValidPos` to true, causing the loop to end.
    //
    // There are other options here. You could loop forever using
    // `while (true)` and then use `break` to end the loop once you find
    // a valid position. I find this more readable, though. You could
    // also use a `do...while` loop, but those are not often seen in
    // the wild and can therefore be confusing.
    let foundValidPos = false
    let pos
    while (!foundValidPos) {
      pos = {
        x: Math.floor(Math.random() * (this.squares.x - 2)) + 1,
        y: Math.floor(Math.random() * (this.squares.y - 2)) + 1
      }

      foundValidPos = !(doesIntersectWithArray(pos, this.snake.segments) ||
                        doesIntersectWithArray(pos, this.pellets))
    }

    // Create a new pellet at the found position and push it onto our
    // array of pellets.
    this.pellets.push(new Pellet(pos))
  }

  // Given a position, filter out any pellets that exist at that position.
  removePellet (pos) {
    this.pellets = this.pellets.filter(function (pellet) {
      return !isSamePos(pos, pellet)
    })
  }
}

// ## Snake class

class Snake {
  // The constructor creates a Snake object. It sets up all the snake's properties.
  //
  // Passing our Game object (`game`) to the snake's constructor is unintuitive. The
  // game needs to know about the snake -- why would the snake need to know about the
  // game? We do this because we need *bi-directional* communication between the snake
  // and the game. The snake needs to know where the pellets are in order to find out
  // if it's eaten one.
  //
  // An alternative would be to put the code to determine if the snake has eaten a pellet
  // in the game.
  constructor (game, headPos, segmentCount) {
    this.game = game

    // Our snake is made of an array of positions representing each of its segments.
    // We build out the original snake with some assumptions -- the snake is pointing up
    // and we have enough room to build it without hitting a wall.
    this.segments = []
    for (let i = 0; i < segmentCount; i++) {
      this.segments.push({x: headPos.x, y: headPos.y + i})
    }

    // Track the direction the snake is moving and whether it is currently growing.
    this.direction = 'up'
    this.growing = false

    // Our keyboarder lets us respond to key events. Using events to make individual
    // moves is done because of our discrete movement. One keypress should equal one
    // turn.
    this.keyboarder = new Keyboarder()
    this.keyboarder.on(Keyboarder.KEYS.LEFT, () => this.turnLeft())
    this.keyboarder.on(Keyboarder.KEYS.RIGHT, () => this.turnRight())
  }

  // `.update` is called by the game object on every tick.
  update (ticks) {
    // Check to see if our snake has eaten a pellet. If so, set `this.growing`
    // to true so we can know that when growing the snake.
    if (doesIntersectWithArray(this.segments[0], this.game.pellets)) {
      this.game.removePellet(this.segments[0])
      this.growing = true
    }

    // Only move the snake every `TICKS_PER_MOVE` ticks.
    if (ticks % TICKS_PER_MOVE === 0) {
      this.moveSnake()
    }
  }

  // `.draw` draws our snake. It takes `screen` as an argument. This screen --
  // the canvas's context -- is part of the game, which is stored in `this.game`,
  // so we don't technically need to pass it, but it's a good practice to
  // give a method the things it depends on as arguments. If we ever removed
  // the game from Snake's constructor, `.draw` would still work.
  draw (screen) {
    screen.fillStyle = COLORS.snakeBody
    for (let segment of this.tail()) {
      screen.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE, GRID_SIZE)
    }

    // We draw the head last so it will show up if we run into the snake's body.
    screen.fillStyle = COLORS.snakeHead
    screen.fillRect(
      this.head().x * GRID_SIZE,
      this.head().y * GRID_SIZE,
      GRID_SIZE, GRID_SIZE)
  }

  // The first segment is the head.
  head () {
    return this.segments[0]
  }

  // The rest of the segments are the snake's tail.
  tail () {
    return this.segments.slice(1)
  }

  // Our `.turnLeft` and `.turnRight` methods handle how to change direction.
  // Our controls -- the left and right keys -- turn the snake left and right
  // according to its orientation, not ours, so if the snake is headed down,
  // turning left turns it to our right.
  //
  // These functions could be written more tersely by using an object to hold
  // the mappings from current direction to the left and then inverting it
  // or implementing `turnRight` as turning left three times, but all of that
  // seems like overkill for something this simple.
  turnLeft () {
    if (this.direction === 'up') {
      this.direction = 'left'
    } else if (this.direction === 'left') {
      this.direction = 'down'
    } else if (this.direction === 'down') {
      this.direction = 'right'
    } else if (this.direction === 'right') {
      this.direction = 'up'
    }
  }

  turnRight () {
    if (this.direction === 'up') {
      this.direction = 'right'
    } else if (this.direction === 'left') {
      this.direction = 'up'
    } else if (this.direction === 'down') {
      this.direction = 'left'
    } else if (this.direction === 'right') {
      this.direction = 'down'
    }
  }

  // The method to move a snake uses our `.segments` array's built-in methods.
  // Since the first segment is the head, and we know which way the snake is
  // moving, we add a new segment to the beginning of the array with the new head's
  // position.
  //
  // Normally, we remove the last segment as well, but if the snake is currently
  // growing, we leave it. Leaving it allows the snake to grow at the end seamlessly.
  moveSnake () {
    let newSegment = {
      x: this.segments[0].x,
      y: this.segments[0].y
    }

    if (this.direction === 'up') {
      newSegment.y--
    } else if (this.direction === 'down') {
      newSegment.y++
    } else if (this.direction === 'left') {
      newSegment.x--
    } else if (this.direction === 'right') {
      newSegment.x++
    }

    this.segments.unshift(newSegment)
    if (this.growing) {
      // Once our snake is grown, set the `.growing` flag back to false.
      this.growing = false
    } else {
      this.segments.pop()
    }
  }
}

// ## Pellet class
//
// Our pellet class is very small. It is essentially a set of coordinates
// that knows how to draw itself.
class Pellet {
  constructor (pos) {
    this.x = pos.x
    this.y = pos.y
  }

  draw (screen) {
    screen.fillStyle = COLORS.pellet
    screen.fillRect(
      this.x * GRID_SIZE,
      this.y * GRID_SIZE,
      GRID_SIZE, GRID_SIZE)
  }
}

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

// Start the game.
let game = new Game('game-canvas')
game.start()
