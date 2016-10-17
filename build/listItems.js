'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedListItem = exports.SelectableListItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var ListItem = function (_Component) {
  _inherits(ListItem, _Component);

  function ListItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ListItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      lStyle: _this.props.listStyle
    }, _this.onListClick = function () {
      var _this$props = _this.props;
      var value = _this$props.value;
      var isSelected = _this$props.isSelected;
      var onSelect = _this$props.onSelect;

      var bindObject = {};
      bindObject[value] = isSelected;
      onSelect(bindObject);
    }, _this.onMouseEnter = function () {
      _this.setState({ lStyle: (0, _classnames2.default)(_this.props.listStyle, { selected: true }) });
    }, _this.onMouseLeave = function () {
      _this.setState({ lStyle: _this.props.listStyle });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ListItem, [{
    key: 'render',
    value: function render() {
      var label = this.props.label;
      var lStyle = this.state.lStyle;

      return _react2.default.createElement(
        'li',
        {
          className: lStyle, onClick: this.onListClick,
          onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave
        },
        _react2.default.createElement(
          'span',
          null,
          label
        )
      );
    }
  }]);

  return ListItem;
}(_react.Component);

ListItem.propTypes = {
  label: _react.PropTypes.string,
  isSelected: _react.PropTypes.bool,
  onSelect: _react.PropTypes.func,
  listStyle: _react.PropTypes.string,
  value: _utils.alphaNumericProp
};