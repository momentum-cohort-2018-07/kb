import Keyboarder from './Keyboarder'
import { COLORS, GRID_SIZE } from './constants'
import { doesIntersectWithArray } from './collision'

// The speed of the snake. Increasing this slows the snake. Ticks happen
// approximately 60x/sec, so with TICKS_PER_MOVE of 10, the snake moves
// 6x/sec.
const TICKS_PER_MOVE = 10

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

export default Snake
