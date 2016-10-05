
import React from 'react';
import classNames from 'classnames'

export const SelectableListItem = ({ label, onSelect, value, isSelected }) => {
  let listStyle = classNames({
      'ms-elem-selectable': true,
      selected: isSelected
    })
  const bindObject = {}
  bindObject[value] = isSelected
  return (
    <li className={listStyle} onClick={onSelect.bind(null, bindObject)}>
      <span>{label}</span>
    </li>
  )
}

export const SelectedListItem = ({ label, onSelect, value, isSelected }) => {
  let listStyle = classNames({
      'ms-elem-selection ms-selected': true,
      selected: isSelected
    })
  const bindObject = {}
  bindObject[value] = isSelected
  return (
    <li className={listStyle} onClick={onSelect.bind(null, bindObject)}>
      <span>{label}</span>
    </li>
  )
}
