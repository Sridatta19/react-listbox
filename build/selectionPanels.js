"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionPanel2 = exports.SelectionPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var _ref2 =
/*#__PURE__*/
_react["default"].createElement("i", {
  className: "icon ion-arrow-right-a"
});

var _ref3 =
/*#__PURE__*/
_react["default"].createElement("i", {
  className: "icon ion-arrow-left-a"
});

var SelectionPanel = function SelectionPanel(_ref) {
  var moveRight = _ref.moveRight,
      moveLeft = _ref.moveLeft;
  return _react["default"].createElement("div", {
    className: "ms-selectionpanel"
  }, _react["default"].createElement("button", {
    type: "button",
    onClick: moveRight,
    style: {
      margin: '120px 6px'
    }
  }, _ref2), _react["default"].createElement("button", {
    type: "button",
    onClick: moveLeft,
    style: {
      marginLeft: '6px'
    }
  }, _ref3));
};

exports.SelectionPanel = SelectionPanel;
SelectionPanel.propTypes = {
  moveRight: _react.PropTypes.func,
  moveLeft: _react.PropTypes.func
};

var _ref5 =
/*#__PURE__*/
_react["default"].createElement("i", {
  className: "icon ion-ios-skipbackward rotate-90"
});

var _ref6 =
/*#__PURE__*/
_react["default"].createElement("i", {
  className: "icon ion-arrow-up-b"
});

var _ref7 =
/*#__PURE__*/
_react["default"].createElement("i", {
  className: "icon ion-arrow-down-b"
});

var _ref8 =
/*#__PURE__*/
_react["default"].createElement("i", {
  className: "icon ion-ios-skipforward rotate-90"
});

var SelectionPanel2 = function SelectionPanel2(_ref4) {
  var moveTop = _ref4.moveTop,
      moveUp = _ref4.moveUp,
      moveDown = _ref4.moveDown,
      moveBottom = _ref4.moveBottom;
  return _react["default"].createElement("div", {
    className: "ms-selectionpanel2"
  }, _react["default"].createElement("button", {
    type: "button",
    onClick: moveTop,
    style: {
      margin: '65px 6px'
    }
  }, _ref5), _react["default"].createElement("span", {
    style: {
      marginLeft: '6px'
    }
  }, "Up"), _react["default"].createElement("button", {
    type: "button",
    style: {
      margin: '6px'
    },
    onClick: moveUp
  }, _ref6), _react["default"].createElement("button", {
    type: "button",
    style: {
      margin: '6px'
    },
    onClick: moveDown
  }, _ref7), _react["default"].createElement("span", {
    style: {
      marginLeft: '6px'
    }
  }, "Down"), _react["default"].createElement("button", {
    type: "button",
    onClick: moveBottom,
    style: {
      margin: '55px 6px'
    }
  }, _ref8));
};

exports.SelectionPanel2 = SelectionPanel2;
SelectionPanel2.propTypes = {
  moveTop: _react.PropTypes.func,
  moveDown: _react.PropTypes.func,
  moveBottom: _react.PropTypes.func,
  moveUp: _react.PropTypes.func
};