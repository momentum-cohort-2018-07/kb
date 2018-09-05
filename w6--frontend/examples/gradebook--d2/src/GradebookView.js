import React from 'react'
import StudentRow from './StudentRow'

class GradebookView extends React.Component {
  render () {
    const { students, assignments, setCurrentStudent } = this.props
    const studentNames = Object.keys(students)
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
            {studentNames.map((studentName, idx) =>
              <StudentRow
                key={idx}
                name={studentName}
                scores={students[studentName].scores}
                assignments={assignments}
                onClick={() => setCurrentStudent(studentName)}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default GradebookView
