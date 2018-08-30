import lodash from 'lodash'
import { mount } from './page'
import { app } from './views'
import api from './api'

const store = {
  username: window.localStorage.getItem('username'),
  password: window.localStorage.getItem('password'),
  snippets: [],
  editing: null,

  setUsernameAndPassword (username, password) {
    window.localStorage.setItem('username', username)
    window.localStorage.setItem('password', password)
    this.setData({
      username, password
    })
  },

  getSnippet (snippetId) {
    return this.snippets.find((snippet) => snippet._id === snippetId)
  },

  updateSnippets (id, snippet) {
    api.updateSnippet(this.username, this.password, id, snippet)
      .then(snippet => {
        const snippets = lodash.cloneDeep(this.snippets)
        const index = this.snippets.findIndex(snippet => snippet.id === id)
        snippets[index] = snippet
        this.setData({
          editing: null,
          snippets: snippets
        })
      })
  },

  retrieveSnippets () {
    api.getSnippets(this.username, this.password)
      .then(snippets => {
        this.setData({
          snippets: snippets
        })
      })
  },

  setData (data) {
    const oldStore = lodash.cloneDeep(this)

    for (let key of Object.keys(data)) {
      this[key] = data[key]
    }

    if (!lodash.isEqual(oldStore, this)) {
      this.updatePage()
    }
  },

  updatePage () {
    console.log('updating page')
    mount(app())
  }
}

export default store
