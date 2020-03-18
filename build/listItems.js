"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedListItem = exports.SelectableListItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SelectableListItem = function SelectableListItem(props) {
  var isSelected = props.isSelected;
  var listStyle = "ms-elem-selectable";

  if (isSelected) {
    listStyle += " selected";
  }

  return _react["default"].createElement(ListItem, _extends({
    listStyle: listStyle
  }, props));
};

exports.SelectableListItem = SelectableListItem;

var SelectedListItem = function SelectedListItem(props) {
  var isSelected = props.isSelected;
  var listStyle = "ms-elem-selection ms-selected";

  if (isSelected) {
    listStyle += " selected";
  }

  return _react["default"].createElement(ListItem, _extends({
    listStyle: listStyle
  }, props));
};

exports.SelectedListItem = SelectedListItem;

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
    onClick: onListClick,
    role: "presentation"
  }, _react["default"].createElement("span", null, label));
};