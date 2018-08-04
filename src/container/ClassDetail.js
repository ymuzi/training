import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import classActions from '../actions/class'

import LessonsTable from '../component/LessonsTable/LessonsTable'
import ClassInfoBox from '../component/ClassInfoBox/ClassInfoBox'

class ClassDetail extends Component {
  componentDidMount() {
    const classId = this.props.params.classId
    const { classActions } = this.props
    classActions.fetchClassInfo({ classId })
  }
  render() {
    const { 
      basicInfo, 
      lessonList
    } = this.props
    return (
      <div>
        <ClassInfoBox data={basicInfo}/>
        <LessonsTable list={lessonList} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    classesDetail: {
      basicInfo,
      lessonList
    }
  } = state
  const classId = ownProps.params.classId
  return {
    basicInfo: basicInfo[classId],
    lessonList: lessonList[classId]  
  }
}

const mapDispatchToProps = dispatch => {
  return {
    classActions: bindActionCreators(classActions, dispatch),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ClassDetail)