import h from 'hyperscript'
import api from './api'
import store from './store'

function q (selector) {
  return document.querySelector(selector)
}

function app () {
  if (store.username) {
    return container(views[store.view](store.viewParams))
  } else {
    return container(loginForm())
  }
}

function container (children) {
  return h('div.container', children)
}

function loginForm () {
  function login (event) {
    event.preventDefault()

    const username = q('#username').value
    const password = q('#password').value
    api.login(username, password)
      .then(user => {
        if (user) {
          store.setUsernameAndPassword(user.username, user.password)
        }
      })
      .then(() => store.retrieveSnippets())
  }

  return h('div',
    h('h1', 'Login form'),
    h('form#login-form', {onsubmit: login},
      h('div.input-field',
        h('label', {htmlFor: 'username'}, 'Username'),
        h('input#username', {type: 'text', required: true})
      ),
      h('div.input-field',
        h('label', {htmlFor: 'password'}, 'Password'),
        h('input#password', {type: 'password', required: true})
      ),
      h('button', {type: 'submit'}, 'Login')
    ))
}

function snippetView (snippet) {
  function editSnippet (event) {
    event.preventDefault()
    store.router.navigateTo(`edit/${event.target.dataset.snippetId}`)
  }

  return h('div.snippet',
    h('h2', snippet.title),
    h('pre',
      h('code', {className: snippet.lang},
        snippet.code
      )
    ),
    h('a', {href: '#', 'data-snippet-id': snippet._id, onclick: editSnippet}, 'Edit')
  )
}

function editSnippetView (params) {
  const snippet = store.getSnippet(params.id)

  if (!snippet) {
    return h('h1', 'waiting...')
  }

  function updateSnippet (event) {
    event.preventDefault()
    const title = document.getElementById('title').value.trim()
    const lang = document.getElementById('lang').value.trim()
    const code = document.getElementById('code').value.trim()

    store.updateSnippet(snippet._id, {
      title: title,
      lang: lang,
      code: code
    }).then(() => {
      store.router.navigateTo('')
    })
  }

  return h('div.edit-snippet',
    h('h2', `Editing ${snippet.title}`),
    h('form', {onsubmit: updateSnippet},
      h('.input-field',
        h('label', {htmlFor: 'title'}, 'Title'),
        h('input#title', {type: 'text', name: 'title', required: true, value: snippet.title})),
      h('.input-field',
        h('label', {htmlFor: 'lang'}, 'Language'),
        h('input#lang', {type: 'text', name: 'lang', required: true, value: snippet.lang})),
      h('.input-field',
        h('label', {htmlFor: 'code'}, 'Code'),
        h('textarea#code.code-entry', {name: 'code', required: true}, snippet.code)),
      h('button', {type: 'submit'}, 'Update snippet')
    )
  )
}

function mainView () {
  return h('div',
    h('h1', `Snippets - ${store.username}`),
    h('div#snippets',
      store.snippets.map(snippetView)
    )
  )
}

const views = {
  app: app,
  main: mainView,
  editSnippet: editSnippetView,
  login: loginForm
}

export default views
