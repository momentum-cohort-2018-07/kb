import request from 'superagent'

const api = {
  baseURI: 'https://snippet-api.glitch.me/api/',

  login (username, password) {
    return request.post(this.baseURI + 'login')
      .send({ username, password })
      .then(res => res.body.user)
  },

  getSnippets (username, password) {
    return request.get(this.baseURI + 'snippets')
      .auth(username, password)
      .then(res => {
        return res.body.snippets
      })
  },

  updateSnippet (username, password, id, snippet) {
    return request.put(this.baseURI + `snippets/${id}`)
      .auth(username, password)
      .send(snippet)
      .then(res => res.body)
  }
}

export default api
