import React, { Component } from 'react'
import CalcButton from './CalcButton'
import math from 'mathjs'

class App extends Component {
  constructor () {
    super()
    this.buttons = [
      { label: 'C',
        width: 3,
        type: 'operator',
        action: () => this.setState({ display: '' })
      },
      { label: '/', type: 'operator' },
      { label: '7' },
      { label: '8' },
      { label: '9' },
      { label: '*', type: 'operator' },
      { label: '4' },
      { label: '5' },
      { label: '6' },
      { label: '-', type: 'operator' },
      { label: '1' },
      { label: '2' },
      { label: '3' },
      { label: '+',
        type: 'operator',
        action: () => {
          this.setState((state) => {
            const lastChar = state.display.slice(-1)
            if (lastChar === '+' || lastChar === '-') { // *, /, etc
              return state
            } else {
              return {
                display: state.display + '+'
              }
            }
          })
        }
      },
      { label: '0' },
      { label: '.' },
      { label: '%',
        type: 'operator',
        action: () => {
          const result = math.eval(this.state.display) * 0.01
          this.setState({
            display: result,
            history: this.state.history.concat(`(${this.state.display})% = ${result}`)
          })
        }
      },
      { label: '=',
        type: 'operator',
        action: () => {
          const result = math.eval(this.state.display)
          this.setState({
            display: result,
            history: this.state.history.concat(`${this.state.display} = ${result}`)
          })
        }
      }
    ]

    this.state = {
      display: '',
      history: []
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='Calculator'>
          <div className='Display' style={{ gridColumnEnd: 'span 4' }}>
            {this.state.display}
          </div>
          {this.buttons.map(button => {
            let action = button.action
            if (!action) {
              action = () => this.setState((state) => ({ display: state.display + button.label }))
            }

            return <CalcButton key={button.label}
              label={button.label}
              type={button.type}
              width={button.width}
              action={action} />
            // same as <CalcButton action={action} {...button} />
          })}
        </div>
        <div className='History'>
          {this.state.history.map((h, idx) => <div key={idx}>{h}</div>)}
        </div>
      </div>
    )
  }
}

export default App
