function isMultipleOf (numberToTest, multiple) {
  if (numberToTest % multiple === 0) {
    return true
  } else {
    return false
  }
}

function fizzBuzz (start, end) {
  let current = start

  while (current <= end) {
    if (isMultipleOf(current, 15)) {
      console.log('FizzBuzz')
    } else if (isMultipleOf(current, 3)) {
      console.log('Fizz')
    } else if (isMultipleOf(current, 5)) {
      console.log('Buzz')
    } else {
      console.log(current)
    }

    // current = current + 1
    // current += 1
    current++
  }
}

fizzBuzz(1, 100)
