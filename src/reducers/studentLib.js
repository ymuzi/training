import { combineReducers } from 'redux'
import ActionTypes from '../const/ActionTypes'

function list(state = [], action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_STUDENT_LIST}_SUC`:
      const result = action.response.result;
      return result;
    default:
      return state
  }
}
function filterOption(state = null, action) {
  switch (action.type) {
    case `${ActionTypes.SEARCH_STUDENT_LIST_BY_OPTION}`:
      return action.params
    default:
      return state
  }
}

const studentLib = combineReducers({
  list,
  filterOption
})
export default studentLib
