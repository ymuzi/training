import React, { Component } from 'react'
import './ClassInfoBox.css'

class ClassInfoBox extends Component {
  render() {
    if (!this.props.data) return null
    const { 
      data: {
        id: classId,
        name: className,
        real_teacher: {
          name: realTeacherName,
          mid: realTeacherMid,
          wx_code: realTeacherWxCode
        },
        virtual_teacher: {
          nick: virtualTeacherName,
          id: virtualTeacherId,
          wx_code: virtualTeacherWxCode
        }
      } 
    } = this.props
    return (
      <div className="class-info-list">
        <div className="class-info-area">
          <div className="class-info-area__item">{`班级: ${className}`}</div>
          <div className="class-info-area__item">{`班级ID: ${classId}`}</div>
        </div>

        <div className="class-info-area">
          <div className="class-info-area__item">{`老师: ${virtualTeacherName}`}</div>
          <div className="class-info-area__item">{`ID: ${virtualTeacherId}`}</div>
          <div className="class-info-area__item">{`微信: ${virtualTeacherWxCode}`}</div>
        </div>

        <div className="class-info-area">
          <div className="class-info-area__item">{`负责员工: ${realTeacherName}`}</div>
          <div className="class-info-area__item">{`ID: ${realTeacherMid}`}</div>
          <div className="class-info-area__item">{`微信: ${realTeacherWxCode}`}</div>
        </div>
      </div>
    )
  }
}

export default ClassInfoBox