import React, { Component } from 'react'
import { Table, Icon, Popover } from 'antd'
import './DataTables.css'
import { browserHistory } from 'react-router';

class DataTables extends Component {
  onRow = (record) => {
    return {
      onClick: () => {
        browserHistory.push(`/classDetail/${record.classInfo.id}`);
      },
    };
  }
  handleStopBubble = e => {
    e.stopPropagation();
  }
  renderPopoverContent = (record) => {
    return (
      <div>
        { Object.keys(record.teacherInfo).map(key => (
          <span className="marginRight20">{`${key}: ${record.teacherInfo[key]}`}</span>
        )) }
      </div>
    )
  }
  renderRate = (info, type) => {
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
  
  render() {
    const { lessonInfo: {
      currentLessonsList,
      historyLessonsList
    } } = this.props
    
    const columns = [{
      title: '班级',
      dataIndex: 'classInfo.name',
    }, {
      title: '课程状态',
      dataIndex: 'status',
      render: text => (
        <span>{text === 1 ? '进行中' : '已结束'}</span>
      )
    }, {
      title: '开课时间',
      dataIndex: 'startTime',
    }, {
      title: '老师',
      dataIndex: 'teacherInfo.nick',
      render: (text, record) => (
        <span>
          <Popover title="老师信息" content={this.renderPopoverContent(record)} trigger="click" onClick={this.handleStopBubble}>
            <Icon type="profile" />
          </Popover>&nbsp;{text}
        </span>
      )
    }, {
      title: '上课率',
      dataIndex: 'enterRate',
      render: info => {
        return this.renderRate(info, 'normal')
      }
    }, {
      title: '作业提交率',
      dataIndex: 'homeworkSubmitRate',
      render: info => {
        return this.renderRate(info, 'percent')
      }
    }, {
      title: '被点评情况',
      dataIndex: 'beCommenttedRate',
      render: info => {
        return this.renderRate(info, 'percent')
      }
    }, {
      title: '打卡率',
      dataIndex: 'signRate',
      render: info => {
        return this.renderRate(info, 'normal')
      }
    }, {
      title: '满意度',
      dataIndex: 'satisfyRate',
      render: info => {
        return this.renderRate(info, 'percent')
      }
    }];
    return (
      <div className="table-group">
        <div className="table-item">
          <div className="table-item__title">在学课程</div>
          <Table 
            onRow={this.onRow}
            rowKey={record => record.classInfo.id} 
            dataSource={currentLessonsList} columns={columns} pagination={false} bordered />
        </div>
        <div className="table-item">
          <div className="table-item__title">历史数据</div>
          <Table 
            onRow={this.onRow}
            rowKey={record => record.classInfo.id} dataSource={historyLessonsList} columns={columns} pagination={false} bordered />
        </div>
      </div>
    )
  }
}

export default DataTables