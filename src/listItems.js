import React from 'react';
import PropTypes from 'prop-types';
import { alphaNumericProp } from './utils';

export const SelectableListItem = props => {
  const { isSelected } = props;
  let listStyle = 'ms-elem-selectable';
  if (isSelected) {
    listStyle += ' selected';
  }
  return <ListItem listStyle={listStyle} {...props} />;
};

SelectableListItem.propTypes = {
  isSelected: PropTypes.bool,
};

export const SelectedListItem = props => {
  const { isSelected } = props;
  let listStyle = 'ms-elem-selection ms-selected';
  if (isSelected) {
    listStyle += ' selected';
  }
  return <ListItem listStyle={listStyle} {...props} />;
};

SelectedListItem.propTypes = {
  isSelected: PropTypes.bool,
};

const ListItem = ({ label, value, isSelected, onSelect, listStyle }) => {
  const onListClick = () => {
    const bindObject = {};
    bindObject[value] = isSelected;
    onSelect(bindObject);
  };
  return (
    <li className={listStyle} onClick={onListClick} role="presentation">
      <span>{label}</span>
    </li>
  );
};

ListItem.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  listStyle: PropTypes.string,
  value: alphaNumericProp,
};
