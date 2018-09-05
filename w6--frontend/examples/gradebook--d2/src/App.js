import React from 'react'
import StudentRow from './StudentRow'
import { letterGrade, average } from './util'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      assignments: [
        'Quiz 1',
        'Essay 1',
        'Quiz 2',
        'Midterm',
        'Essay 2',
        'Final'
      ],
      students: {
        'Cadence Smith': { scores: {
          'Quiz 1': 91,
          'Essay 1': 92,
          'Quiz 2': 93,
          'Midterm': 94,
          'Essay 2': 95,
          'Final': 96
        } },
        'Morgan Willis': { scores: {
          'Quiz 1': 81,
          'Essay 1': 82,
          'Quiz 2': 83,
          'Midterm': 84,
          'Essay 2': 85,
          'Final': 86
        } },
        'Carter Davis': { scores: {
          'Quiz 1': 91,
          'Essay 1': 92,
          'Quiz 2': 93,
          'Midterm': 94,
          'Essay 2': 95,
          'Final': 96
        } },
        'Ariel Kim': { scores: {
          'Quiz 1': 91,
          'Essay 1': 92,
          'Quiz 2': 93,
          'Midterm': 94,
          'Essay 2': 95,
          'Final': 96
        } },
        'Teagan Cruz': { scores: {
          'Quiz 1': 91,
          'Essay 1': 92,
          'Quiz 2': 93,
          'Midterm': 94,
          'Essay 2': 95,
          'Final': 96
        } }
      }
    }
  }

  studentNames () {
    return Object.keys(this.state.students)
  }

  render () {
    return (
      <section className='section App'>
        <div className='container'>
          <h1 className='title'>Gradebook</h1>
          <table className='table'>
            <thead>
              <tr>
                <th>Student</th>
                {this.state.assignments.map(assignment => <th>{assignment}</th>)}
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {this.studentNames().map(studentName =>
                <StudentRow
                  name={studentName}
                  scores={this.state.students[studentName].scores}
                  assignments={this.state.assignments} />
              )}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}

export default App
