const GRID_SIZE = 30
const COLORS = {
  snakeHead: '#06BA63',
  snakeBody: '#0FFF95',
  grid: '#9FD7FF',
  wall: '#000000',
  background: '#FFFFFF'
}

class Game {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.context = this.canvas.getContext('2d')
    this.size = { width: this.canvas.width, height: this.canvas.height }
    this.squares = { x: this.size.width / GRID_SIZE, y: this.size.height / GRID_SIZE }

    this.snake = new Snake(this, {
      x: Math.floor(this.squares.x / 2),
      y: Math.floor(this.squares.y / 2)}, 3)

    this.ticks = 0

    let tick = () => {
      this.ticks++
      this.update()
      this.draw()
      window.requestAnimationFrame(tick)
    }

    this.tick = tick
  }

  start () {
    this.tick()
  }

  update () {
    this.snake.update(this.ticks)
  }

  draw () {
    this.context.clearRect(0, 0, this.size.width, this.size.height)

    this.context.fillStyle = COLORS.wall
    this.context.fillRect(0, 0, this.size.width, this.size.height)

    this.context.fillStyle = COLORS.background
    this.context.fillRect(
      GRID_SIZE,
      GRID_SIZE,
      (this.squares.x - 2) * GRID_SIZE,
      (this.squares.y - 2) * GRID_SIZE)

    this.context.strokeStyle = COLORS.grid
    this.context.lineWidth = 1

    this.context.beginPath()
    for (var x = 0; x < this.size.width; x += GRID_SIZE) {
      this.context.moveTo(x, 0)
      this.context.lineTo(x, this.size.height)
    }

    for (var y = 0; y < this.size.height; y += GRID_SIZE) {
      this.context.moveTo(0, y)
      this.context.lineTo(this.size.width, y)
    }
    this.context.stroke()

    this.snake.draw()
  }
}

class Snake {
  constructor (game, headPos, segmentCount) {
    this.game = game
    this.segments = []
    for (let i = 0; i < segmentCount; i++) {
      this.segments.push({x: headPos.x, y: headPos.y + i})
    }
    this.direction = 'up'
    this.keyboarder = new Keyboarder()

    this.keyboarder.on(Keyboarder.KEYS.LEFT, () => this.turnLeft())
    this.keyboarder.on(Keyboarder.KEYS.RIGHT, () => this.turnRight())
  }

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

  update (ticks) {
    if (ticks % 10 === 0) {
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

      newSegment.x = Math.max(newSegment.x, 0)
      newSegment.x = Math.min(newSegment.x, this.game.squares.x - 1)
      newSegment.y = Math.max(newSegment.y, 0)
      newSegment.y = Math.min(newSegment.y, this.game.squares.y - 1)

      if (newSegment.x !== this.segments[0].x || newSegment.y !== this.segments[0].y) {
        this.segments.unshift(newSegment)
        this.segments.pop()
      }
    }
  }

  draw () {
    let context = this.game.context
    for (let i = 0; i < this.segments.length; i++) {
      let segment = this.segments[i]
      if (i === 0) {
        context.fillStyle = COLORS.snakeHead
      } else {
        context.fillStyle = COLORS.snakeBody
      }
      context.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE,
        GRID_SIZE, GRID_SIZE)
    }
  }
}

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

  on (keyCode, callback) {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === keyCode) {
        callback()
      }
    })
  }
}

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 }

function startGame () {
  let game = new Game('game-canvas')
  game.start()
}

startGame()
