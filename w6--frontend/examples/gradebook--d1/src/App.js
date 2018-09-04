import React, { Component } from 'react'

class App extends Component {
  constructor () {
    super()

    this.state = {
      studentName: 'Zara Singh',
      assignments: [
        { name: 'Quiz 1', score: 95 },
        { name: 'Comparative Essay', score: 90 },
        { name: 'Quiz 2', score: 92 }
      ]
    }
  }

  changeAssignmentScore (idx, score) {
    const assignments = this.state.assignments
    assignments[idx].score = parseInt(score, 10)
    this.setState({
      assignments: assignments
    })
  }

  gradeClassName (grade) {
    if (grade === 'C' || grade === 'D') {
      return 'has-background-warning'
    } else if (grade === 'F') {
      return 'has-background-danger'
    } else {
      return 'has-background-success'
    }
  }

  letterGrade (score) {
    if (isNaN(score)) { return '' }

    if (score < 60) {
      return 'F'
    } else if (score < 70) {
      return 'D'
    } else if (score < 80) {
      return 'C'
    } else if (score < 90) {
      return 'B'
    } else {
      return 'A'
    }
  }

  averageScore () {
    let sum = 0
    for (let assignment of this.state.assignments) {
      sum += assignment.score
    }
    const average = Math.round(sum / this.state.assignments.length)
    if (isNaN(average)) {
      return ''
    } else {
      return average
    }
  }

  render () {
    return (
      <div className='App'>
        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-four-fifths'>
                <h1 className='title'>{this.state.studentName}</h1>
              </div>
              <div className='column'>
                <section className={`composite-grade has-text-white has-text-centered ${this.gradeClassName(this.letterGrade(this.averageScore()))}`}>
                  <div className='is-size-1 has-text-weight-bold'>{this.letterGrade(this.averageScore())}</div>
                  <div className='is-size-3'>{this.averageScore()}</div>
                </section>
              </div>
            </div>
            <section>
              <h2 className='title is-size-4'>Assignments</h2>
              {this.state.assignments.map((assignment, idx) => {
                return (
                  <div key={idx} className='columns'>
                    <div className='column is-four-fifths'>
                      {assignment.name}
                    </div>
                    <div className='column'>
                      <input type='number' className='input'
                        onChange={event => this.changeAssignmentScore(idx, event.target.value)}
                        value={assignment.score} />
                    </div>
                  </div>
                )
              })}
            </section>
          </div>
        </section>
      </div>
    )
  }
}
export default App
