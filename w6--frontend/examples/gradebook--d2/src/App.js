import React from 'react'
import StudentView from './StudentView'
import GradebookView from './GradebookView'
import request from 'superagent'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      error: false,
      currentStudent: null,
      assignments: [],
      students: []
    }
  }

  componentDidMount () {
    request.get('http://localhost:4000/assignments')
      .then(res => {
        this.setState({
          assignments: res.body
        })
      })

    request.get('http://localhost:4000/students')
      .then(res => {
        this.setState({
          students: res.body
        })
      })
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
    request.put(`http://localhost:4000/students/${studentId}`)
      .send(student)
      .then(res => {
        if (!res.ok) {
          this.setState({ error: true })
        }
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
