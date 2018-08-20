import { COLORS, GRID_SIZE } from './constants'

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

export default Pellet
