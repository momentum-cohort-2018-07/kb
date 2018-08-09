function wordCount (text) {
  var words = text.toLowerCase().split(' ')
  var counter = {}

  // var idx = 0
  // while (idx < words.length) {
  //   var word = words[idx]
  //   if (typeof counter[word] === 'undefined') {
  //     counter[word] = 1
  //   } else {
  //     counter[word] += 1
  //   }
  //   idx++
  // }

  for (var idx = 0; idx < words.length; idx++) {
    var word = words[idx]
    if (!counter[word]) {
      counter[word] = 1
    } else {
      counter[word] += 1
    }
  }

  return counter
}





















document.getElementById('run-word-count').addEventListener('click', function () {
  var text = document.getElementById('text-sample').value
  var counter = wordCount(text)
  var words = Object.keys(counter)
  var output = document.getElementById('output')
  output.innerHTML = ''
  for (var idx = 0; idx < words.length; idx++) {
    var word = words[idx]
    output.innerHTML += '<div>' + word + ': ' + counter[word] + '</div>'
  }
})
