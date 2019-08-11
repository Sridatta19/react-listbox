"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveVertically = exports.moveRightToLeft = exports.moveLeftToRight = exports.alphaNumericProp = exports.retrieveValues = exports.swap = exports.removeValueInCollection = exports.updateValueInCollection = void 0;

var _ramda = _interopRequireDefault(require("ramda"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var updateCollection = function updateCollection(value, collection, newValue) {
  var index = _ramda["default"].findIndex(_ramda["default"].propEq('value', value), collection);

  return _ramda["default"].over(_ramda["default"].lensIndex(index), _ramda["default"].assoc('isSelected', newValue), collection);
};

var updateValueInCollection = function updateValueInCollection(value, collection) {
  return updateCollection(value, collection, true);
};

exports.updateValueInCollection = updateValueInCollection;

var removeValueInCollection = function removeValueInCollection(value, collection) {
  return updateCollection(value, collection, undefined);
};

exports.removeValueInCollection = removeValueInCollection;

var isSelected = _ramda["default"].propEq('isSelected', true);

var filterAndTransformSelected = _ramda["default"].compose(_ramda["default"].map(_ramda["default"].omit('isSelected')), _ramda["default"].filter(isSelected));

var filterAndRetrieveSelectedValues = _ramda["default"].compose(_ramda["default"].map(_ramda["default"].prop('value')), _ramda["default"].filter(isSelected));

var swap = function swap(x, y) {
  return function (collection) {
    var b = collection[x];
    collection[x] = collection[y];
    collection[y] = b;
    return collection;
  };
};

exports.swap = swap;

var retrieveValues = function retrieveValues(collection) {
  return _ramda["default"].map(_ramda["default"].prop('value'), _ramda["default"].filter(isSelected, collection));
};

exports.retrieveValues = retrieveValues;

var alphaNumericProp = function alphaNumericProp(props, propName, componentName) {
  componentName = componentName || 'ANONYMOUS';

  if (props[propName]) {
    var value = props[propName];

    var currentType = _typeof(value);

    if (typeof value !== 'number' && typeof value !== 'string') {
      return new Error("Invalid prop '".concat(propName, "' of type '").concat(currentType, "'\n        supplied to '").concat(componentName, "', expected 'alphaNumeric'"));
    }
  }

  return null;
};

exports.alphaNumericProp = alphaNumericProp;

var addHideAndDropSelected = _ramda["default"].compose(_ramda["default"].set(_ramda["default"].lensProp('hidden'), true), _ramda["default"].omit('isSelected'));

var moveLeftToRight = function moveLeftToRight(state) {
  var newState = {};
  newState.leftOptions = state.leftOptions.map(function (option) {
    if (isSelected(option)) {
      return addHideAndDropSelected(option);
    }

    return option;
  });
  newState.rightOptions = _ramda["default"].concat(state.rightOptions, filterAndTransformSelected(state.leftOptions));
  return newState;
};

exports.moveLeftToRight = moveLeftToRight;

var moveRightToLeft = function moveRightToLeft(state) {
  var newState = {};
  newState.rightOptions = _ramda["default"].filter(_ramda["default"].propEq('isSelected', undefined), state.rightOptions);
  var selectedRightValues = filterAndRetrieveSelectedValues(state.rightOptions);
  newState.leftOptions = state.leftOptions.map(function (option) {
    if (_ramda["default"].contains(option.value, selectedRightValues)) {
      return _ramda["default"].omit('hidden', option);
    }

    return option;
  });
  return newState;
};

exports.moveRightToLeft = moveRightToLeft;

var moveVertically = function moveVertically(isDirectionUpward, state) {
  var rightOptions = state.rightOptions;
  var selectedValues = retrieveValues(rightOptions);

  var newRightOptions = _ramda["default"].clone(rightOptions);

  _ramda["default"].forEach(function (value) {
    var index = _ramda["default"].findIndex(_ramda["default"].propEq('value', value), newRightOptions);

    if (isDirectionUpward) {
      // eslint-disable-next-line
      index == 0 ? null : swap(index, index - 1)(newRightOptions);
    } else {
      // eslint-disable-next-line
      ++index === rightOptions.length ? null : swap(index, index - 1)(newRightOptions);
    }
  }, selectedValues);

  return newRightOptions;
};

exports.moveVertically = moveVertically;