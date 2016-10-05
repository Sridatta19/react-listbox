'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedListItem = exports.SelectableListItem = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectableListItem = exports.SelectableListItem = function SelectableListItem(_ref) {
  var label = _ref.label;
  var onSelect = _ref.onSelect;
  var value = _ref.value;
  var isSelected = _ref.isSelected;

  var listStyle = (0, _classnames2.default)({
    'ms-elem-selectable': true,
    selected: isSelected
  });
  var bindObject = {};
  bindObject[value] = isSelected;
  return _react2.default.createElement(
    'li',
    { className: listStyle, onClick: onSelect.bind(null, bindObject) },
    _react2.default.createElement(
      'span',
      null,
      label
    )
  );
};

var SelectedListItem = exports.SelectedListItem = function SelectedListItem(_ref2) {
  var label = _ref2.label;
  var onSelect = _ref2.onSelect;
  var value = _ref2.value;
  var isSelected = _ref2.isSelected;

  var listStyle = (0, _classnames2.default)({
    'ms-elem-selection ms-selected': true,
    selected: isSelected
  });
  var bindObject = {};
  bindObject[value] = isSelected;
  return _react2.default.createElement(
    'li',
    { className: listStyle, onClick: onSelect.bind(null, bindObject) },
    _react2.default.createElement(
      'span',
      null,
      label
    )
  );
};