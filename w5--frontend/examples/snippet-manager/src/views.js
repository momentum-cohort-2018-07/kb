import h from 'hyperscript'
import api from './API'
import { update } from './page'

function q (selector) {
  return document.querySelector(selector)
}

export function app () {
  if (api.username) {
    return container(mainView())
  } else {
    return container(loginForm())
  }
}

export function container (children) {
  return h('div.container', children)
}

export function loginForm () {
  function login (event) {
    event.preventDefault()

    const username = q('#username').value
    const password = q('#password').value
    api.login(username, password).then(loggedIn => {
      console.log(loggedIn ? 'logged in!' : 'not logged in :(')
      update(app())
    })
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

export function mainView () {
  return h('div',
    h('h1', `Logged in as ${api.username}`)
  )
}
