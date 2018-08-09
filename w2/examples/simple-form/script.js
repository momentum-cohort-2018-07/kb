document.getElementById('greeting-form').addEventListener('submit', function (event) {
  event.preventDefault()

  clearError()

  var name = document.getElementById('name-field').value.trim()

  // check and make sure name is not empty
  if (name === '') {
    showEmptyNameError()
  } else {
    document.getElementById('output').innerText = 'Hello, ' + name + '!'
  }
})

function clearError () {
  var field = document.getElementById('name-field')
  field.classList.remove('error')
  // same as: field.parentElement.getElementsByClassName('.error-msg')[0]
  var errorMsg = field.parentElement.querySelector('.error-msg')
  if (errorMsg) {
    errorMsg.remove()
  }
}

function showEmptyNameError () {
  var errorDiv = document.createElement('div')
  errorDiv.classList.add('error-msg')
  errorDiv.innerText = 'cannot be blank'

  var field = document.getElementById('name-field')
  field.parentElement.appendChild(errorDiv)
  field.classList.add('error')
}
