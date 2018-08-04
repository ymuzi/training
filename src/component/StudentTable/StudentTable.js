import React, { Component } from 'react'
import { Table } from 'antd'
import Styles from './StudentTable.css'
import { browserHistory } from 'react-router';
class StudentTable extends Component { 
  onRow = (record) => {
    const router = this.props.router
    return {
      onClick: e => {
        browserHistory.push(`/userCenter/${record.mid}`)
      },
    };
  }
  render() {
    const { list } = this.props
    
    const columns = [
      {
        title: '',
        dataIndex: 'hurl',
        align: 'center',
        render: info => (
          <img className="table__row__avatar" src={info}/>
        )
      }, {
        title: '学员名',
        dataIndex: 'nick',
        align: 'center',
        render: info => (
          <a href="javascript:;">{info}</a>
        )
      }, {
        title: '学员编号/MID',
        dataIndex: 'mid',
        align: 'center',
      }, {
        title: '入学时间',
        dataIndex: 'enter_time',
        align: 'center',
      }, {
        title: '开课时间',
        dataIndex: 'start_time',
        align: 'center',
      }, {
        title: '在学课程',
        dataIndex: 'learning_lessons',
        align: 'center',
        render: info => {
          return <span>{info.join(' ') || '无'}</span>
        }
      }, {
        title: '负责老师',
        dataIndex: 'teachers',
        align: 'center',
        render: info => {
          return <span>{info.join(' ')|| '无'}</span>
        }
      }
    ];
    return (
      <div className="table-wrapper">
        <Table 
          onRow={this.onRow}
          rowKey={record => record.mid} 
          dataSource={list} 
          columns={columns} 
          pagination={false} 
        />
      </div>
    )
  }
}

export default StudentTable