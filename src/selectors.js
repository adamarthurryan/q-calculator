//this computes the current q value from the input string
//per http://redux.js.org/docs/recipes/ComputingDerivedData.html

import { createSelector } from 'reselect'

import * as QUtil from './q-util'

//a non-memozied selector for the state subtree the current q-value calculation depends on
const getInput = (state) => state.input

//calculate the current q-value from the state
//the result will be memoized
export const getCurrentQ = createSelector(
  [getInput],
  (input) => {
    try {
      let q = calculateQ(input)
      return {q, fractBits:input.fractBits, wholeBits:input.wholeBits}
    }
    catch (error) {
      return {error}
    }
  }
)

//calculate the q bit string from the input parameters
//uses either the float or hex mode
function calculateQ(input) {
  console.log(QUtil)
    if (input.mode == 'float') {
      let floatValue = parseFloat(input.input)
      if (floatValue==NaN)
        throw new Error(`invalid number: ${input.input}`)
      return QUtil.fromFloat(floatValue, input.fractBits, input.wholeBits)
    }
    else if (input.mode == 'hex') {
      if (input.input.length < 1)
        throw new Error(`no input`)
      return QUtil.fromHexString(input.input, input.fractBits, input.wholeBits)
    }
  }
