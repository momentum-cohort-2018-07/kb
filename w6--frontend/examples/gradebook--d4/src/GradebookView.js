import React from 'react'
import PropTypes from 'prop-types'
import StudentRow from './StudentRow'

class GradebookView extends React.Component {
  render () {
    const { students, assignments, setCurrentStudent } = this.props
    return (
      <div className='GradebookView'>
        <h1 className='title'>Gradebook</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>Student</th>
              {assignments.map((assignment, idx) => <th key={idx}>{assignment}</th>)}
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) =>
              <StudentRow
                key={idx}
                student={student}
                assignments={assignments}
                onClick={() => setCurrentStudent(student.id)}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

GradebookView.propTypes = {
  changeStudentName: PropTypes.func,
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    scores: PropTypes.object
  })),
  assignments: PropTypes.arrayOf(PropTypes.string),
  setCurrentStudent: PropTypes.func
}

export default GradebookView
