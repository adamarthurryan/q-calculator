export function input (state, action) {
  switch (action.type) {
    case 'UPDATE_INPUT': 
      return Object.assign({}, state, action.data)
    default: 
      return state || {string:"0", mode:"float", fractBits:31, wholeBits:0}
  }
}

export function history (state, action) {
  switch (action.type) {
    case 'ADD_HISTORY_ITEM': 
      //does nothing if the given item is an error
      if (!action.data.error)
        return [Object.assign({}, action.data)].concat(state)
      else
        return state

    case 'REMOVE_HISTORY_ITEM':
      return state.slice(0, action.data).concat(state.slice(action.data+1))
      
    default:
      return state || []
  }
}