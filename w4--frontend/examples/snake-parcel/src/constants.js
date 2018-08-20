// ## Constants
//
// These variables are used throughout the game as settings. Keeping them
// all in one place makes it easy to tweak the game.

// Snake is a game with _discrete movement_; that is, instead of moving pixel
// by pixel across the screen, the snake moves one square at a time on a grid.
// GRID_SIZE determines the size of each of those squares. This value should
// divide into the overall width and height of the canvas with no remainder.
export const GRID_SIZE = 20

// How many pellets should be on the screen at any one time.
export const PELLET_COUNT = 2

// Display the underlying grid.
export const SHOW_GRID = false

// Object with all the colors used in the game.
export const COLORS = {
  snakeHead: '#9BC53D',
  snakeBody: '#FDE74C',
  wall: '#404E4D',
  background: '#FFFFFF',
  grid: '#5BC0EB',
  pellet: '#C3423F'
}
