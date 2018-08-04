import React from 'react';
export default class extends React.PureComponent{
  onClick = () => {
    const {onClick,className,children, ...attr } = this.props;
    onClick && onClick(attr);
  }
  render(){
    return(
      <span  className={this.props.className} onClick={this.onClick}>{this.props.children}</span>
    )
  }
}