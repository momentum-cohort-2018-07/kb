import React, { Component } from 'react'
import nanoid from 'nanoid'
import update from 'immutability-helper'
import 'bulma/css/bulma.css'

import Item from './Item'
import AddItem from './AddItem'

class App extends Component {
  constructor () {
    super()
    this.state = {
      items: []
    }

    this.addItem = this.addItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.completeItem = this.completeItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  addItem (text) {
    const newItem = {
      id: nanoid(),
      text: text,
      completed: false
    }

    // BAD -- use the form of setState that takes a function
    // instead whenever the new state relies on the old state
    // this.setState({
    //   items: this.state.items.concat(newItem)
    // })

    // GOOD
    this.setState(state => (
      { items: state.items.concat(newItem) }
    ))
  }

  completeItem (id) {
    this.setState(state => {
      const { items } = state
      const idx = items.findIndex(item => item.id === id)
      if (idx !== -1) {
        const newItems = update(items, {
          [idx]: { $toggle: ['completed'] }
        })
        return {
          items: newItems
        }
      }
    })
  }

  editItem (id, newText) {
    this.updateItem(id, 'text', newText)
  }

  updateItem (id, field, newValue) {
    this.setState(state => {
      const { items } = state
      const idx = items.findIndex(item => item.id === id)
      if (idx !== -1) {
        const newItems = update(items, {
          [idx]: { [field]: { $set: newValue } }
        })
        return {
          items: newItems
        }
      }
    })
  }

  deleteItem (id) {
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id)
    }))
  }

  componentDidMount () {
    this.addItem('Take out the papers')
    this.addItem('And the trash')
  }

  render () {
    return (
      <div className='App'>
        <section className='section'>
          <div className='container'>
            <AddItem addItem={this.addItem} />
            {this.state.items.map(item =>
              <Item key={item.id} item={item} completeItem={this.completeItem} deleteItem={this.deleteItem} editItem={this.editItem} />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default App
