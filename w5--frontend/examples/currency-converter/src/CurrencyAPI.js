import request from 'superagent'

class CurrencyAPI {
  constructor (username, password) {
    this.username = username
    this.password = password
    this.baseURL = 'https://fantasy-currency.glitch.me/rates'
  }

  getRates () {
    return request
      .get(this.baseURL).auth(this.username, this.password)
      .then(response => response.body.rates)
  }
}

export default CurrencyAPI
