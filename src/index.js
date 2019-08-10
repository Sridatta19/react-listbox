
import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import { SelectionPanel, SelectionPanel2 } from './selectionPanels'
import { SelectableListItem, SelectedListItem } from './listItems'
import {
  updateValueInCollection,
  removeValueInCollection,
  moveLeftToRight,
  moveRightToLeft,
  moveVertically
} from './utils'

class DoubleListBox extends Component {

  state = {
    leftOptions: this.props.options.map(
      (option) => {
        if (R.contains(option.value, this.props.selected)) {
          return R.set(R.lensProp('hidden'), true, option)
        }
        return option
      }
    ),
    rightOptions: this.props.options.filter(
      option => R.contains(option.value, this.props.selected)
    ),
    leftSearchTerm: '',
    rightSearchTerm: ''
  }

  static defaultProps = {
    selected: []
  }

  static propTypes = {
    options: PropTypes.array,
    selected: PropTypes.array,
    onChange: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    const { options, selected } = nextProps
    if (R.isEmpty(this.state.leftOptions) && R.isEmpty(this.state.rightOptions)) {
      this.setState({
        leftOptions: options.map(
          (option) => {
            if (R.contains(option.value, this.props.selected)) {
              return R.set(R.lensProp('hidden'), true, option)
            }
            return option
          }
        ),
        rightOptions: options.filter(
          option => R.contains(option.value, selected)
        )
      })
    }
  }

  onLeftSelect = (obj) => {
    this.handleSelectedItem(obj, 'leftOptions')
  }

  onRightSelect = (obj) => {
    this.handleSelectedItem(obj, 'rightOptions')
  }

  handleChange = (rightOptions) => {
    const { onChange } = this.props
    if (onChange) {
      let selectedValues = R.map(R.prop('value'), rightOptions)
      onChange(selectedValues)
    }
  }

  handleSelectedItem = (obj, stateLabel) => {
    const newState = {}
    const value = R.keys(obj)[0]
    if (obj[value]) {
      newState[stateLabel] = removeValueInCollection(+value, this.state[stateLabel])
    } else {
      newState[stateLabel] = updateValueInCollection(+value, this.state[stateLabel])
    }
    this.setState(newState)
  }

  moveRight = () => {
    const newState = moveLeftToRight(this.state)
    this.setState(newState)
    this.handleChange(newState.rightOptions)
  }

  moveLeft = () => {
    const newState = moveRightToLeft(this.state)
    this.setState(newState)
    this.handleChange(newState.rightOptions)
  }

  moveVertically = (isDirectionUpward) => {
    const newRightOptions = moveVertically(isDirectionUpward, this.state)
    this.setState({ rightOptions: newRightOptions })
    this.handleChange(newRightOptions)
  }

  moveUp = () => {
    this.moveVertically(true)
  }

  moveDown = () => {
    this.moveVertically(false)
  }

  moveTop = () => {
    const rightOptions = R.concat(
      R.filter(R.propEq('isSelected', true), this.state.rightOptions),
      R.filter(R.propEq('isSelected', undefined), this.state.rightOptions)
    )
    this.setState({ rightOptions });
    this.handleChange(rightOptions);
  }

  moveBottom = () => {
    const rightOptions = R.concat(
      R.filter(R.propEq('isSelected', undefined), this.state.rightOptions),
      R.filter(R.propEq('isSelected', true), this.state.rightOptions)
    )
    this.setState({ rightOptions });
    this.handleChange(rightOptions);
  }

  leftChange = (event) => {
    this.setState({ leftSearchTerm: event.target.value })
  }

  rightChange = (event) => {
    this.setState({ rightSearchTerm: event.target.value })
  }

  onKeyDown = () => {

  }

  render() {
    const { leftOptions, rightOptions, leftSearchTerm, rightSearchTerm } = this.state
    return (
      <div className="ms-container" id="ms-pre-selected-options">
        <div className="ms-selectable">
          <input type="text" className="search-input" onChange={this.leftChange} autoComplete="off" placeholder="Search" />
          <ul className="ms-list" tabIndex="-1" onKeyDown={this.onKeyDown}>
            {leftOptions
              .filter(lo => !lo.hidden === true)
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
          moveUp={this.moveUp} moveDown={this.moveDown}
        />
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
    )
  }
}

export default DoubleListBox
