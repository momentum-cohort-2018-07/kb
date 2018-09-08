import React from 'react'
import PropTypes from 'prop-types'
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

StudentRow.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    scores: PropTypes.object
  }).isRequired,
  assignments: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
}

export default StudentRow
