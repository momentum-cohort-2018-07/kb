import React from 'react'
import './App.css'

import Clicker from './Clicker'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <h1>Clicker</h1>
        <div>
          <Clicker />
          <Clicker />
        </div>
      </div>
    )
  }
}

export default App
