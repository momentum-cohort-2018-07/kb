import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import EditItem from './EditItem'

class Item extends React.Component {
  constructor () {
    super()
    this.state = {
      editing: false
    }
    this.editItem = this.editItem.bind(this)
  }

  editItem (id, newText) {
    this.props.editItem(id, newText)
    this.setState({ editing: false })
  }

  render () {
    const { item, completeItem, deleteItem } = this.props
    if (this.state.editing) {
      return <EditItem item={item} editItem={this.editItem} />
    }
    return (
      <div className='Item' onDoubleClick={event => this.setState({ editing: true })}>
        <input type='checkbox' value={item.completed} onChange={event => completeItem(item.id)} />
        &nbsp;
        <span className={classnames({ 'is-size-5': true, 'completed': item.completed })}>{item.text}</span>
        &nbsp;
        <a className='delete is-small' style={{ marginTop: '7px' }} onClick={event => deleteItem(item.id)} />
      </div>
    )
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool
  }).isRequired,
  completeItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired
}

export default Item
