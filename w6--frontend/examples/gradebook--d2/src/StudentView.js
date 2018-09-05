import React from 'react'
import { letterGrade, average } from './util'

class StudentView extends React.Component {
  gradeClassName (grade) {
    if (grade === 'C' || grade === 'D') {
      return 'has-background-warning'
    } else if (grade === 'F') {
      return 'has-background-danger'
    } else {
      return 'has-background-success'
    }
  }

  render () {
    let { name, scores, assignments, setCurrentStudent } = this.props
    let averageScore = average(Object.values(scores))
    return (
      <div className='App'>
        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-four-fifths'>
                <div><a onClick={() => setCurrentStudent(null)}>&lt; Back to Gradebook</a></div>
                <h1 className='title'>{name}</h1>
              </div>
              <div className='column'>
                <section className={`composite-grade has-text-white has-text-centered ${this.gradeClassName(letterGrade(averageScore))}`}>
                  <div className='is-size-1 has-text-weight-bold'>{letterGrade(averageScore)}</div>
                  <div className='is-size-3'>{averageScore}</div>
                </section>
              </div>
            </div>
            <section>
              <h2 className='title is-size-4'>Assignments</h2>
              {assignments.map((assignmentName, idx) => {
                return (
                  <div key={idx} className='columns'>
                    <div className='column is-four-fifths'>
                      {assignmentName}
                    </div>
                    <div className='column'>
                      <input type='number' className='input'
                        value={scores[assignmentName]} />
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

export default StudentView
