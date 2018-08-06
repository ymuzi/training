import React, { Component } from 'react'
import { Table, Icon, Popover } from 'antd'
import AttrSpan from './AttrSpan';
import './SatisfiedTable.css'

class SatisfiedTable extends Component { 
  handleReply = (attr) => {
    const {index,record} = attr;
    const { lessonActions, userInfo } = this.props
    lessonActions.replyUserFeedBack({
      mid: userInfo.mid,
      time: record.time, 
      lessonIndex: index
    })
  }
  handleStopBubble = e => {
    e.stopPropagation();
  }
  renderPopoverContent = (record) => {
    return (
      <div>
        { Object.keys(record.teacher_info).map((key,i) => (
          <span key={i} className="marginRight20">{`${key}: ${record.teacher_info[key]}`}</span>
        )) }
      </div>
    )
  }
  columns = [
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
        return <AttrSpan record={record} index={index} onClick={this.handleReply}>{info === 1 ? '已回复' : '✉️回复'}</AttrSpan>
      }
    }
  ];

  rowKey = (record,i) => `${record.class_info && record.class_info.id}_${i}`

  render() {
    const { list, entities } = this.props
    let newList = list;
    if(list){
      newList = list.map(t=>{
        const satisfiled = entities.satisfiled[t];
        return {
          ...satisfiled,
          class_info: entities.classes[satisfiled.class_info],
          teacher_info: entities.teachers[satisfiled.teacher_info]
        }
      });
    }


    return (
      <div className="table-wrapper">
        <Table 
          rowKey={this.rowKey} 
          dataSource={newList} 
          columns={this.columns} 
          pagination={false}
          bordered
        />
      </div>
    )
  }
}

export default SatisfiedTable