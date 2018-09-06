import React from 'react'
import { letterGrade, average } from './util'

class StudentRow extends React.Component {
  render () {
    const { student, assignments, onClick } = this.props

    const studentAverage = Math.round(average(Object.values(student.scores)))
    return (
      <tr>
        <td><a onClick={onClick}>{student.name}</a></td>
        {assignments.map((assignmentName, idx) => (
          <td key={idx}>{student.scores[assignmentName]}</td>
        ))}
        <td>{studentAverage} ({letterGrade(studentAverage)})</td>
      </tr>
    )
  }
}

export default StudentRow
