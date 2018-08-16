class Field {
  constructor (input, validations) {
    this.input = input
    this.validations = validations
  }

  validate () {
    this.clearErrorMsgs()
    var isValid = true
    var errorMsgs = []

    for (var validation of this.validations) {
      if (!validation.isValid(this.getValue())) {
        isValid = false
        errorMsgs.push(validation.errorMsg)
      }
    }

    if (isValid) {
      this.markValid()
    } else {
      for (var msg of errorMsgs) {
        this.markInvalid(msg)
      }
    }
  }

  markValid () {
    this.input.parentElement.classList.add('input-valid')
    this.input.parentElement.classList.remove('input-invalid')
  }

  markInvalid (message) {
    this.input.parentElement.classList.remove('input-valid')
    this.input.parentElement.classList.add('input-invalid')

    var errorMsg = document.createElement('div')
    errorMsg.classList.add('input-hint', 'text-danger')
    errorMsg.innerText = message
    this.input.parentElement.appendChild(errorMsg)
  }

  clearErrorMsgs () {
    this.input.parentElement.querySelectorAll('.input-hint').forEach(function (el) {
      el.remove()
    })
  }

  onChange (listenerFn) {
    this.input.addEventListener('input', listenerFn)
  }

  getValue () {
    return this.input.value
  }
}

class NumberField extends Field {
  getValue () {
    return parseInt(this.input.value, 10)
  }
}

class Form {
  constructor (fields) {
    this.fields = fields
    var updateForm = this.updateForm.bind(this)

    this.fields.forEach(function (field) {
      // Polymorphism
      field.onChange(updateForm)
    })
  }

  updateForm () {
    this.fields.forEach(function (field) {
      field.validate()
    })
  }
}

class Validation {
  constructor (validationFn, errorMsg) {
    this.validationFn = validationFn
    this.errorMsg = errorMsg
  }

  isValid (value) {
    return this.validationFn(value)
  }
}

// Setup number field
var numberInput = document.getElementById('my-number')

var greaterThanOrEqOneValidation = new Validation(function (number) {
  return number >= 1
}, 'Your number is less than 1')

var lessThanOrEqTenValidation = new Validation(function (number) {
  return number <= 10
}, 'Your number is greater than 10')

var evenNumberValidation = new Validation(function (number) {
  return number % 2 === 0
}, 'Your number must be even')

var numberField = new NumberField(numberInput, [
  greaterThanOrEqOneValidation,
  lessThanOrEqTenValidation,
  evenNumberValidation
])

// Setup email field
var emailInput = document.getElementById('my-email')
var emailField = new Field(emailInput, [
  new Validation(function (email) {
    return email !== ''
  }, 'You must enter an email'),
  new Validation(function (email) {
    return email.includes('@', 1)
  }, 'That does not look like an email')
])

// Setup form
var form = new Form([numberField, emailField])
