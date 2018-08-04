import React, { Component } from 'react'
import { Avatar } from 'antd'
import './UserInfoBox.css'

class UserInfoBox extends Component {
  renderBasicInfo() {
    const { 
      userInfo: {
        mid,
        history_pay,
        tel,
        learningLesson,
        totalLearningDays,
        weiChatCode,
        enterDate,
        lastLoginDate,
        remark
      } 
    } = this.props
    if (!mid) return null
    return (
      <div className='basic-info-list'>
        <div className='basic-info-item'>{`学员编号: ${mid}`}</div>
        <div className='basic-info-item'>{`历史付费额: ${history_pay}`}</div>
        <div className='basic-info-item'>{`手机号码: ${tel}`}</div>
        <div className='basic-info-item'>{`在学课程: ${learningLesson}`}</div>
        <div className='basic-info-item'>{`累计学习天数: ${totalLearningDays}`}</div>
        <div className='basic-info-item'>{`微信号码: ${weiChatCode}`}</div>
        <div className='basic-info-item'>{`入学时间: ${enterDate}`}</div>
        <div className='basic-info-item'>{`最后登录时间: ${lastLoginDate}`}</div>
        <div className='basic-info-item'>{`备注: ${remark}`}</div>
      </div>
    )
  }
  render() {
    const { 
      userInfo: {
        nick,
        hurl
      } 
    } = this.props
    return (
      <div className="user-info-wrapper">
        <Avatar className="user-avatar" src={hurl} />
        <div className="user-info">
          <div className="user-nick">{nick}</div>
          {this.renderBasicInfo()}
        </div>
      </div>
    )
  }
}

export default UserInfoBox