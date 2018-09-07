import React from 'react'
import PropTypes from 'prop-types'
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
    let { student, assignments, setCurrentStudent, changeAssignmentScore } = this.props
    let averageScore = Math.round(average(Object.values(student.scores)))
    return (
      <div className='App'>
        <section className='section'>
          <div className='container'>
            <div className='columns'>
              <div className='column is-four-fifths'>
                <div><a onClick={() => setCurrentStudent(null)}>&lt; Back to Gradebook</a></div>
                <h1 className='title'>{student.name}</h1>
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
                        value={student.scores[assignmentName]}
                        onChange={event => {
                          changeAssignmentScore(assignmentName, parseInt(event.target.value, 10))
                        }} />
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

StudentView.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    scores: PropTypes.object
  }).isRequired,
  assignments: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentStudent: PropTypes.func.isRequired,
  changeAssignmentScore: PropTypes.func.isRequired
}

export default StudentView
