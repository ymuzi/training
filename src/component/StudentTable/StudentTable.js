/*eslint no-script-url: 0*/
import React, { Component } from 'react'
import { Table } from 'antd'
import { browserHistory } from 'react-router';

const columns = [
  {
    title: '',
    dataIndex: 'hurl',
    key:'hurl',
    align: 'center',
    render: info => (
      <img className="table__row__avatar" src={info} alt=''/>
    )
  }, {
    title: '学员名',
    dataIndex: 'nick',
    key:'nick',
    align: 'center',
    render: info => (
      <a href="javascript:;">{info}</a>
    )
  }, {
    title: '学员编号/MID',
    dataIndex: 'mid',
    key:'mid',
    align: 'center',
  }, {
    title: '入学时间',
    dataIndex: 'enter_time',
    key:'enter_time',
    align: 'center',
  }, {
    title: '开课时间',
    dataIndex: 'start_time',
    key:'start_time',
    align: 'center',
  }, {
    title: '在学课程',
    dataIndex: 'learning_lessons',
    key: 'learning_lessons',
    align: 'center',
    render: info => {
      return <span>{info.join(' ') || '无'}</span>
    }
  }, {
    title: '负责老师',
    dataIndex: 'teachers',
    key: 'teachers',
    align: 'center',
    render: info => {
      return <span>{info.join(' ')|| '无'}</span>
    }
  }
];

class StudentTable extends Component { 
  onRow = (record) => {
    return {
      onClick: () => {
        browserHistory.push(`/userCenter/${record.mid}`);
      },
    };
  }
  
  render() {
    const { list } = this.props    
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