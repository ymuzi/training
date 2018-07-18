import React, { Component } from 'react';
import MessageItemView from './MessageItem.js';
import './App.css';

const icon = require('./resource/icon_Good_B-2.png');

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      messages : [
        {
          icon: icon,
          title: '小年糕',
          descript: 'hello 小年糕',
          time: '7-18 11:14'
        },
        {
          icon: icon,
          title: '小板凳',
          descript: 'hello 小板凳',
          time: '7-18 11:15',
        },
        {
          icon: icon,
          title: '小豆包',
          descript: 'hi 小豆包',
          time: '7-17 10:00',
        }
      ],
      showDialog: false
    }
  }

  onItemClick = (message) => {
    console.log(message);
    this.setState({
      showDialog:true
    })
  }

  renderDialog = () => {
    // if(this.state.showDialog){
    //   return <DialogView />
    // }
    return null;
  }

  renderMesages = () => {
    const messageViews = this.state.messages.map((item,i) => {
      return <MessageItemView key={i} item={item} onClick={this.onItemClick}/>
    });
    return messageViews;
  }

  render() {
    return (
      <div>
        <ul className="chat-list">
        {
          this.renderMesages()
        }
        </ul>

        <nav className="chat-nav">
          <div className="chat-nav__item">
            <img className="chat-nav__item__icon" src={icon} alt="" />
            <div className="chat-nav__item__name">微信</div>
          </div>
          <div className="chat-nav__item">
            <img className="chat-nav__item__icon" src={icon} alt="" />
            <div className="chat-nav__item__name">通讯录</div>
          </div>
          <div className="chat-nav__item">
            <img className="chat-nav__item__icon" src={icon} alt="" />
            <div className="chat-nav__item__name">发现</div>
          </div>
          <div className="chat-nav__item">
            <img className="chat-nav__item__icon" src={icon} alt="" />
            <div className="chat-nav__item__name">我</div>
          </div>
        </nav>
        {this.renderDialog()}
      </div>
    );
  }
}

export default App;
