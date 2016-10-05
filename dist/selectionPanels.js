'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionPanel2 = exports.SelectionPanel = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement('i', { className: 'icon ion-arrow-right-a' });

var _ref3 = _react2.default.createElement('i', { className: 'icon ion-arrow-left-a' });

var SelectionPanel = exports.SelectionPanel = function SelectionPanel(_ref) {
  var moveRight = _ref.moveRight;
  var moveLeft = _ref.moveLeft;

  return _react2.default.createElement(
    'div',
    { className: 'ms-selectionpanel' },
    _react2.default.createElement(
      'button',
      { onClick: moveRight, style: { margin: '120px 0' } },
      _ref2
    ),
    _react2.default.createElement(
      'button',
      { onClick: moveLeft },
      _ref3
    )
  );
};

var _ref5 = _react2.default.createElement('i', { className: 'icon ion-ios-skipbackward rotate-90' });

var _ref6 = _react2.default.createElement(
  'span',
  null,
  'Up'
);

var _ref7 = _react2.default.createElement('i', { className: 'icon ion-arrow-up-b' });

var _ref8 = _react2.default.createElement('i', { className: 'icon ion-arrow-down-b' });

var _ref9 = _react2.default.createElement(
  'span',
  null,
  'Down'
);

var _ref10 = _react2.default.createElement('i', { className: 'icon ion-ios-skipforward rotate-90' });

var SelectionPanel2 = exports.SelectionPanel2 = function SelectionPanel2(_ref4) {
  var moveTop = _ref4.moveTop;
  var moveUp = _ref4.moveUp;
  var moveDown = _ref4.moveDown;
  var moveBottom = _ref4.moveBottom;

  return _react2.default.createElement(
    'div',
    { className: 'ms-selectionpanel2' },
    _react2.default.createElement(
      'button',
      { onClick: moveTop, style: { margin: '65px 0' } },
      _ref5
    ),
    _ref6,
    _react2.default.createElement(
      'button',
      { style: { marginBottom: '5px' }, onClick: moveUp },
      _ref7
    ),
    _react2.default.createElement(
      'button',
      { onClick: moveDown },
      _ref8
    ),
    _ref9,
    _react2.default.createElement(
      'button',
      { onClick: moveBottom, style: { margin: '55px 0' } },
      _ref10
    )
  );
};