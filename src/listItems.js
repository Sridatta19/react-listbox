
import React, { PropTypes } from 'react'
import { alphaNumericProp } from './utils'

export const SelectableListItem = (props) => {
  let listStyle = 'ms-elem-selectable'
  if (props.isSelected) {
    listStyle += ' selected'
  }
  return (
    <ListItem listStyle={listStyle} {...props} />
  )
}

SelectableListItem.propTypes = {
  isSelected: PropTypes.bool
}

export const SelectedListItem = (props) => {
  let listStyle = 'ms-elem-selection ms-selected'
  if (props.isSelected) {
    listStyle += ' selected'
  }
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
