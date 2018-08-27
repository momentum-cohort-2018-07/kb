import 'shoelace-css/dist/shoelace.css'
import './book-track.css'

import request from 'superagent'
import uuid from 'uuid/v4'
import h from 'hyperscript'

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
        let list = h('ul', {},
          books
            .filter(book => book.status === currentStatus)
            .map(book => createBookDOM(book)))

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
  let bookLi = h('li.book', {
    id: `book-${book.id}`,
    'data-book-id': book.id
  }, [
    h('i', book.title),
    ', ',
    book.authors.join(', ')
  ])

  if (book.status !== 'read') {
    let promoteButton = h('button.button-xs.promote-button', {
      style: {
        'margin-left': '0.5rem'
      },
      'data-next-status': book.status === 'to-read' ? 'reading' : 'read'
    }, [
      book.status === 'to-read' ? 'Mark as reading' : 'Mark as read'
    ])

    bookLi.appendChild(promoteButton)
  }

  let deleteLink = h('a.text-danger.delete-book', {
    href: '#',
    style: 'padding-left: 0.5rem',
    'data-book-id': book.id
  }, ['x'])
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
