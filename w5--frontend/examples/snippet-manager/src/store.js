import lodash from 'lodash'
import { mount } from './page'
import setupViews from './views'
import api from './api'

const store = {
  username: window.localStorage.getItem('username'),
  password: window.localStorage.getItem('password'),
  snippets: [],
  view: ['app'],
  router: null,

  setUsernameAndPassword (username, password) {
    window.localStorage.setItem('username', username)
    window.localStorage.setItem('password', password)
    this.setData({
      username, password
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
    mount(this.views.app())
  },

  changeView (view, viewParams) {
    this.setData({view: view, viewParams: viewParams})
  },

  getSnippet (snippetId) {
    return this.snippets.find((snippet) => snippet._id === snippetId)
  },

  updateSnippet (id, snippet) {
    return api.updateSnippet(this.username, this.password, id, snippet)
      .then(snippet => {
        const snippets = lodash.cloneDeep(this.snippets)
        const index = this.snippets.findIndex(snippet => snippet._id === id)
        snippets[index] = snippet
        console.log(snippet)
        this.setData({
          snippets: snippets
        })
      })
  },

  retrieveSnippets () {
    if (this.username && this.password) {
      return api.getSnippets(this.username, this.password)
        .then(snippets => {
          this.setData({
            snippets: snippets
          })
        })
    }
  }
}

store.views = setupViews(store)

export default store
