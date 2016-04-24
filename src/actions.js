export const addHistoryItem = (item) => ({ type: 'ADD_HISTORY_ITEM', data:item})
export const removeHistoryItem = (index) => ({ type: 'REMOVE_HISTORY_ITEM', data:index})
export const updateInput = (input) => ({ type: 'UPDATE_INPUT', data:input})
