import { combineReducers } from 'redux'
import ActionTypes from '../const/ActionTypes'

function currentLessonsList(state = {}, action) {
  switch(action.type){
    case `${ActionTypes.FETCH_LESSON_INFO}_SUC`:
      return { ...state, [action.mid]: [ ...action.response.current.result ] }
      
    default:
      return state
  }
}
function historyLessonsList(state = {}, action) {
  switch(action.type){
    case `${ActionTypes.FETCH_LESSON_INFO}_SUC`:
      console.log(action.response);
      const history = action.response.history;
      return { ...state, [action.mid]: [ ...history.result ] }
    default:
      return state
  }
}

const lessonInfo = combineReducers({
  currentLessonsList,
  historyLessonsList
})

export default lessonInfo