"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveVertically = exports.moveRightToLeft = exports.moveLeftToRight = exports.alphaNumericProp = exports.retrieveValues = exports.swap = exports.removeValueInCollection = exports.updateValueInCollection = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var R = require("ramda");

var updateCollection = function updateCollection(value, collection, newValue) {
  var index = R.findIndex(R.propEq("value", value), collection);
  return R.over(R.lensIndex(index), R.assoc("isSelected", newValue), collection);
};

var updateValueInCollection = function updateValueInCollection(value, collection) {
  return updateCollection(value, collection, true);
};

exports.updateValueInCollection = updateValueInCollection;

var removeValueInCollection = function removeValueInCollection(value, collection) {
  return updateCollection(value, collection, undefined);
};

exports.removeValueInCollection = removeValueInCollection;
var isSelected = R.propEq("isSelected", true);
var filterAndTransformSelected = R.compose(R.map(R.omit(["isSelected"])), R.filter(isSelected));
var filterAndRetrieveSelectedValues = R.compose(R.map(R.prop("value")), R.filter(isSelected));

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
  return R.map(R.prop("value"), R.filter(isSelected, collection));
};

exports.retrieveValues = retrieveValues;

var alphaNumericProp = function alphaNumericProp(props, propName, componentName) {
  componentName = componentName || "ANONYMOUS";

  if (props[propName]) {
    var value = props[propName];

    var currentType = _typeof(value);

    if (typeof value !== "number" && typeof value !== "string") {
      return new Error("Invalid prop '".concat(propName, "' of type '").concat(currentType, "'\n        supplied to '").concat(componentName, "', expected 'alphaNumeric'"));
    }
  }

  return null;
};

exports.alphaNumericProp = alphaNumericProp;
var addHideAndDropSelected = R.compose(R.set(R.lensProp("hidden"), true), R.omit(["isSelected"]));

var moveLeftToRight = function moveLeftToRight(leftOptions, rightOptions) {
  var newState = {};
  newState.newLeftOptions = leftOptions.map(function (option) {
    if (isSelected(option)) {
      return addHideAndDropSelected(option);
    }

    return option;
  });
  newState.newRightOptions = R.concat(rightOptions, filterAndTransformSelected(leftOptions));
  return newState;
};

exports.moveLeftToRight = moveLeftToRight;

var moveRightToLeft = function moveRightToLeft(leftOptions, rightOptions) {
  var newRightOptions = R.filter(R.propEq("isSelected", undefined), rightOptions);
  var selectedRightValues = filterAndRetrieveSelectedValues(rightOptions);
  var newLeftOptions = leftOptions.map(function (option) {
    if (R.contains(option.value, selectedRightValues)) {
      return R.omit(["hidden"], option);
    }

    return option;
  });
  return {
    newRightOptions: newRightOptions,
    newLeftOptions: newLeftOptions
  };
};

exports.moveRightToLeft = moveRightToLeft;

var moveVertically = function moveVertically(isDirectionUpward, rightOptions) {
  var selectedValues = retrieveValues(rightOptions);
  var newRightOptions = R.clone(rightOptions);
  R.forEach(function (value) {
    var index = R.findIndex(R.propEq("value", value), newRightOptions);

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