function fizzBuzz (start, end) {
  if (start >= end) {
    return
  }

  if (start % 15 === 0) {
    console.log('FizzBuzz')
  } else if (start % 3 === 0) {
    console.log('Fizz')
  } else if (start % 5 === 0) {
    console.log('Buzz')
  } else {
    console.log(start)
  }

  fizzBuzz(start + 1, end)
}

fizzBuzz(1, 100)
