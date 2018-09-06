import React from 'react'
import PropTypes from 'prop-types'

class CalcButton extends React.Component {
  render () {
    let { label, type, width, action } = this.props

    let className = `Button Button--${type || 'number'}`
    let style = {}
    if (width) {
      style.gridColumnEnd = `span ${width}`
    }
    return (<button className={className} onClick={action} style={style}>{label}</button>)
  }
}

CalcButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  width: PropTypes.number,
  action: PropTypes.func.isRequired
}

export default CalcButton
