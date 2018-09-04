import React from 'react'

class Clicker extends React.Component {
  constructor () {
    super()
    this.state = {
      clicks: 0
    }
  }

  addClick () {
    this.setState({
      clicks: this.state.clicks + 1
    })
  }

  render () {
    return (
      <button className='App__clickButton' onClick={event => this.addClick()}>
      You have clicked this button {this.state.clicks + ' '}
        {this.state.clicks === 1 ? 'time' : 'times'}
      </button>
    )
  }
}

export default Clicker
