import 'shoelace-css/dist/shoelace.css'
import Currency from './src/Currency'
import Money from './src/Money'
import CurrencyAPI from './src/CurrencyAPI'

const api = new CurrencyAPI('clinton', 'password')
const currencies = new Map()

document.addEventListener('DOMContentLoaded', event => {
  api.getRates().then(rates => {
    console.log('returned from API')
    console.log('rateData', rates)
    for (let currencyData of rates) {
      currencies.set(currencyData.abbr,
        new Currency(currencyData.abbr, currencyData.name, currencyData.rateInUSD))
    }
    return currencies
  }).then(currencies => {
    const select = document.getElementById('currency-code')
    select.innerHTML = ''
    for (let code of currencies.keys()) {
      const currency = currencies.get(code)
      const option = document.createElement('option')
      option.value = currency.code
      option.innerText = currency.name
      select.appendChild(option)
    }
  })
})

document.getElementById('exchange-form').addEventListener('submit', event => {
  event.preventDefault()
  const currencyCode = document.getElementById('currency-code').value
  const currency = currencies.get(currencyCode)
  const amount = parseFloat(document.getElementById('amount').value)
  const money = new Money(amount, currency)
  document.getElementById('amount-in-usd').innerText = money.amountInUSD()
})
