import React from 'react';

class AppWrapper extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default AppWrapper;