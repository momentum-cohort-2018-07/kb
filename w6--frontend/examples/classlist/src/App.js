import React, { Component } from 'react'
import cohort from './cohort.js'
import Button from './Button'

class App extends Component {
  render () {
    return (
      <section className='App section'>
        <div className='container'>
          <div className='cohort-results'>{cohort.map((student, idx) => {
            return (
              <Button student={student} key={idx} />
            )
          })}</div>
        </div>
      </section>
    )
  }
}

export default App
