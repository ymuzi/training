import ActionTypes from '../const/ActionTypes'

export default {
  fetchClassInfo: (params) => {
    const { classId } = params
    return {
      SERVER_API: {
        type: ActionTypes.FETCH_CLASS_INFO,
        endpoint: '/getClassInfo',
        params: {
          id: classId
        }
      },
      classId
    }
  }
}