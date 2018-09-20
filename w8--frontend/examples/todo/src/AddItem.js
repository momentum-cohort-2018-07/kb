import React from 'react'

class AddItem extends React.Component {
  constructor () {
    super()
    this.state = {
      text: ''
    }
    this.addItem = this.addItem.bind(this)
  }

  addItem () {
    this.props.addItem(this.state.text)
    this.setState({ text: '' })
  }

  render () {
    return (
      <div className='AddItem'>
        <div className='field'>
          <div className='control'>
            <input
              type='text'
              className='input'
              placeholder='Add a new todo'
              value={this.state.text}
              onKeyDown={event => {
                if (event.keyCode === 13) { this.addItem() }
              }}
              onChange={event => this.setState({ text: event.target.value })} />
          </div>
        </div>
      </div>
    )
  }
}

export default AddItem
