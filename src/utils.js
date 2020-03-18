const R = require('ramda');

const updateCollection = (value, collection, newValue) => {
  const index = R.findIndex(R.propEq('value', value), collection);
  return R.over(
    R.lensIndex(index),
    R.assoc('isSelected', newValue),
    collection
  );
};

export const transformOption = preSelected => option => {
  if (R.contains(option.value, preSelected)) {
    return R.set(R.lensProp('hidden'), true, option);
  }
  return option;
};

export const updateValueInCollection = (value, collection) =>
  updateCollection(value, collection, true);

export const removeValueInCollection = (value, collection) =>
  updateCollection(value, collection, undefined);

const isSelected = R.propEq('isSelected', true);

const filterAndTransformSelected = R.compose(
  R.map(R.omit(['isSelected'])),
  R.filter(isSelected)
);

const filterAndRetrieveSelectedValues = R.compose(
  R.map(R.prop('value')),
  R.filter(isSelected)
);

export const swap = (x, y) => collection => {
  const b = collection[x];
  collection[x] = collection[y];
  collection[y] = b;
  return collection;
};

export const retrieveValues = collection =>
  R.map(R.prop('value'), R.filter(isSelected, collection));

export const alphaNumericProp = (props, propName, componentName) => {
  componentName = componentName || 'ANONYMOUS';

  if (props[propName]) {
    const value = props[propName];
    const currentType = typeof value;
    if (typeof value !== 'number' && typeof value !== 'string') {
      return new Error(`Invalid prop '${propName}' of type '${currentType}'
        supplied to '${componentName}', expected 'alphaNumeric'`);
    }
  }

  return null;
};

const addHideAndDropSelected = R.compose(
  R.set(R.lensProp('hidden'), true),
  R.omit(['isSelected'])
);

export const moveLeftToRight = (leftOptions, rightOptions) => {
  const newState = {};
  newState.newLeftOptions = leftOptions.map(option => {
    if (isSelected(option)) {
      return addHideAndDropSelected(option);
    }
    return option;
  });
  newState.newRightOptions = R.concat(
    rightOptions,
    filterAndTransformSelected(leftOptions)
  );
  return newState;
};

export const moveRightToLeft = (leftOptions, rightOptions) => {
  const newRightOptions = R.filter(
    R.propEq('isSelected', undefined),
    rightOptions
  );
  const selectedRightValues = filterAndRetrieveSelectedValues(rightOptions);
  const newLeftOptions = leftOptions.map(option => {
    if (R.contains(option.value, selectedRightValues)) {
      return R.omit(['hidden'], option);
    }
    return option;
  });
  return { newRightOptions, newLeftOptions };
};

export const moveVertically = (isDirectionUpward, rightOptions) => {
  const selectedValues = retrieveValues(rightOptions);
  const newRightOptions = R.clone(rightOptions);
  R.forEach(value => {
    let index = R.findIndex(R.propEq('value', value), newRightOptions);
    if (isDirectionUpward) {
      // eslint-disable-next-line
      index == 0 ? null : swap(index, index - 1)(newRightOptions);
    } else {
      // eslint-disable-next-line
      ++index === rightOptions.length
        ? null
        : swap(index, index - 1)(newRightOptions);
    }
  }, selectedValues);
  return newRightOptions;
};
