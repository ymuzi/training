import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UserInfoBox from '../component/UserInfoBox/UserInfoBox'
import OpTabs from '../component/OpTabs/OpTabs'

import userActions from '../actions/user'
import lessonActions from '../actions/lesson'

class UserCenter extends Component {
  componentDidMount() {
    const mid = this.props.params.mid
    const { userActions, lessonActions } = this.props
    userActions.fetchUserInfo({ mid })
    lessonActions.fetchLessonInfo({ mid })
    lessonActions.fetchLessonSatisfiedInfo({ mid })
  }
  render() {
    const { 
      userInfo, 
      currentLessonsList,
      historyLessonsList,
      satisfiedInfo,
      lessonActions,
      entities
    } = this.props
    // const mid = this.props.params.mid
    return (
      <div>
        <UserInfoBox userInfo={userInfo} />
        <OpTabs 
          userInfo={userInfo}
          entities={entities}
          lessonActions={lessonActions} 
          currentLessonsList={currentLessonsList}
          historyLessonsList={historyLessonsList}
          satisfiedInfo={satisfiedInfo}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    userInfo,
    lessonInfo: {
      currentLessonsList,
      historyLessonsList
    },
    satisfied,
    entities
  } = state
  const mid = ownProps.params.mid
  return {
    entities,
    userInfo: userInfo[mid] || {},
    currentLessonsList: currentLessonsList[mid],
    historyLessonsList: historyLessonsList[mid],
    satisfiedInfo: satisfied[mid]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    lessonActions: bindActionCreators(lessonActions, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(UserCenter)