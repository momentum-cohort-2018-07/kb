import React from 'react'
import classnames from 'classnames'

class Button extends React.Component {
  constructor () {
    super()
    this.state = {
      buttonClicked: false
    }
  }

  handleClick () {
    this.setState(state => ({ buttonClicked: !state.buttonClicked }))
  }

  render () {
    const student = this.props.student
    return (<div className='student'>
      <button className={
        classnames('button', {
          'is-dark': this.state.buttonClicked,
          'is-light': !this.state.buttonClicked
        })
      } onClick={() => this.handleClick()}>{student}</button>
    </div>)
  }
}

export default Button
