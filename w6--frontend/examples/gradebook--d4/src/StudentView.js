import React from 'react'
import PropTypes from 'prop-types'
import { letterGrade, average } from './util'

class StudentView extends React.Component {
  constructor () {
    super()
    this.state = {
      hoveringOnName: false,
      editingName: false
    }
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

  toggleHovering (hovering) {
    console.log('toggleHovering', hovering)
    this.setState({ hoveringOnName: hovering })
  }

  toggleEditing (editing) {
    console.log('toggleEditing', editing)
    this.setState({ editingName: editing, hoveringOnName: false })
  }

  renderStudentName () {
    let { student, changeStudentName } = this.props

    if (this.state.editingName) {
      return (
        <input className='input is-size-3' type='text'
          value={student.name}
          onBlur={() => this.toggleEditing(false)}
          onChange={event => {
            changeStudentName(event.target.value)
          }} />
      )
    }
    return (<h1 className='title'
      onMouseEnter={() => this.toggleHovering(true)}
      onMouseOut={() => this.toggleHovering(false)}
      onDoubleClick={() => this.toggleEditing(true)}>
      {student.name}
      {this.state.hoveringOnName &&
        <span className='has-text-info is-size-5'> Double-click to edit</span>}
    </h1>)
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
                {this.renderStudentName()}
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
