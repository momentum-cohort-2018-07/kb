import React from 'react'

class EditItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { text: props.item.text }
  }

  render () {
    const { item, editItem } = this.props

    return (
      <div className='EditItem'>
        <div className='field'>
          <div className='control'>
            <input
              type='text'
              className='input'
              placeholder='Add a new todo'
              value={this.state.text}
              onKeyDown={event => {
                if (event.keyCode === 27) {
                  editItem(item.id, item.text)
                }
                if (event.keyCode === 13) {
                  editItem(item.id, this.state.text)
                }
              }}
              onChange={event => this.setState({
                text: event.target.value
              })} />
          </div>
        </div>
      </div>
    )
  }
}

export default EditItem
