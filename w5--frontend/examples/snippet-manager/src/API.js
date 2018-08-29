import request from 'superagent'

class API {
  constructor () {
    this.baseURI = 'https://snippet-api.glitch.me/api/'
  }

  login (username, password) {
    return request.post(this.baseURI + 'login')
      .send({ username, password })
      .then(res => {
        if (res.body.user) {
          this.username = username
          this.password = password
          return true
        }
        return false
      })
  }

  getSnippets () {
    if (!this.username || !this.password) {
      throw new Error('Must be logged in')
    }

    return request.get(this.baseURI + 'snippets')
      .auth(this.username, this.password)
      .then(res => {
        return res.body.snippets
      })
  }
}

const api = new API()

export default api
