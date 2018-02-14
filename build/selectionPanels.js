"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionPanel2 = exports.SelectionPanel = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref2 = _react2.default.createElement("i", { className: "icon ion-arrow-right-a" });

var _ref3 = _react2.default.createElement("i", { className: "icon ion-arrow-left-a" });

var SelectionPanel = exports.SelectionPanel = function SelectionPanel(_ref) {
  var moveRight = _ref.moveRight,
      moveLeft = _ref.moveLeft;
  return _react2.default.createElement(
    "div",
    { className: "ms-selectionpanel" },
    _react2.default.createElement(
      "button",
      { type: "button", onClick: moveRight, style: { margin: '120px 6px' } },
      _ref2
    ),
    _react2.default.createElement(
      "button",
      { type: "button", onClick: moveLeft, style: { marginLeft: '6px' } },
      _ref3
    )
  );
};

SelectionPanel.propTypes = {
  moveRight: _react.PropTypes.func,
  moveLeft: _react.PropTypes.func
};

var _ref5 = _react2.default.createElement("i", { className: "icon ion-ios-skipbackward rotate-90" });

var _ref6 = _react2.default.createElement("i", { className: "icon ion-arrow-up-b" });

var _ref7 = _react2.default.createElement("i", { className: "icon ion-arrow-down-b" });

var _ref8 = _react2.default.createElement("i", { className: "icon ion-ios-skipforward rotate-90" });

var SelectionPanel2 = exports.SelectionPanel2 = function SelectionPanel2(_ref4) {
  var moveTop = _ref4.moveTop,
      moveUp = _ref4.moveUp,
      moveDown = _ref4.moveDown,
      moveBottom = _ref4.moveBottom;
  return _react2.default.createElement(
    "div",
    { className: "ms-selectionpanel2" },
    _react2.default.createElement(
      "button",
      { type: "button", onClick: moveTop, style: { margin: '65px 6px' } },
      _ref5
    ),
    _react2.default.createElement(
      "span",
      { style: { marginLeft: '6px' } },
      "Up"
    ),
    _react2.default.createElement(
      "button",
      { type: "button", style: { margin: '6px' }, onClick: moveUp },
      _ref6
    ),
    _react2.default.createElement(
      "button",
      { type: "button", style: { margin: '6px' }, onClick: moveDown },
      _ref7
    ),
    _react2.default.createElement(
      "span",
      { style: { marginLeft: '6px' } },
      "Down"
    ),
    _react2.default.createElement(
      "button",
      { type: "button", onClick: moveBottom, style: { margin: '55px 6px' } },
      _ref8
    )
  );
};

SelectionPanel2.propTypes = {
  moveTop: _react.PropTypes.func,
  moveDown: _react.PropTypes.func,
  moveBottom: _react.PropTypes.func,
  moveUp: _react.PropTypes.func
};