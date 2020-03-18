"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RightSelectionPanel = exports.LeftSelectionPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ref2 = /*#__PURE__*/_react["default"].createElement("i", {
  className: "icon ion-arrow-right-a"
});

var _ref3 = /*#__PURE__*/_react["default"].createElement("i", {
  className: "icon ion-arrow-left-a"
});

var LeftSelectionPanel = function LeftSelectionPanel(_ref) {
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

exports.LeftSelectionPanel = LeftSelectionPanel;

var _ref5 = /*#__PURE__*/_react["default"].createElement("i", {
  className: "icon ion-ios-skipbackward rotate-90"
});

var _ref6 = /*#__PURE__*/_react["default"].createElement("i", {
  className: "icon ion-arrow-up-b"
});

var _ref7 = /*#__PURE__*/_react["default"].createElement("i", {
  className: "icon ion-arrow-down-b"
});

var _ref8 = /*#__PURE__*/_react["default"].createElement("i", {
  className: "icon ion-ios-skipforward rotate-90"
});

var RightSelectionPanel = function RightSelectionPanel(_ref4) {
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

exports.RightSelectionPanel = RightSelectionPanel;