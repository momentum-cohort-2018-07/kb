var isInvalid = false

function markValid (field) {
  field.classList.remove('input-invalid')
  field.classList.add('input-valid')
  clearErrorMsgs(field)
}

function markInvalid (field, msgs) {
  isInvalid = true
  field.classList.remove('input-valid')
  field.classList.add('input-invalid')

  clearErrorMsgs(field)

  for (var idx = 0; idx < msgs.length; idx++) {
    var errorMsg = document.createElement('div')
    errorMsg.classList.add('error-msg')
    errorMsg.classList.add('text-danger')
    errorMsg.innerText = msgs[idx]
    field.appendChild(errorMsg)
  }
}

function clearErrorMsgs (field) {
  var errorMsgs = field.querySelectorAll('.error-msg')
  for (var idx = 0; idx < errorMsgs.length; idx++) {
    errorMsgs[idx].remove()
  }
}

function validate () {
  isInvalid = false
  validateName()
  validateCar()
  validateStartDate()
  validateNumberOfDays()
  validateCardNumber()
  validateCVV()
  validateExpirationDate()
  if (isInvalid) {
    clearPrice()
  } else {
    showPrice()
  }
}

function validateName () {
  var input = document.getElementById('name')
  var field = document.getElementById('name-field')
  if (input.value === '') {
    markInvalid(field, ['Name is required.'])
    return false
  } else {
    markValid(field)
    return true
  }
}

function validateCar () {
  var field = document.getElementById('car-field')
  var carYear = document.getElementById('car-year')
  var carMake = document.getElementById('car-make')
  var carModel = document.getElementById('car-model')

  var errorMsgs = []
  if (carYear.value === '') {
    errorMsgs.push('Car year is required.')
  }
  if (carMake.value === '') {
    errorMsgs.push('Car make is required.')
  }
  if (carModel.value === '') {
    errorMsgs.push('Car model is required.')
  }

  if (errorMsgs.length > 0) {
    markInvalid(field, errorMsgs)
    return false
  } else {
    markValid(field)
    return true
  }
}

function validateStartDate () {
  var input = document.getElementById('start-date')
  var field = document.getElementById('start-date-field')
  if (input.value === '') {
    markInvalid(field, ['Date parking is required.'])
    return false
  } else {
    var startDate = new Date(input.value + 'T00:00')
    var now = new Date()
    if (startDate < now) {
      markInvalid(field, ['Date parking must be in the future.'])
      return false
    } else {
      markValid(field)
      return true
    }
  }
}

function validateNumberOfDays () {
  var input = document.getElementById('days')
  var field = document.getElementById('days-field')
  if (input.value === '') {
    markInvalid(field, ['Number of days is required.'])
    return false
  } else {
    var days = parseInt(input.value, 10)
    if (isNaN(days)) {
      markInvalid(field, ['Number of days must be a number.'])
      return false
    } else if (days < 1 || days > 30) {
      markInvalid(field, ['Number of days must be between 1 and 30.'])
      return false
    } else {
      markValid(field)
      return true
    }
  }
}

function validateCardNumber () {
  var input = document.getElementById('credit-card')
  var field = document.getElementById('credit-card-field')
  if (input.value === '') {
    markInvalid(field, ['Credit card is required.'])
    return false
  } else {
    if (!isValidCardNumber(input.value)) {
      markInvalid(field, ['Credit card format is not valid.'])
      return false
    } else {
      markValid(field)
      return true
    }
  }
}

function validateCVV () {
  var input = document.getElementById('cvv')
  var field = document.getElementById('cvv-field')
  if (input.value === '') {
    markInvalid(field, ['CVV is required.'])
    return false
  } else {
    var cvv = input.value
    var invalid = false
    if (cvv.length !== 3) {
      invalid = true
    }
    for (var idx = 0; idx < 3; idx++) {
      if (isNaN(parseInt(cvv[idx]), 10)) {
        invalid = true
      }
    }

    if (invalid) {
      markInvalid(field, ['CVV must be a three digit number.'])
      return false
    } else {
      markValid(field)
      return true
    }
  }
}

function validateExpirationDate () {
  var input = document.getElementById('expiration')
  var field = document.getElementById('expiration-field')
  if (input.value === '') {
    markInvalid(field, ['Expiration date is required.'])
    return false
  }

  var month,
    year
  var expiration = input.value
  var slashPos = expiration.indexOf('/')
  if (slashPos === -1) {
    markInvalid(field, ['Expiration date must be in the format MM/YY.'])
    return false
  }

  month = parseInt(expiration.slice(0, slashPos), 10)
  year = parseInt(expiration.slice(slashPos + 1), 10)

  if (isNaN(month) || isNaN(year)) {
    markInvalid(field, ['Expiration date must be in the format MM/YY.'])
    return false
  }

  if (month < 1 || month > 12 || year < 1 || year > 99) {
    markInvalid(field, ['Expiration date must be a valid month and year.'])
    return false
  }

  year += 2000
  var today = new Date()
  var todayMonth = today.getMonth() + 1
  var todayYear = today.getFullYear()

  if (year < todayYear || (year === todayYear && month < todayMonth)) {
    markInvalid(field, ['Expiration date must not be in the past.'])
    return false
  }

  markValid(field)
  return true
}

function isValidCardNumber (number) {
  var regex = new RegExp('^[0-9]{16}$')
  if (!regex.test(number)) {
    return false
  }

  return luhnCheck(number)
}

function luhnCheck (val) {
  var sum = 0
  for (var i = 0; i < val.length; i++) {
    var intVal = parseInt(val.substr(i, 1))
    if (i % 2 === 0) {
      intVal *= 2
      if (intVal > 9) {
        intVal = 1 + (intVal % 10)
      }
    }
    sum += intVal
  }
  return (sum % 10) === 0
}

function calculatePrice (startDate, numberOfDays) {
  var days = []
  for (var i = 0; i < numberOfDays; i++) {
    days.push(i)
  }
  var year = startDate.getFullYear()
  var month = startDate.getMonth()
  var date = startDate.getDate()

  days = days.map(function (day) {
    return new Date(year, month, date + day)
  })

  var isWeekend = days.map(function (date) {
    return date.getDay() === 0 || date.getDay() === 6
  })

  var price = isWeekend.reduce(function (total, weekend) {
    if (weekend) {
      return total + 7
    } else {
      return total + 5
    }
  }, 0)

  return price
}

function clearPrice () {
  var priceEl = document.getElementById('total')
  priceEl.innerText = ''
}

function showPrice () {
  var dateInput = document.getElementById('start-date')
  var date = new Date(dateInput.value + 'T00:00Z')
  var daysInput = document.getElementById('days')
  var days = parseInt(daysInput.value, 10)

  var price = calculatePrice(date, days)

  var priceEl = document.getElementById('total')
  priceEl.innerText = 'Your total cost is $' + price + '.'
}

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('submit-button')
  button.addEventListener('click', function (event) {
    event.preventDefault()
    validate()
  })
})
