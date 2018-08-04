function fizzBuzz (start, end) {
  if (start >= end) {
    return
  }

  if (start % 3 === 0) {
    console.log('Fizz')
  }
  if (start % 5 === 0) {
    console.log('Buzz')
  }
  if (start % 3 !== 0 && start % 5 !== 0) {
    console.log(start)
  }
  fizzBuzz(start + 1, end)
}

fizzBuzz(1, 100)
