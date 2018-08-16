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

    this.snake = new Snake({
      x: Math.floor(this.squares.x / 2),
      y: Math.floor(this.squares.y / 2)}, 3)

    this.ticks = 0
  }

  update () {
    this.snake.update(this.ticks)
  }

  draw () {
    this.context.fillStyle = COLORS.wall
    this.context.fillRect(0, 0, this.size.width, this.size.height)

    this.context.fillStyle = COLORS.background
    this.context.fillRect(
      GRID_SIZE,
      GRID_SIZE,
      (this.squares.x - 2) * GRID_SIZE,
      (this.squares.y - 2) * GRID_SIZE)

    this.context.fillStyle = COLORS.grid
    for (var x = 0; x < this.size.width; x += GRID_SIZE) {
      this.context.fillRect(x - 1, 0, 2, this.size.height)
    }

    for (var y = 0; y < this.size.height; y += GRID_SIZE) {
      this.context.fillRect(0, y - 1, this.size.width, 2)
    }

    this.snake.draw(this.context)
  }

  tick () {
    this.ticks++
    this.update()
    this.draw()
    window.requestAnimationFrame(() => this.tick())
  }

  start () {
    this.tick()
  }
}

class Snake {
  constructor (headPos, segmentCount) {
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
    if (ticks % 30 === 0) {
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
      this.segments.pop()
    }
  }

  draw (context) {
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
