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

  setCurrentStudent (studentName) {
    this.setState({
      currentStudent: studentName
    })
  }

  changeAssignmentScore (studentName, assignmentName, score) {
    const student = this.state.students[studentName]
    student.scores[assignmentName] = score
    this.setState({
      students: this.state.students
    })
  }

  render () {
    let currentView

    if (this.state.currentStudent) {
      const name = this.state.currentStudent
      const scores = this.state.students[name].scores
      const assignments = this.state.assignments
      currentView = <StudentView
        name={name}
        scores={scores}
        assignments={assignments}
        changeAssignmentScore={(assignmentName, score) => this.changeAssignmentScore(name, assignmentName, score)}
        setCurrentStudent={(name) => this.setCurrentStudent(name)} />
    } else {
      currentView = <GradebookView
        students={this.state.students}
        assignments={this.state.assignments}
        setCurrentStudent={(name) => this.setCurrentStudent(name)} />
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
