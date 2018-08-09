function addToOutput(str) {
  var display = document.getElementById("display");
  display.innerText += str;
}

function clearOutput() {
  document.getElementById("display").innerText = '';
}

function calculateCurrentOutput() {
  var display = document.getElementById("display");
  return eval(display.innerText);
}

function setupNumberButtons() {
  document.querySelectorAll(".number").forEach(function (element) {
    element.addEventListener("click", function (event) {
      addToOutput(event.target.innerText);
    })
  })
}

function setupOperatorButtons() {
  document.querySelectorAll(".operator").forEach(function (element) {
    element.addEventListener("click", function (event) {
      addToOutput(event.target.innerText);
    })
  })
}

function setupClearButton() {
  document.getElementById("clear").addEventListener("click", function (event) {
    clearOutput();
  })
}

function setupDecimalButton() {
  document.getElementById("decimal").addEventListener("click", function (event) {
    addToOutput(".");
  })
}

function setupEqualsButton() {
  document.getElementById("operator-equals").addEventListener("click", function (event) {
    var result = calculateCurrentOutput();
    clearOutput();
    addToOutput(result);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setupNumberButtons();
  setupOperatorButtons();
  setupClearButton();
  setupDecimalButton();
  setupEqualsButton();
})
