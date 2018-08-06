function writeOutput (text) {
  document.getElementById('output').innerHTML +=
    '<div>' + text + '</div>'
}

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
      writeOutput('FizzBuzz')
    } else if (isMultipleOf(current, 3)) {
      writeOutput('Fizz')
    } else if (isMultipleOf(current, 5)) {
      writeOutput('Buzz')
    } else {
      writeOutput(current)
    }

    // current = current + 1
    // current += 1
    current++
  }
}

document.getElementById('start-fizzbuzz').addEventListener('click', function () {
  fizzBuzz(1, 100)
})
