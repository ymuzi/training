import React, { Component } from 'react'
import { Table, Icon, Popover } from 'antd'
import './DataTables.css'
import { browserHistory } from 'react-router';

function renderPopoverContent(record){
  return (
    <div>
      { Object.keys(record.teacherInfo).map((key,i) => (
        <span key={i} className="marginRight20">{`${key}: ${record.teacherInfo[key]}`}</span>
      )) }
    </div>
  )
}

function handleStopBubble(e){
  e.stopPropagation();
}

function renderRate(info, type){
  let className
  let rate
  switch(type){
    case 'normal':
      const [ times, total ] = info.split('/')
      rate = times / total
      if (rate > 0.95) {
        className = 'good-rate'
      } else if (rate < 0.8) {
        className = 'bad-rate'
      } else {
        className = 'common-rate'
      }
      return <span className={className}>{`${times}/${total}`}</span>
    case 'percent':
      rate = info
      const percentNum = Math.floor(info * 10000) / 100
      if (rate > 0.95) {
        className = 'good-rate'
      } else if (rate < 0.8) {
        className = 'bad-rate'
      } else {
        className = 'common-rate'
      }
      return <span className={className}>{`${percentNum}%`}</span>
    default:
      return <span>{info}</span>
  }
}

const columns = [{
  title: '班级',
  dataIndex: 'classInfo.name',
  key: 'classInfo.name',
}, {
  title: '课程状态',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    <span>{text === 1 ? '进行中' : '已结束'}</span>
  )
}, {
  title: '开课时间',
  dataIndex: 'startTime',
  key: 'startTime'
}, {
  title: '老师',
  dataIndex: 'teacherInfo.nick',
  key:'teacherInfo.nick',
  render: (text, record) => (
    <span>
      <Popover title="老师信息" content={renderPopoverContent(record)} trigger="click" onClick={handleStopBubble}>
        <Icon type="profile" />
      </Popover>&nbsp;{text}
    </span>
  )
}, {
  title: '上课率',
  dataIndex: 'enterRate',
  key:'enterRate',
  render: info => {
    return renderRate(info, 'normal')
  }
}, {
  title: '作业提交率',
  dataIndex: 'homeworkSubmitRate',
  key: 'homeworkSubmitRate',
  render: info => {
    return renderRate(info, 'percent')
  }
}, {
  title: '被点评情况',
  dataIndex: 'beCommenttedRate',
  key: 'beCommenttedRate',
  render: info => {
    return renderRate(info, 'percent')
  }
}, {
  title: '打卡率',
  dataIndex: 'signRate',
  key: 'signRate',
  render: info => {
    return renderRate(info, 'normal')
  }
}, {
  title: '满意度',
  dataIndex: 'satisfyRate',
  key: 'satisfyRate',
  render: info => {
    return renderRate(info, 'percent')
  }
}];

class DataTables extends Component {
  onRow = (record) => {
    return {
      onClick: () => {
        browserHistory.push(`/classDetail/${record.classInfo.id}`);
      },
    };
  }

  rowKey = record => record.classInfo.id

  render() {
    const { lessonInfo: {
      currentLessonsList,
      historyLessonsList
    },entities } = this.props
    let currentList,historyList;

    if(currentLessonsList){
      currentList = currentLessonsList.map(id=>{
        const lesson = {...entities.lessons[id]};
        const tenchersID = lesson.teacherInfo;
        const teachers = entities.teachers;
        lesson.teacherInfo = teachers[tenchersID];
        lesson.classInfo = entities.classes[lesson.classInfo];
        return lesson;
      });
    }

    if(historyLessonsList){
      historyList = historyLessonsList.map(id=>{
        const lesson = {...entities.lessons[id]};
        lesson.teacherInfo = entities.teachers[lesson.teacherInfo];
        lesson.classInfo = entities.classes[lesson.classInfo];
        return lesson;
      });
    }


    return (
      <div className="table-group">
        <div className="table-item">
          <div className="table-item__title">在学课程</div>
          <Table 
            onRow={this.onRow}
            rowKey={this.rowKey} 
            dataSource={currentList} columns={columns} pagination={false} bordered />
        </div>
        <div className="table-item">
          <div className="table-item__title">历史数据</div>
          <Table 
            onRow={this.onRow}
            rowKey={this.rowKey} dataSource={historyList} columns={columns} pagination={false} bordered />
        </div>
      </div>
    )
  }
}

export default DataTables