import React, { Component } from 'react'
import { Button } from 'antd'
import './ButtonGroup.css'
import { browserHistory } from 'react-router';

class ButtonGroup extends Component {
  handleReturn = () => {
    browserHistory.goBack()
  }
  render() {
    const { customButtons } = this.props
    if (!customButtons) return null
    return (
      <div className="filter-buttons">
        <Button className="filter-button">汇总</Button>
        { customButtons.map((buttonName, index) => (
          <Button className="filter-button" key={index}>{buttonName}</Button>
        )) }
        <Button className="return-btn" onClick={this.handleReturn}>返回</Button>
      </div>
    )
  }
}

export default ButtonGroup