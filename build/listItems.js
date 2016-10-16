'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedListItem = exports.SelectableListItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectableListItem = exports.SelectableListItem = function SelectableListItem(props) {
  var listStyle = (0, _classnames2.default)({
    'ms-elem-selectable': true,
    selected: props.isSelected
  });
  return _react2.default.createElement(ListItem, _extends({ listStyle: listStyle }, props));
};

SelectableListItem.propTypes = {
  isSelected: _react.PropTypes.bool
};

var SelectedListItem = exports.SelectedListItem = function SelectedListItem(props) {
  var listStyle = (0, _classnames2.default)({
    'ms-elem-selection ms-selected': true,
    selected: props.isSelected
  });
  return _react2.default.createElement(ListItem, _extends({ listStyle: listStyle }, props));
};

SelectedListItem.propTypes = {
  isSelected: _react.PropTypes.bool
};

var ListItem = function ListItem(_ref) {
  var label = _ref.label;
  var onSelect = _ref.onSelect;
  var listStyle = _ref.listStyle;
  var value = _ref.value;
  var isSelected = _ref.isSelected;

  var bindObject = {};
  bindObject[value] = isSelected;
  var onListClick = function onListClick() {
    return onSelect(bindObject);
  };
  return _react2.default.createElement(
    'li',
    { className: listStyle, onClick: onListClick },
    _react2.default.createElement(
      'span',
      null,
      label
    )
  );
};

ListItem.propTypes = {
  label: _react.PropTypes.string,
  isSelected: _react.PropTypes.bool,
  onSelect: _react.PropTypes.func,
  listStyle: _react.PropTypes.string,
  value: _utils.alphaNumericProp
};