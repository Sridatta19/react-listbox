
import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { alphaNumericProp } from './utils'

export const SelectableListItem = (props) => {
  let listStyle = classNames({
    'ms-elem-selectable': true,
    selected: props.isSelected
  })
  return (
    <ListItem listStyle={listStyle} {...props} />
  )
}

SelectableListItem.propTypes = {
  isSelected: PropTypes.bool
}

export const SelectedListItem = (props) => {
  let listStyle = classNames({
    'ms-elem-selection ms-selected': true,
    selected: props.isSelected
  })
  return (
    <ListItem listStyle={listStyle} {...props} />
  )
}

SelectedListItem.propTypes = {
  isSelected: PropTypes.bool
}

class ListItem extends Component {

  state = {
    lStyle: this.props.listStyle
  }

  onListClick = () => {
    const { value, isSelected, onSelect } = this.props
    const bindObject = {}
    bindObject[value] = isSelected
    onSelect(bindObject)
  }

  onMouseEnter = () => {
    this.setState({ lStyle: classNames(this.props.listStyle, { selected: true }) })
  }

  onMouseLeave = () => {
    this.setState({ lStyle: this.props.listStyle })
  }

  render() {
    const { label } = this.props
    const { lStyle } = this.state
    return (
      <li
        className={lStyle} onClick={this.onListClick}
        onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
      >
        <span>{label}</span>
      </li>
    )
  }
}

ListItem.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  listStyle: PropTypes.string,
  value: alphaNumericProp
}
