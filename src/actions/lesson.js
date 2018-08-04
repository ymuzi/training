import ActionTypes from '../const/ActionTypes'

export default {
  fetchLessonInfo: (params) => {
    return {
      SERVER_API: {
        type: ActionTypes.FETCH_LESSON_INFO,
        endpoint: '/getLessonInfo',
        params: {
          mid: params.mid
        }
      },
      mid: params.mid
    }
  },
  fetchLessonSatisfiedInfo: (params) => {
    return {
      SERVER_API: {
        type: ActionTypes.FETCH_LESSON_SATISFIED_INFO,
        endpoint: '/getSatisfiledList',
        params: {
          mid: params.mid
        }
      },
      mid: params.mid
    }
  },
  replyUserFeedBack: (params) => {
    const { mid, lessonIndex } = params
    return {
      type: ActionTypes.REPLY_USER_FEED_BACK,
      params: { mid, lessonIndex }
    }
  }
}