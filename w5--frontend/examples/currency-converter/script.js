import 'shoelace-css/dist/shoelace.css'
import Currency from './src/Currency'
import Money from './src/Money'

const currencies = new Map()
currencies.set('EUR', new Currency('EUR', 'Euro', 1.17))
currencies.set('CAN', new Currency('CAN', 'Canadian Dollar', 0.77))
currencies.set('MYR', new Currency('MYR', 'Malaysian Ringgit', 0.24))

document.addEventListener('DOMContentLoaded', event => {
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

document.getElementById('exchange-form').addEventListener('submit', event => {
  event.preventDefault()
  const currencyCode = document.getElementById('currency-code').value
  const currency = currencies.get(currencyCode)
  const amount = parseFloat(document.getElementById('amount').value)
  const money = new Money(amount, currency)
  document.getElementById('amount-in-usd').innerText = money.amountInUSD()
})
