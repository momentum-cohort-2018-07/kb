/* eslint no-undef: "off" */

import P5 from 'p5'

const WIDTH = 800
const HEIGHT = 600
const SQUARE_SIZE = 20
const GRID_WIDTH = (WIDTH - SQUARE_SIZE) / SQUARE_SIZE
const GRID_HEIGHT = (HEIGHT - SQUARE_SIZE) / SQUARE_SIZE
const SPEED = 10

const COLORS = {
  snake: 'red',
  snakeHead: 'orange',
  pellet: 'green',
  wall: 'blue',
  bg: 'white',
  text: 'black'
}

const DIRECTIONS = {
  up: {left: 'left', right: 'right'},
  down: {left: 'right', right: 'left'},
  left: {left: 'down', right: 'up'},
  right: {left: 'up', right: 'down'}
}

let direction = 'up'
let snake = [[Math.floor(GRID_WIDTH / 2), Math.floor(GRID_HEIGHT / 2) - 3],
  [Math.floor(GRID_WIDTH / 2), Math.floor(GRID_HEIGHT / 2) - 2],
  [Math.floor(GRID_WIDTH / 2), Math.floor(GRID_HEIGHT / 2) - 1],
  [Math.floor(GRID_WIDTH / 2) + 1, Math.floor(GRID_HEIGHT / 2) - 1],
  [Math.floor(GRID_WIDTH / 2) + 1, Math.floor(GRID_HEIGHT / 2)]
]
let ticks = 0
let gameState = 'start'
let pellet = null
let atePellet = false

let makeSnakeGame = function (sketch) {
// Run once on page load.
  sketch.setup = function () {
    sketch.createCanvas(WIDTH, HEIGHT)
    placePellet()
  }

  // Game loop -- run over and over.
  sketch.draw = function () {
    sketch.noStroke()

    // draw wall
    sketch.fill(COLORS.wall)
    sketch.rect(0, 0, WIDTH, HEIGHT)
    sketch.fill(COLORS.bg)
    sketch.rect(SQUARE_SIZE, SQUARE_SIZE, WIDTH - SQUARE_SIZE * 2, HEIGHT - SQUARE_SIZE * 2)

    if (isGameStart()) {
      sketch.fill(COLORS.text)
      sketch.textAlign('center')
      sketch.textSize(36)
      sketch.text('Press any key to begin', WIDTH / 2, SQUARE_SIZE * 4)
      sketch.text('Left and right arrows to turn', WIDTH / 2, SQUARE_SIZE * 4 + 46)
    } else if (isGameOver()) {
      sketch.fill(COLORS.text)
      sketch.textAlign('center')
      sketch.textSize(36)
      sketch.text('Game over', WIDTH / 2, HEIGHT / 3)
    // show end
    } else {
      if (ticks % SPEED === 0) {
        moveSnake(atePellet)
        atePellet = false
      }
      if (pellet && isTouchingSnake(pellet)) {
        pellet = null
        atePellet = true
      }
      ticks++

      checkGameOver()
    }

    drawSnake()
    if (pellet === null) {
      placePellet()
    }
    drawPellet()
  }

  sketch.keyPressed = function () {
    if (isGameStart()) {
      gameState = 'running'
      sketch.loop()
    }

    if (sketch.keyCode === sketch.LEFT_ARROW) {
      direction = DIRECTIONS[direction].left
    } else if (sketch.keyCode === sketch.RIGHT_ARROW) {
      direction = DIRECTIONS[direction].right
    }
  }

  function isGameStart () {
    return gameState === 'start'
  }

  function isGameRunning () {
    return gameState === 'running'
  }

  function isGameOver () {
    return gameState === 'over'
  }

  function drawGridSquare (gridX, gridY) {
    let realX = gridX * SQUARE_SIZE
    let realY = gridY * SQUARE_SIZE
    sketch.rect(realX, realY, SQUARE_SIZE, SQUARE_SIZE)
  }

  function drawSnake () {
    for (let idx = 0; idx < snake.length; idx++) {
      if (idx === 0) {
        sketch.fill(COLORS.snakeHead)
      } else {
        sketch.fill(COLORS.snake)
      }
      drawGridSquare(snake[idx][0], snake[idx][1])
    }
  }

  function drawPellet () {
    sketch.fill(COLORS.pellet)
    drawGridSquare(pellet[0], pellet[1])
  }

  function moveSnake (atePellet) {
    if (!direction) {
      return
    }

    let newSegment = snake[0].slice(0)
    if (direction === 'up') {
      newSegment[1] += -1
    } else if (direction === 'down') {
      newSegment[1] += 1
    } else if (direction === 'left') {
      newSegment[0] += -1
    } else if (direction === 'right') {
      newSegment[0] += 1
    }

    snake.unshift(newSegment)
    if (!atePellet) {
      snake.pop()
    }
  }

  function checkGameOver () {
    let head = snake[0]
    if (head[0] <= 0 || head[0] >= GRID_WIDTH || head[1] <= 0 || head[1] >= GRID_HEIGHT) {
      gameState = 'over'
    }

    for (let segment of snake.slice(1)) {
      if (isSameLocation(head, segment)) {
        gameState = 'over'
      }
    }
  }

  function isSameLocation (pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1]
  }

  function isTouchingSnake (pos) {
    for (let segment of snake) {
      if (isSameLocation(pos, segment)) {
        return true
      }
    }
    return false
  }

  function placePellet () {
    let pelletPos = [Math.floor(Math.random() * (GRID_WIDTH - 2)) + 1,
      Math.floor(Math.random() * (GRID_HEIGHT - 2)) + 1]
    if (isTouchingSnake(pelletPos)) {
      placePellet()
    } else {
      pellet = pelletPos
    }
  }
}

let game = new P5(makeSnakeGame)
