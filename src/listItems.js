
import React, { PropTypes } from 'react'
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

const ListItem = ({ label, value, isSelected, onSelect, listStyle }) => {
  const onListClick = () => {
    const bindObject = {}
    bindObject[value] = isSelected
    onSelect(bindObject)
  }
  return (
    <li className={listStyle} onClick={onListClick}>
      <span>{label}</span>
    </li>
  )
}

ListItem.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  listStyle: PropTypes.string,
  value: alphaNumericProp
}
