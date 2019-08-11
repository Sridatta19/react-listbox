"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedListItem = exports.SelectableListItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SelectableListItem = function SelectableListItem(props) {
  var listStyle = 'ms-elem-selectable';

  if (props.isSelected) {
    listStyle += ' selected';
  }

  return _react["default"].createElement(ListItem, _extends({
    listStyle: listStyle
  }, props));
};

exports.SelectableListItem = SelectableListItem;
SelectableListItem.propTypes = {
  isSelected: _react.PropTypes.bool
};

var SelectedListItem = function SelectedListItem(props) {
  var listStyle = 'ms-elem-selection ms-selected';

  if (props.isSelected) {
    listStyle += ' selected';
  }

  return _react["default"].createElement(ListItem, _extends({
    listStyle: listStyle
  }, props));
};

exports.SelectedListItem = SelectedListItem;
SelectedListItem.propTypes = {
  isSelected: _react.PropTypes.bool
};

var ListItem = function ListItem(_ref) {
  var label = _ref.label,
      value = _ref.value,
      isSelected = _ref.isSelected,
      onSelect = _ref.onSelect,
      listStyle = _ref.listStyle;

  var onListClick = function onListClick() {
    var bindObject = {};
    bindObject[value] = isSelected;
    onSelect(bindObject);
  };

  return _react["default"].createElement("li", {
    className: listStyle,
    onClick: onListClick
  }, _react["default"].createElement("span", null, label));
};

ListItem.propTypes = {
  label: _react.PropTypes.string,
  isSelected: _react.PropTypes.bool,
  onSelect: _react.PropTypes.func,
  listStyle: _react.PropTypes.string,
  value: _utils.alphaNumericProp
};