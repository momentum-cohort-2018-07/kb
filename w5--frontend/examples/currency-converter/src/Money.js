class Money {
  constructor (amount, currency) {
    this.amount = amount
    this.currency = currency
  }

  amountInUSD () {
    return this.amount * this.currency.rateInUSD
  }
}

export default Money
