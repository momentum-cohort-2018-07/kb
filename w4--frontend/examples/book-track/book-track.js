import 'shoelace-css/dist/shoelace.css'
import './book-track.css'

import request from 'superagent'
import uuid from 'uuid/v4'

request.get('http://localhost:3000/books')
  .then(response => {
    let books = response.body

    for (let currentStatus of ['reading', 'read', 'to-read']) {
      let list = el('ul')
      for (let book of books.filter(book => book.status === currentStatus)) {
        let bookLi = createBookDOM(book)
        list.appendChild(bookLi)
      }

      getId(currentStatus).innerHTML = ''
      getId(currentStatus).appendChild(list)
    }
  })

getId('add-book-button').addEventListener('click', event => {
  hide('add-book-button')
  show('new-book-form')
})

getId('new-book-form').addEventListener('submit', event => {
  event.preventDefault()

  let authors = getId('book-authors').value.split(',').map(author => author.trim())

  let formData = {
    id: uuid(),
    title: getId('book-title').value.trim(),
    authors: authors,
    status: getId('book-status').value
  }

  request.post('http://localhost:3000/books')
    .send(formData)
    .then(response => {
      show('add-book-button')
      hide('new-book-form')
      getId('new-book-form').reset()
      let book = response.body
      addBookToPage(book)
    })
})

function addBookToPage (book) {
  let section = getId(book.status)
  let list = section.querySelector('ul')
  let bookLi = createBookDOM(book)
  list.appendChild(bookLi)
}

function createBookDOM (book) {
  let bookLi = el('li')
  bookLi.classList.add('book')
  bookLi.id = `book-${book.id}`
  bookLi.innerHTML = `<i>${book.title}</i>, ${book.authors.join(', ')}`
  let deleteLink = el('a')
  deleteLink.href = '#'
  deleteLink.style.paddingLeft = '0.5rem'
  deleteLink.classList.add('text-danger')
  deleteLink.innerText = 'x'
  deleteLink.addEventListener('click', event => {
    deleteBook(book)
  })
  bookLi.appendChild(deleteLink)
  return bookLi
}

function deleteBook (book) {
  request.delete(`http://localhost:3000/books/${book.id}`)
    .then(response => {
      getId(`book-${book.id}`).remove()
    })
}

function el (tag) {
  return document.createElement(tag)
}

function getId (id) {
  return document.getElementById(id)
}

function show (id) {
  getId(id).style.display = 'block'
}

function hide (id) {
  getId(id).style.display = 'none'
}
