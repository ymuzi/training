import React, { Component } from 'react'
import { Table, Icon, Popover } from 'antd'
import './SatisfiedTable.css'

class SatisfiedTable extends Component { 
  handleReply = (index) => {
    const { lessonActions, userInfo } = this.props
    lessonActions.replyUserFeedBack({
      mid: userInfo.mid, 
      lessonIndex: index
    })
  }
  handleStopBubble = e => {
    e.stopPropagation();
  }
  renderPopoverContent = (record) => {
    return (
      <div>
        { Object.keys(record.teacher_info).map(key => (
          <span className="marginRight20">{`${key}: ${record.teacher_info[key]}`}</span>
        )) }
      </div>
    )
  }
  render() {
    const { list } = this.props
    
    const columns = [
      {
        title: '课程',
        dataIndex: 'class_info.name',
        align: 'center',
      }, {
        title: '教程',
        dataIndex: 'course_name',
        align: 'center',
      }, {
        title: '开课时间',
        dataIndex: 'time',
        align: 'center',
      }, {
        title: '老师',
        dataIndex: 'teacher_info.nick',
        align: 'center',
        render: (text, record) => (
          <span>
            <Popover 
              title="老师信息" 
              content={this.renderPopoverContent(record)} 
              trigger="click" 
              onClick={this.handleStopBubble}
            >
              <Icon type="profile" />
            </Popover>&nbsp;{text}
          </span>
        )
      }, {
        title: '满意度评分',
        dataIndex: 'satisfied_score',
        align: 'center',
      }, {
        title: '具体反馈',
        dataIndex: 'satisfied_detail',
        align: 'center',
      }, {
        title: '操作',
        dataIndex: 'reply_status',
        align: 'center',
        render: (info, record, index) => {
          return <span onClick={this.handleReply.bind(this, record, index)}>{info === 1 ? '已回复' : '✉️回复'}</span>
        }
      }
    ];
    return (
      <div className="table-wrapper">
        <Table 
          rowKey={record => record.class_info.id} 
          dataSource={list} 
          columns={columns} 
          pagination={false}
          bordered
        />
      </div>
    )
  }
}

export default SatisfiedTable