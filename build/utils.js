'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveVertically = exports.moveRightToLeft = exports.moveLeftToRight = exports.alphaNumericProp = exports.retrieveValues = exports.swap = exports.removeValueInCollection = exports.updateValueInCollection = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateCollection = function updateCollection(value, collection, newValue) {
  var index = _ramda2.default.findIndex(_ramda2.default.propEq('value', value), collection);
  return _ramda2.default.over(_ramda2.default.lensIndex(index), _ramda2.default.assoc('isSelected', newValue), collection);
};

var updateValueInCollection = exports.updateValueInCollection = function updateValueInCollection(value, collection) {
  return updateCollection(value, collection, true);
};

var removeValueInCollection = exports.removeValueInCollection = function removeValueInCollection(value, collection) {
  return updateCollection(value, collection, undefined);
};

var isSelected = _ramda2.default.propEq('isSelected', true);

var filterAndTransformSelected = _ramda2.default.compose(_ramda2.default.map(_ramda2.default.omit('isSelected')), _ramda2.default.filter(isSelected));

var filterAndRetrieveSelectedValues = _ramda2.default.compose(_ramda2.default.map(_ramda2.default.prop('value')), _ramda2.default.filter(isSelected));

var swap = exports.swap = function swap(x, y) {
  return function (collection) {
    var b = collection[x];
    collection[x] = collection[y];
    collection[y] = b;
    return collection;
  };
};

var retrieveValues = exports.retrieveValues = function retrieveValues(collection) {
  return _ramda2.default.map(_ramda2.default.prop('value'), _ramda2.default.filter(isSelected, collection));
};

var alphaNumericProp = exports.alphaNumericProp = function alphaNumericProp(props, propName, componentName) {
  componentName = componentName || 'ANONYMOUS';

  if (props[propName]) {
    var value = props[propName];
    var currentType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    if (typeof value !== 'number' && typeof value !== 'string') {
      return new Error('Invalid prop \'' + propName + '\' of type \'' + currentType + '\'\n        supplied to \'' + componentName + '\', expected \'alphaNumeric\'');
    }
  }

  return null;
};

var addHideAndDropSelected = _ramda2.default.compose(_ramda2.default.set(_ramda2.default.lensProp('hidden'), true), _ramda2.default.omit('isSelected'));

var moveLeftToRight = exports.moveLeftToRight = function moveLeftToRight(state) {
  var newState = {};
  newState.leftOptions = state.leftOptions.map(function (option) {
    if (isSelected(option)) {
      return addHideAndDropSelected(option);
    }
    return option;
  });
  newState.rightOptions = _ramda2.default.concat(state.rightOptions, filterAndTransformSelected(state.leftOptions));
  return newState;
};

var moveRightToLeft = exports.moveRightToLeft = function moveRightToLeft(state) {
  var newState = {};
  newState.rightOptions = _ramda2.default.filter(_ramda2.default.propEq('isSelected', undefined), state.rightOptions);
  var selectedRightValues = filterAndRetrieveSelectedValues(state.rightOptions);
  newState.leftOptions = state.leftOptions.map(function (option) {
    if (_ramda2.default.contains(option.value, selectedRightValues)) {
      return _ramda2.default.omit('hidden', option);
    }
    return option;
  });
  return newState;
};

var moveVertically = exports.moveVertically = function moveVertically(isDirectionUpward, state) {
  var rightOptions = state.rightOptions;

  var selectedValues = retrieveValues(rightOptions);
  var newRightOptions = _ramda2.default.clone(rightOptions);
  _ramda2.default.forEach(function (value) {
    var index = _ramda2.default.findIndex(_ramda2.default.propEq('value', value), newRightOptions);
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