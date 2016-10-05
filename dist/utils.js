'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveValues = exports.swap = exports.filterAndTransformSelected = exports.removeValueInCollection = exports.updateValueInCollection = undefined;

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

var filterAndTransformSelected = exports.filterAndTransformSelected = _ramda2.default.compose(_ramda2.default.map(_ramda2.default.omit('isSelected')), _ramda2.default.filter(_ramda2.default.propEq('isSelected', true)));

var swap = exports.swap = function swap(x, y) {
  return function (collection) {
    var b = collection[x];
    collection[x] = collection[y];
    collection[y] = b;
    return collection;
  };
};

var retrieveValues = exports.retrieveValues = function retrieveValues(collection) {
  return _ramda2.default.map(_ramda2.default.prop('value'), _ramda2.default.filter(_ramda2.default.propEq('isSelected', true), collection));
};