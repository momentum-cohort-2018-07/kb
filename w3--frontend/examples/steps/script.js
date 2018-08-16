class StepCalculator {
  constructor (stepsArray) {
    if (stepsArray) {
      this.steps = stepsArray
    } else {
      this.steps = []
    }
  }

  setSteps (steps) {
    this.steps = steps
  }

  getTotal () {
    return this.steps.reduce(function (total, current) {
      return total + current
    })
  }

  getAverage () {
    if (this.steps.length > 0) {
      return this.getTotal() / this.steps.length
    }
  }

  getRemaining (goal) {
    var total = this.getTotal()
    if (goal > total) {
      return goal - total
    } else {
      return 0
    }
  }
}

class Field {
  constructor (inputNode) {
    this.input = inputNode
  }

  getValue () {
    if (!this.isEmpty()) {
      return parseInt(this.input.value, 10)
    }
  }

  isEmpty () {
    return (this.input.value == null ||
      this.input.value === '' ||
      typeof (this.input.value) === 'undefined')
  }

  onChange (callback) {
    this.input.addEventListener('change', callback)
    this.input.addEventListener('input', callback)
  }
}

class Form {
  constructor (stepFields, goalField) {
    this.stepFields = stepFields
    this.goalField = goalField
    this.calculator = new StepCalculator()

    var onChangeFn = function () {
      this.update()
    }
    onChangeFn = onChangeFn.bind(this)

    this.stepFields.forEach(function (field) {
      field.onChange(onChangeFn)
    })
    this.goalField.onChange(onChangeFn)
  }

  update () {
    var steps = this.stepFields.map(function (field) {
      return field.getValue()
    })
    steps = steps.filter(function (value) {
      return typeof (value) === 'number'
    })

    this.calculator.setSteps(steps)

    document.getElementById('total-steps').innerText = this.calculator.getTotal()
    document.getElementById('average-steps').innerText = this.calculator.getAverage()

    if (!this.goalField.isEmpty()) {
      document.getElementById('steps-to-goal').innerText = this.calculator.getRemaining(this.goalField.getValue())
    }
  }
}

var fieldIds = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']
var fields = fieldIds.map(function (id) {
  return new Field(document.getElementById(id))
})

var stepsForm = new Form(fields, new Field(document.getElementById('goal')))
