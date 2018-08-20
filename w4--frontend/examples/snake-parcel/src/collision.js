// Collision detection in Snake is a lot easier than in games with continuous
// movement. We just care if two things are in the same square. This function
// takes any two objects that have `x` and `y` properties and checks to see
// if their `x`s and `y`s are the same.
export function isSamePos (pos, otherPos) {
  return pos.x === otherPos.x && pos.y === otherPos.y
}

// The snake segments and the pellets are both in arrays, so we created this
// helper function to find out if a position is found within an array, allowing
// us to check for the snake eating pellets or running into itself using
// the same function.
export function doesIntersectWithArray (pos, posArray) {
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
