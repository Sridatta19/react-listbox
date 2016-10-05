
import React, { Component } from 'react';
import R from 'ramda'
import '../public/app.css';
import '../public/ionicons.min.css';
import { SelectionPanel, SelectionPanel2 } from './selectionPanels'
import { SelectableListItem, SelectedListItem } from './listItems'
import {
  updateValueInCollection,
  removeValueInCollection,
  filterAndTransformSelected,
  swap,
  retrieveValues
} from './utils'

class DoubleListBox extends Component {

  state = {
    leftOptions: this.props.options,
    rightOptions: [],
    leftSearchTerm: '',
    rightSearchTerm: ''
  }

  onLeftSelect = (obj) => {
    this.handleSelectedItem(obj, 'leftOptions')
  }

  onRightSelect = (obj) => {
    this.handleSelectedItem(obj, 'rightOptions')
  }

  handleChange = () => {
    const { rightOptions } = this.state
    let selectedValues = retrieveValues(rightOptions)
    this.props.onChange(selectedValues)
  }

  handleSelectedItem = (obj, stateLabel) => {
    const newState = {}
    const value = R.keys(obj)[0];
    if (obj[value]) {
      newState[stateLabel] = removeValueInCollection(+value, this.state[stateLabel])
    } else {
      newState[stateLabel] = updateValueInCollection(+value, this.state[stateLabel])
    }
    this.setState(newState)
  }

  moveLaterally = (fromLabel, toLabel) => {
    const newState = {}
    newState[fromLabel] = R.filter(R.propEq('isSelected', undefined), this.state[fromLabel])
    newState[toLabel] = R.concat(
      filterAndTransformSelected(this.state[fromLabel]),
      this.state[toLabel]
    )
    this.setState(newState)
  }

  moveRight = () => {
    this.moveLaterally('leftOptions', 'rightOptions')
  }

  moveLeft = () => {
    this.moveLaterally('rightOptions', 'leftOptions')
  }

  moveVertically = (isDirectionUpward) => {
    const { rightOptions } = this.state
    let selectedValues = retrieveValues(rightOptions)
    let newRightOptions = R.clone(rightOptions)
    R.forEach(
      value => {
        let index = R.findIndex(R.propEq('value', value), newRightOptions)
        if (isDirectionUpward) {
          // eslint-disable-next-line
          index == 0 ? null : swap(index, index - 1)(newRightOptions)
        } else {
          // eslint-disable-next-line
          ++index === rightOptions.length ? null : swap(index, index - 1)(newRightOptions)
        }
      },
      selectedValues
    )
    this.setState({ rightOptions: newRightOptions })
  }

  moveUp = () => {
    this.moveVertically(true);
  }

  moveDown = () => {
    this.moveVertically(false);
  }

  moveTop = () => {
    this.setState({ rightOptions: R.concat(
        R.filter(R.propEq('isSelected', true), this.state.rightOptions),
        R.filter(R.propEq('isSelected', undefined), this.state.rightOptions)
      )
    })
  }

  moveBottom = () => {
    this.setState({ rightOptions: R.concat(
        R.filter(R.propEq('isSelected', undefined), this.state.rightOptions),
        R.filter(R.propEq('isSelected', true), this.state.rightOptions)
      )
    })
  }

  leftChange = (event) => {
    this.setState({ leftSearchTerm: event.target.value })
  }

  rightChange = (event) => {
    this.setState({ rightSearchTerm: event.target.value })
  }

  render() {
    const { leftOptions, rightOptions, leftSearchTerm, rightSearchTerm } = this.state
    return (
      <div className="ms-container" id="ms-pre-selected-options">
          <div className="ms-selectable">
              <input type="text" className="search-input" onChange={this.leftChange} autoComplete="off" placeholder="Search" />
              <ul className="ms-list" tabIndex="-1">
                  {leftOptions
                    .filter(lo => lo.label.toLowerCase().indexOf(leftSearchTerm.toLowerCase()) !== -1)
                    .map(
                      o => <SelectableListItem
                        key={o.value}
                        value={o.value}
                        label={o.label}
                        onSelect={this.onLeftSelect}
                        isSelected={o.isSelected}
                      />
                  )}
              </ul>
          </div>
          <SelectionPanel moveRight={this.moveRight} moveLeft={this.moveLeft} />
          <SelectionPanel2
            moveTop={this.moveTop} moveBottom={this.moveBottom}
            moveUp={this.moveUp} moveDown={this.moveDown} />
          <div className="ms-selection">
              <input type="text" className="search-input" onChange={this.rightChange} autoComplete="off" placeholder="Search" />
              <ul className="ms-list" tabIndex="-1">
                {rightOptions
                  .filter(ro => ro.label.toLowerCase().indexOf(rightSearchTerm.toLowerCase()) !== -1)
                  .map(
                    o => <SelectedListItem
                      key={o.value}
                      value={o.value}
                      label={o.label}
                      onSelect={this.onRightSelect}
                      isSelected={o.isSelected}
                    />
                )}
              </ul>
          </div>
      </div>
    );
  }
}

export default DoubleListBox;
