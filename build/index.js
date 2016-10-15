'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

require('../public/app.css');

require('../public/ionicons.min.css');

var _selectionPanels = require('./selectionPanels');

var _listItems = require('./listItems');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DoubleListBox = function (_Component) {
  _inherits(DoubleListBox, _Component);

  function DoubleListBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DoubleListBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DoubleListBox.__proto__ || Object.getPrototypeOf(DoubleListBox)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      leftOptions: _this.props.options,
      rightOptions: [],
      leftSearchTerm: '',
      rightSearchTerm: ''
    }, _this.onLeftSelect = function (obj) {
      _this.handleSelectedItem(obj, 'leftOptions');
    }, _this.onRightSelect = function (obj) {
      _this.handleSelectedItem(obj, 'rightOptions');
    }, _this.handleChange = function () {
      var rightOptions = _this.state.rightOptions;

      var selectedValues = (0, _utils.retrieveValues)(rightOptions);
      _this.props.onChange(selectedValues);
    }, _this.handleSelectedItem = function (obj, stateLabel) {
      var newState = {};
      var value = _ramda2.default.keys(obj)[0];
      if (obj[value]) {
        newState[stateLabel] = (0, _utils.removeValueInCollection)(+value, _this.state[stateLabel]);
      } else {
        newState[stateLabel] = (0, _utils.updateValueInCollection)(+value, _this.state[stateLabel]);
      }
      _this.setState(newState);
    }, _this.moveLaterally = function (fromLabel, toLabel) {
      var newState = {};
      newState[fromLabel] = _ramda2.default.filter(_ramda2.default.propEq('isSelected', undefined), _this.state[fromLabel]);
      newState[toLabel] = _ramda2.default.concat((0, _utils.filterAndTransformSelected)(_this.state[fromLabel]), _this.state[toLabel]);
      _this.setState(newState);
    }, _this.moveRight = function () {
      _this.moveLaterally('leftOptions', 'rightOptions');
    }, _this.moveLeft = function () {
      _this.moveLaterally('rightOptions', 'leftOptions');
    }, _this.moveVertically = function (isDirectionUpward) {
      var rightOptions = _this.state.rightOptions;

      var selectedValues = (0, _utils.retrieveValues)(rightOptions);
      var newRightOptions = _ramda2.default.clone(rightOptions);
      _ramda2.default.forEach(function (value) {
        var index = _ramda2.default.findIndex(_ramda2.default.propEq('value', value), newRightOptions);
        if (isDirectionUpward) {
          // eslint-disable-next-line
          index == 0 ? null : (0, _utils.swap)(index, index - 1)(newRightOptions);
        } else {
          // eslint-disable-next-line
          ++index === rightOptions.length ? null : (0, _utils.swap)(index, index - 1)(newRightOptions);
        }
      }, selectedValues);
      _this.setState({ rightOptions: newRightOptions });
    }, _this.moveUp = function () {
      _this.moveVertically(true);
    }, _this.moveDown = function () {
      _this.moveVertically(false);
    }, _this.moveTop = function () {
      _this.setState({ rightOptions: _ramda2.default.concat(_ramda2.default.filter(_ramda2.default.propEq('isSelected', true), _this.state.rightOptions), _ramda2.default.filter(_ramda2.default.propEq('isSelected', undefined), _this.state.rightOptions))
      });
    }, _this.moveBottom = function () {
      _this.setState({ rightOptions: _ramda2.default.concat(_ramda2.default.filter(_ramda2.default.propEq('isSelected', undefined), _this.state.rightOptions), _ramda2.default.filter(_ramda2.default.propEq('isSelected', true), _this.state.rightOptions))
      });
    }, _this.leftChange = function (event) {
      _this.setState({ leftSearchTerm: event.target.value });
    }, _this.rightChange = function (event) {
      _this.setState({ rightSearchTerm: event.target.value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DoubleListBox, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var leftOptions = _state.leftOptions;
      var rightOptions = _state.rightOptions;
      var leftSearchTerm = _state.leftSearchTerm;
      var rightSearchTerm = _state.rightSearchTerm;

      return _react2.default.createElement(
        'div',
        { className: 'ms-container', id: 'ms-pre-selected-options' },
        _react2.default.createElement(
          'div',
          { className: 'ms-selectable' },
          _react2.default.createElement('input', { type: 'text', className: 'search-input', onChange: this.leftChange, autoComplete: 'off', placeholder: 'Search' }),
          _react2.default.createElement(
            'ul',
            { className: 'ms-list', tabIndex: '-1' },
            leftOptions.filter(function (lo) {
              return lo.label.toLowerCase().indexOf(leftSearchTerm.toLowerCase()) !== -1;
            }).map(function (o) {
              return _react2.default.createElement(_listItems.SelectableListItem, {
                key: o.value,
                value: o.value,
                label: o.label,
                onSelect: _this2.onLeftSelect,
                isSelected: o.isSelected
              });
            })
          )
        ),
        _react2.default.createElement(_selectionPanels.SelectionPanel, { moveRight: this.moveRight, moveLeft: this.moveLeft }),
        _react2.default.createElement(_selectionPanels.SelectionPanel2, {
          moveTop: this.moveTop, moveBottom: this.moveBottom,
          moveUp: this.moveUp, moveDown: this.moveDown
        }),
        _react2.default.createElement(
          'div',
          { className: 'ms-selection' },
          _react2.default.createElement('input', { type: 'text', className: 'search-input', onChange: this.rightChange, autoComplete: 'off', placeholder: 'Search' }),
          _react2.default.createElement(
            'ul',
            { className: 'ms-list', tabIndex: '-1' },
            rightOptions.filter(function (ro) {
              return ro.label.toLowerCase().indexOf(rightSearchTerm.toLowerCase()) !== -1;
            }).map(function (o) {
              return _react2.default.createElement(_listItems.SelectedListItem, {
                key: o.value,
                value: o.value,
                label: o.label,
                onSelect: _this2.onRightSelect,
                isSelected: o.isSelected
              });
            })
          )
        )
      );
    }
  }]);

  return DoubleListBox;
}(_react.Component);

DoubleListBox.propTypes = {
  options: _react.PropTypes.array,
  onChange: _react.PropTypes.func
};
exports.default = DoubleListBox;