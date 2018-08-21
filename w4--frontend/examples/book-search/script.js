import request from 'superagent'

let form = document.getElementById('search-form')
let field = document.getElementById('search-term')

form.addEventListener('submit', event => {
  event.preventDefault()
  let searchTerm = window.encodeURIComponent(field.value)
  request.get('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm)
    .then(response => {
      displayBookResults(response.body)
    })
})

function displayBookResults (results) {
  let books = results.items
  let output = '<h2>Results</h2>'
  for (let book of books) {
    output += `
    <div class="book">
      <figure>
        <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">
      </figure>
      <h3>${book.volumeInfo.title}</h3>
      <p><strong>Authors:</strong> ${book.volumeInfo.authors.join(', ')}</p>
      <p><strong>Description:</strong><br>
      ${book.volumeInfo.description}
      </p>
      
    </div>
    `
  }
  document.getElementById('output').innerHTML = output

}
