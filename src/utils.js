
import R from 'ramda'

const updateCollection = (value, collection, newValue) => {
  let index = R.findIndex(R.propEq('value', value), collection)
  return R.over(
    R.lensIndex(index),
    R.assoc('isSelected', newValue),
    collection
  )
}

export const updateValueInCollection = (value, collection) => (
  updateCollection(value, collection, true)
)

export const removeValueInCollection = (value, collection) => (
  updateCollection(value, collection, undefined)
)

export const filterAndTransformSelected = R.compose(
    R.map(R.omit('isSelected')),
    R.filter(R.propEq('isSelected', true))
)

export const swap = (x, y) => (collection) => {
  let b = collection[x]
  collection[x] = collection[y]
  collection[y] = b
  return collection
}

export const retrieveValues = collection => R.map(
  R.prop('value'),
  R.filter(R.propEq('isSelected', true), collection)
)
