import React from 'react'
import StudentView from './StudentView'
import GradebookView from './GradebookView'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentStudent: null,
      assignments: [
        'Quiz 1',
        'Essay 1',
        'Quiz 2',
        'Midterm',
        'Essay 2',
        'Final'
      ],
      students: [
        {
          'id': 'cadence-smith',
          'name': 'Cadence Smith',
          'scores': {
            'Quiz 1': 91,
            'Essay 1': 92,
            'Quiz 2': 93,
            'Midterm': 94,
            'Essay 2': 95,
            'Final': 96
          }
        },
        {
          'id': 'morgan-davis',
          'name': 'Morgan Davis',
          'scores': {
            'Quiz 1': 81,
            'Essay 1': 82,
            'Quiz 2': 83,
            'Midterm': 84,
            'Final': 86
          }
        },
        {
          'id': 'carter-willis',
          'name': 'Carter Willis',
          'scores': {
            'Quiz 1': 91,
            'Essay 1': 92,
            'Quiz 2': 93,
            'Midterm': 94,
            'Essay 2': 95,
            'Final': 96
          }
        },
        {
          'id': 'ariel-kim',
          'name': 'Ariel Kim',
          'scores': {
            'Quiz 1': 91,
            'Essay 1': 92,
            'Quiz 2': 93,
            'Midterm': 94,
            'Essay 2': 95,
            'Final': 96
          }
        },
        {
          'id': 'teagan-cruz',
          'name': 'Teagan Cruz',
          'scores': {
            'Quiz 1': 91,
            'Essay 1': 92,
            'Quiz 2': 93,
            'Midterm': 94,
            'Essay 2': 95,
            'Final': 96
          }
        }
      ]
    }
  }

  studentIds () {
    return this.state.students.map(student => student.id)
  }

  setCurrentStudent (studentId) {
    this.setState({
      currentStudent: studentId
    })
  }

  changeAssignmentScore (studentId, assignmentName, score) {
    const student = this.state.students.find(student => student.id === studentId)
    student.scores[assignmentName] = score
    this.setState({
      students: this.state.students
    })
  }

  render () {
    let currentView

    if (this.state.currentStudent) {
      const student = this.state.students.find(student => student.id === this.state.currentStudent)
      const assignments = this.state.assignments
      currentView = <StudentView
        student={student}
        assignments={assignments}
        changeAssignmentScore={(assignmentName, score) =>
          this.changeAssignmentScore(student.id, assignmentName, score)}
        setCurrentStudent={(id) => this.setCurrentStudent(id)} />
    } else {
      currentView = <GradebookView
        students={this.state.students}
        assignments={this.state.assignments}
        setCurrentStudent={(id) => this.setCurrentStudent(id)} />
    }

    return (
      <section className='section App'>
        <div className='container'>
          {currentView}
        </div>
      </section>
    )
  }
}

export default App
