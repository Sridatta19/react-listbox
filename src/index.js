import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LeftSelectionPanel, RightSelectionPanel } from './panels';
import { SelectableListItem, SelectedListItem } from './listItems';
import {
  updateValueInCollection,
  removeValueInCollection,
  moveLeftToRight,
  moveRightToLeft,
  moveVertically,
  transformOption,
} from './utils';

import '../public/app.css';
import '../public/ionicons.css';

const R = require('ramda');

const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: evt => setValue(evt.target.value),
  };
};

const DoubleListBox = ({ options, selected: preSelected, onChange }) => {
  const [leftOptions, setLeftOptions] = useState(
    options.map(transformOption(preSelected))
  );
  const [rightOptions, setRightOptions] = useState(
    options.filter(option => R.contains(option.value, preSelected))
  );
  const rightSearchTerm = useInputValue('');
  const leftSearchTerm = useInputValue('');
  useEffect(() => {
    if (R.isEmpty(leftOptions) && R.isEmpty(rightOptions)) {
      setLeftOptions(options.map(transformOption(preSelected)));
      setRightOptions(
        options.filter(option => R.contains(option.value, preSelected))
      );
    } else if (options.length === 0) {
      setLeftOptions([]);
      setRightOptions([]);
    }
  }, [preSelected, options, rightOptions, leftOptions]);

  const onLeftSelect = obj => {
    let newLeftOptions;
    const value = R.keys(obj)[0];
    if (obj[value]) {
      newLeftOptions = removeValueInCollection(value, leftOptions);
    } else {
      newLeftOptions = updateValueInCollection(value, leftOptions);
    }
    setLeftOptions(newLeftOptions);
  };

  const onRightSelect = obj => {
    let newRightOptions;
    const value = R.keys(obj)[0];
    if (obj[value]) {
      newRightOptions = removeValueInCollection(value, rightOptions);
    } else {
      newRightOptions = updateValueInCollection(value, rightOptions);
    }
    setRightOptions(newRightOptions);
  };

  const handleChange = modifiedOptions => {
    if (onChange) {
      const selectedValues = R.map(R.prop('value'), modifiedOptions);
      onChange(selectedValues);
    }
  };

  const moveRight = () => {
    const { newLeftOptions, newRightOptions } = moveLeftToRight(
      leftOptions,
      rightOptions
    );
    setLeftOptions(newLeftOptions);
    setRightOptions(newRightOptions);
    handleChange(newRightOptions);
  };

  const moveLeft = () => {
    const { newLeftOptions, newRightOptions } = moveRightToLeft(
      leftOptions,
      rightOptions
    );
    setLeftOptions(newLeftOptions);
    setRightOptions(newRightOptions);
    handleChange(newRightOptions);
  };

  const moveUp = () => {
    const updatedRightOptions = moveVertically(true, rightOptions);
    setRightOptions(updatedRightOptions);
    handleChange(updatedRightOptions);
  };

  const moveDown = () => {
    const updatedRightOptions = moveVertically(false, rightOptions);
    setRightOptions(updatedRightOptions);
    handleChange(updatedRightOptions);
  };

  const moveTop = () => {
    const updatedRightOptions = R.concat(
      R.filter(R.propEq('isSelected', true), rightOptions),
      R.filter(R.propEq('isSelected', undefined), rightOptions)
    );
    setRightOptions(updatedRightOptions);
    handleChange(updatedRightOptions);
  };

  const moveBottom = () => {
    const updatedRightOptions = R.concat(
      R.filter(R.propEq('isSelected', undefined), rightOptions),
      R.filter(R.propEq('isSelected', true), rightOptions)
    );
    setRightOptions(updatedRightOptions);
    handleChange(updatedRightOptions);
  };

  const onKeyDown = () => {};

  return (
    <div className="ms-container" id="ms-pre-selected-options">
      <div className="ms-selectable">
        <input
          type="text"
          className="search-input"
          {...leftSearchTerm}
          autoComplete="off"
          placeholder="Search"
        />
        <ul
          className="ms-list"
          tabIndex="-1"
          onKeyDown={onKeyDown}
          role="presentation"
        >
          {leftOptions
            .filter(lo => !lo.hidden === true)
            .filter(
              lo =>
                lo.label
                  .toLowerCase()
                  .indexOf(leftSearchTerm.value.toLowerCase()) !== -1
            )
            .map(o => (
              <SelectableListItem
                key={o.value}
                value={o.value}
                label={o.label}
                onSelect={onLeftSelect}
                isSelected={o.isSelected}
              />
            ))}
        </ul>
      </div>
      <LeftSelectionPanel moveRight={moveRight} moveLeft={moveLeft} />
      <RightSelectionPanel
        moveTop={moveTop}
        moveBottom={moveBottom}
        moveUp={moveUp}
        moveDown={moveDown}
      />
      <div className="ms-selection">
        <input
          type="text"
          className="search-input"
          {...rightSearchTerm}
          autoComplete="off"
          placeholder="Search"
        />
        <ul className="ms-list" tabIndex="-1">
          {rightOptions
            .filter(
              ro =>
                ro.label
                  .toLowerCase()
                  .indexOf(rightSearchTerm.value.toLowerCase()) !== -1
            )
            .map(o => (
              <SelectedListItem
                key={o.value}
                value={o.value}
                label={o.label}
                onSelect={onRightSelect}
                isSelected={o.isSelected}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

DoubleListBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }).isRequired
  ),
  selected: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
};

export default DoubleListBox;
