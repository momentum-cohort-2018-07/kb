import 'shoelace-css/dist/shoelace.css'
import './book-track.css'

import request from 'superagent'
import uuid from 'uuid/v4'

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

// Listen for any clicks anywhere inside the div with id books.
// If the click is on a delete link, delete the book.
// If the click is on a promote button, promote the book.
getId('books').addEventListener('click', event => {
  if (event.target && event.target.classList.contains('delete-book')) {
    deleteBook(event.target.dataset.bookId)
  }

  if (event.target && event.target.classList.contains('promote-button')) {
    promoteBook(
      event.target.parentElement.dataset.bookId,
      event.target.dataset.nextStatus)
  }
})

function getBooks () {
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
}

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
  bookLi.dataset.bookId = book.id
  bookLi.innerHTML = `<i>${book.title}</i>, ${book.authors.join(', ')}`

  if (book.status !== 'read') {
    let promoteButton = el('button')
    promoteButton.classList.add('button-xs', 'promote-button')
    promoteButton.style.marginLeft = '0.5rem'
    if (book.status === 'to-read') {
      promoteButton.innerText = 'Mark as reading'
      promoteButton.dataset.nextStatus = 'reading'
    } else {
      promoteButton.innerText = 'Mark as read'
      promoteButton.dataset.nextStatus = 'read'
    }
    bookLi.appendChild(promoteButton)
  }

  let deleteLink = el('a')
  deleteLink.href = '#'
  deleteLink.style.paddingLeft = '0.5rem'
  deleteLink.classList.add('text-danger', 'delete-book')
  deleteLink.dataset.bookId = book.id
  deleteLink.innerText = 'x'
  bookLi.appendChild(deleteLink)
  return bookLi
}

function deleteBook (bookId) {
  request.delete(`http://localhost:3000/books/${bookId}`)
    .then(response => {
      getId(`book-${bookId}`).remove()
    })
}

function promoteBook (bookId, status) {
  request.patch(`http://localhost:3000/books/${bookId}`)
    .send({'status': status})
    .then(response => {
      getBooks()
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

getBooks()
