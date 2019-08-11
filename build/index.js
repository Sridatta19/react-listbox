"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _selectionPanels = require("./selectionPanels");

var _listItems = require("./listItems");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var R = require('ramda');

var DoubleListBox =
/*#__PURE__*/
function (_Component) {
  _inherits(DoubleListBox, _Component);

  function DoubleListBox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DoubleListBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DoubleListBox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      leftOptions: _this.props.options.map(function (option) {
        if (R.contains(option.value, _this.props.selected)) {
          return R.set(R.lensProp('hidden'), true, option);
        }

        return option;
      }),
      rightOptions: _this.props.options.filter(function (option) {
        return R.contains(option.value, _this.props.selected);
      }),
      leftSearchTerm: '',
      rightSearchTerm: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onLeftSelect", function (obj) {
      _this.handleSelectedItem(obj, 'leftOptions');
    });

    _defineProperty(_assertThisInitialized(_this), "onRightSelect", function (obj) {
      _this.handleSelectedItem(obj, 'rightOptions');
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (rightOptions) {
      var onChange = _this.props.onChange;

      if (onChange) {
        var selectedValues = R.map(R.prop('value'), rightOptions);
        onChange(selectedValues);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectedItem", function (obj, stateLabel) {
      var newState = {};
      var value = R.keys(obj)[0];

      if (obj[value]) {
        newState[stateLabel] = (0, _utils.removeValueInCollection)(+value, _this.state[stateLabel]);
      } else {
        newState[stateLabel] = (0, _utils.updateValueInCollection)(+value, _this.state[stateLabel]);
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "moveRight", function () {
      var newState = (0, _utils.moveLeftToRight)(_this.state);

      _this.setState(newState);

      _this.handleChange(newState.rightOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "moveLeft", function () {
      var newState = (0, _utils.moveRightToLeft)(_this.state);

      _this.setState(newState);

      _this.handleChange(newState.rightOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "moveVertically", function (isDirectionUpward) {
      var newRightOptions = (0, _utils.moveVertically)(isDirectionUpward, _this.state);

      _this.setState({
        rightOptions: newRightOptions
      });

      _this.handleChange(newRightOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "moveUp", function () {
      _this.moveVertically(true);
    });

    _defineProperty(_assertThisInitialized(_this), "moveDown", function () {
      _this.moveVertically(false);
    });

    _defineProperty(_assertThisInitialized(_this), "moveTop", function () {
      var rightOptions = R.concat(R.filter(R.propEq('isSelected', true), _this.state.rightOptions), R.filter(R.propEq('isSelected', undefined), _this.state.rightOptions));

      _this.setState({
        rightOptions: rightOptions
      });

      _this.handleChange(rightOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "moveBottom", function () {
      var rightOptions = R.concat(R.filter(R.propEq('isSelected', undefined), _this.state.rightOptions), R.filter(R.propEq('isSelected', true), _this.state.rightOptions));

      _this.setState({
        rightOptions: rightOptions
      });

      _this.handleChange(rightOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "leftChange", function (event) {
      _this.setState({
        leftSearchTerm: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "rightChange", function (event) {
      _this.setState({
        rightSearchTerm: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function () {});

    return _this;
  }

  _createClass(DoubleListBox, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var options = nextProps.options,
          selected = nextProps.selected;

      if (R.isEmpty(this.state.leftOptions) && R.isEmpty(this.state.rightOptions)) {
        this.setState({
          leftOptions: options.map(function (option) {
            if (R.contains(option.value, _this2.props.selected)) {
              return R.set(R.lensProp('hidden'), true, option);
            }

            return option;
          }),
          rightOptions: options.filter(function (option) {
            return R.contains(option.value, selected);
          })
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          leftOptions = _this$state.leftOptions,
          rightOptions = _this$state.rightOptions,
          leftSearchTerm = _this$state.leftSearchTerm,
          rightSearchTerm = _this$state.rightSearchTerm;
      return _react["default"].createElement("div", {
        className: "ms-container",
        id: "ms-pre-selected-options"
      }, _react["default"].createElement("div", {
        className: "ms-selectable"
      }, _react["default"].createElement("input", {
        type: "text",
        className: "search-input",
        onChange: this.leftChange,
        autoComplete: "off",
        placeholder: "Search"
      }), _react["default"].createElement("ul", {
        className: "ms-list",
        tabIndex: "-1",
        onKeyDown: this.onKeyDown
      }, leftOptions.filter(function (lo) {
        return !lo.hidden === true;
      }).filter(function (lo) {
        return lo.label.toLowerCase().indexOf(leftSearchTerm.toLowerCase()) !== -1;
      }).map(function (o) {
        return _react["default"].createElement(_listItems.SelectableListItem, {
          key: o.value,
          value: o.value,
          label: o.label,
          onSelect: _this3.onLeftSelect,
          isSelected: o.isSelected
        });
      }))), _react["default"].createElement(_selectionPanels.SelectionPanel, {
        moveRight: this.moveRight,
        moveLeft: this.moveLeft
      }), _react["default"].createElement(_selectionPanels.SelectionPanel2, {
        moveTop: this.moveTop,
        moveBottom: this.moveBottom,
        moveUp: this.moveUp,
        moveDown: this.moveDown
      }), _react["default"].createElement("div", {
        className: "ms-selection"
      }, _react["default"].createElement("input", {
        type: "text",
        className: "search-input",
        onChange: this.rightChange,
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
          onSelect: _this3.onRightSelect,
          isSelected: o.isSelected
        });
      }))));
    }
  }]);

  return DoubleListBox;
}(_react.Component);

_defineProperty(DoubleListBox, "defaultProps", {
  selected: []
});

_defineProperty(DoubleListBox, "propTypes", {
  options: _react.PropTypes.array,
  selected: _react.PropTypes.array,
  onChange: _react.PropTypes.func
});

var _default = DoubleListBox;
exports["default"] = _default;
module.exports = exports.default;