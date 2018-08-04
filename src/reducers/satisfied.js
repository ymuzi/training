import { combineReducers } from 'redux'
import ActionTypes from '../const/ActionTypes'

function satisfied(state={}, action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_LESSON_SATISFIED_INFO}_SUC`:
      return { ...state, [action.mid]: action.response.data.list }
    case `${ActionTypes.REPLY_USER_FEED_BACK}`:
      const { mid, lessonIndex } = action.params
      
      const targetItem = { ...state[mid][lessonIndex] }
      targetItem.reply_status = 1
      const list = [ ...state[mid] ]
      list.splice(lessonIndex, 1, targetItem)

      const nextState = { ...state, [mid]: list }

      return nextState
    default:
      return state
  }
}

export default satisfied