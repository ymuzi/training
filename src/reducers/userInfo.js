import ActionTypes from '../const/ActionTypes'

function userInfo(state = {}, action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_USER_INFO}_SUC`:
      return { ...state, [action.mid]: { ...action.response.data } }
    default:
      return state
  }
}
export default userInfo
