"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _selectionPanels = require("./selectionPanels");

var _listItems = require("./listItems");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var R = require("ramda");

var DoubleListBox = function DoubleListBox(_ref) {
  var options = _ref.options,
      preSelected = _ref.selected,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(options.map(function (option) {
    if (R.contains(option.value, preSelected)) {
      return R.set(R.lensProp("hidden"), true, option);
    }

    return option;
  })),
      _useState2 = _slicedToArray(_useState, 2),
      leftOptions = _useState2[0],
      setLeftOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(options.filter(function (option) {
    return R.contains(option.value, preSelected);
  })),
      _useState4 = _slicedToArray(_useState3, 2),
      rightOptions = _useState4[0],
      setRightOptions = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      leftSearchTerm = _useState6[0],
      setLeftSearchTerm = _useState6[1];

  var _useState7 = (0, _react.useState)(""),
      _useState8 = _slicedToArray(_useState7, 2),
      rightSearchTerm = _useState8[0],
      setRightSearchTerm = _useState8[1];

  (0, _react.useEffect)(function () {
    if (R.isEmpty(leftOptions) && R.isEmpty(rightOptions)) {
      setLeftOptions(options.map(function (option) {
        if (R.contains(option.value, preSelected)) {
          return R.set(R.lensProp("hidden"), true, option);
        }

        return option;
      }));
      setRightOptions(options.filter(function (option) {
        return R.contains(option.value, preSelected);
      }));
    } else if (options.length === 0) {
      setLeftOptions([]);
      setRightOptions([]);
    }
  }, [preSelected, options, rightOptions, leftOptions]);

  var onLeftSelect = function onLeftSelect(obj) {
    var newLeftOptions;
    var value = R.keys(obj)[0];

    if (obj[value]) {
      newLeftOptions = (0, _utils.removeValueInCollection)(+value, leftOptions);
    } else {
      newLeftOptions = (0, _utils.updateValueInCollection)(+value, leftOptions);
    }

    setLeftOptions(newLeftOptions);
  };

  var onRightSelect = function onRightSelect(obj) {
    var newRightOptions;
    var value = R.keys(obj)[0];

    if (obj[value]) {
      newRightOptions = (0, _utils.removeValueInCollection)(+value, rightOptions);
    } else {
      newRightOptions = (0, _utils.updateValueInCollection)(+value, rightOptions);
    }

    setRightOptions(newRightOptions);
  };

  var handleChange = function handleChange(modifiedOptions) {
    if (onChange) {
      var selectedValues = R.map(R.prop("value"), modifiedOptions);
      onChange(selectedValues);
    }
  };

  var moveRight = function moveRight() {
    var _moveLeftToRight = (0, _utils.moveLeftToRight)(leftOptions, rightOptions),
        newLeftOptions = _moveLeftToRight.newLeftOptions,
        newRightOptions = _moveLeftToRight.newRightOptions;

    setLeftOptions(newLeftOptions);
    setRightOptions(newRightOptions);
    handleChange(newRightOptions);
  };

  var moveLeft = function moveLeft() {
    var _moveRightToLeft = (0, _utils.moveRightToLeft)(leftOptions, rightOptions),
        newLeftOptions = _moveRightToLeft.newLeftOptions,
        newRightOptions = _moveRightToLeft.newRightOptions;

    setLeftOptions(newLeftOptions);
    setRightOptions(newRightOptions);
    handleChange(newRightOptions);
  };

  var moveUp = function moveUp() {
    var updatedRightOptions = (0, _utils.moveVertically)(true, rightOptions);
    setRightOptions(updatedRightOptions);
    handleChange(updatedRightOptions);
  };

  var moveDown = function moveDown() {
    var updatedRightOptions = (0, _utils.moveVertically)(false, rightOptions);
    setRightOptions(updatedRightOptions);
    handleChange(updatedRightOptions);
  };

  var moveTop = function moveTop() {
    var updatedRightOptions = R.concat(R.filter(R.propEq("isSelected", true), rightOptions), R.filter(R.propEq("isSelected", undefined), rightOptions));
    setRightOptions(updatedRightOptions);
    handleChange(updatedRightOptions);
  };

  var moveBottom = function moveBottom() {
    var updatedRightOptions = R.concat(R.filter(R.propEq("isSelected", undefined), rightOptions), R.filter(R.propEq("isSelected", true), rightOptions));
    setRightOptions(updatedRightOptions);
    handleChange(updatedRightOptions);
  };

  var leftChange = function leftChange(evt) {
    return setLeftSearchTerm(evt.target.value);
  };

  var rightChange = function rightChange(evt) {
    return setRightSearchTerm(evt.target.value);
  };

  var onKeyDown = function onKeyDown() {};

  return _react["default"].createElement("div", {
    className: "ms-container",
    id: "ms-pre-selected-options"
  }, _react["default"].createElement("div", {
    className: "ms-selectable"
  }, _react["default"].createElement("input", {
    type: "text",
    className: "search-input",
    onChange: leftChange,
    autoComplete: "off",
    placeholder: "Search"
  }), _react["default"].createElement("ul", {
    className: "ms-list",
    tabIndex: "-1",
    onKeyDown: onKeyDown,
    role: "presentation"
  }, leftOptions.filter(function (lo) {
    return !lo.hidden === true;
  }).filter(function (lo) {
    return lo.label.toLowerCase().indexOf(leftSearchTerm.toLowerCase()) !== -1;
  }).map(function (o) {
    return _react["default"].createElement(_listItems.SelectableListItem, {
      key: o.value,
      value: o.value,
      label: o.label,
      onSelect: onLeftSelect,
      isSelected: o.isSelected
    });
  }))), _react["default"].createElement(_selectionPanels.LeftSelectionPanel, {
    moveRight: moveRight,
    moveLeft: moveLeft
  }), _react["default"].createElement(_selectionPanels.RightSelectionPanel, {
    moveTop: moveTop,
    moveBottom: moveBottom,
    moveUp: moveUp,
    moveDown: moveDown
  }), _react["default"].createElement("div", {
    className: "ms-selection"
  }, _react["default"].createElement("input", {
    type: "text",
    className: "search-input",
    onChange: rightChange,
    autoComplete: "off",
    placeholder: "Search"
  }), _react["default"].createElement("ul", {
    className: "ms-list",
    tabIndex: "-1"
  }, rightOptions.filter(function (ro) {
    return ro.label.toLowerCase().indexOf(rightSearchTerm.toLowerCase()) !== -1;
  }).map(function (o) {
    return _react["default"].createElement(_listItems.SelectedListItem, {
      key: o.value,
      value: o.value,
      label: o.label,
      onSelect: onRightSelect,
      isSelected: o.isSelected
    });
  }))));
};

var _default = DoubleListBox;
exports["default"] = _default;
module.exports = exports.default;