import ActionTypes from '../const/ActionTypes'
import { normalize } from 'normalizr'
import * as schemes from '../schemes'

export default {
  fetchLessonInfo: (params) => {
    return {
      SERVER_API: {
        type: ActionTypes.FETCH_LESSON_INFO,
        endpoint: '/getLessonInfo',
        params: {
          mid: params.mid
        },
        normailzerFun:response => {
          const history = normalize(response.data.historyLessonsList, schemes.LESSONS);
          const current = normalize(response.data.currentLessonsList, schemes.LESSONS);
          return {
            history,
            current
          }
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
        },
        normailzerFun:response=> normalize(response.data.list, schemes.SATISFILEDLIST)
      },
      mid: params.mid
    }
  },
  replyUserFeedBack: (params) => {
    const { mid, time, lessonIndex } = params
    return {
      type: ActionTypes.REPLY_USER_FEED_BACK,
      params: { mid, lessonIndex, time }
    }
  }
}