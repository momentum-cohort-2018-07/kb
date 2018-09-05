import React from 'react'
import { letterGrade, average } from './util'

class StudentRow extends React.Component {
  render () {
    const { name, scores, assignments, onClick } = this.props
    // equivalent to:
    // const name = this.props.name
    // const scores = this.props.scores
    // const assignments = this.props.assignments

    const studentAverage = Math.round(average(Object.values(scores)))
    return (
      <tr>
        <td><a onClick={onClick}>{name}</a></td>
        {assignments.map((assignmentName, idx) => (
          <td key={idx}>{scores[assignmentName]}</td>
        ))}
        <td>{studentAverage} ({letterGrade(studentAverage)})</td>
      </tr>
    )
  }
}

export default StudentRow
