import React from 'react'
import { letterGrade, average } from './util'

class StudentRow extends React.Component {
  render () {
    const { name, scores, assignments } = this.props
    // equivalent to:
    // const name = this.props.name
    // const scores = this.props.scores
    // const assignments = this.props.assignments

    const studentAverage = Math.round(average(Object.values(scores)))
    return (
      <tr>
        <td>{name}</td>
        {assignments.map(assignmentName => (
          <td>{scores[assignmentName]}</td>
        ))}
        <td>{studentAverage} ({letterGrade(studentAverage)})</td>
      </tr>
    )
  }
}

export default StudentRow
