
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

const isSelected = R.propEq('isSelected', true)

const filterAndTransformSelected = R.compose(
    R.map(R.omit('isSelected')),
    R.filter(isSelected)
)

const filterAndRetrieveSelectedValues = R.compose(
    R.map(R.prop('value')),
    R.filter(isSelected)
)

export const swap = (x, y) => (collection) => {
  let b = collection[x]
  collection[x] = collection[y]
  collection[y] = b
  return collection
}

export const retrieveValues = collection => R.map(
  R.prop('value'),
  R.filter(isSelected, collection)
)

export const alphaNumericProp = (props, propName, componentName) => {
  componentName = componentName || 'ANONYMOUS'

  if (props[propName]) {
    let value = props[propName]
    let currentType = typeof value
    if (typeof value !== 'number' && typeof value !== 'string') {
      return new Error(`Invalid prop '${propName}' of type '${currentType}'
        supplied to '${componentName}', expected 'alphaNumeric'`)
    }
  }

  return null
}

const addHideAndDropSelected = R.compose(
  R.set(R.lensProp('hidden'), true),
  R.omit('isSelected')
)

export const moveLeftToRight = (state) => {
  const newState = {}
  newState.leftOptions = state.leftOptions.map(
    option => {
      if (isSelected(option)) {
        return addHideAndDropSelected(option)
      }
      return option
    }
  )
  newState.rightOptions = R.concat(
    state.rightOptions,
    filterAndTransformSelected(state.leftOptions)
  )
  return newState
}

export const moveRightToLeft = (state) => {
  const newState = {}
  newState.rightOptions = R.filter(R.propEq('isSelected', undefined), state.rightOptions)
  const selectedRightValues = filterAndRetrieveSelectedValues(state.rightOptions)
  newState.leftOptions = state.leftOptions.map(
    option => {
      if (R.contains(option.value, selectedRightValues)) {
        return R.omit('hidden', option)
      }
      return option
    }
  )
  return newState
}

export const moveVertically = (isDirectionUpward, state) => {
  const { rightOptions } = state
  let selectedValues = retrieveValues(rightOptions)
  let newRightOptions = R.clone(rightOptions)
  R.forEach(
    (value) => {
      let index = R.findIndex(R.propEq('value', value), newRightOptions)
      if (isDirectionUpward) {
        // eslint-disable-next-line
        index == 0 ? null : swap(index, index - 1)(newRightOptions)
      } else {
        // eslint-disable-next-line
        ++index === rightOptions.length ? null : swap(index, index - 1)(newRightOptions)
      }
    },
    selectedValues
  )
  return newRightOptions
}
