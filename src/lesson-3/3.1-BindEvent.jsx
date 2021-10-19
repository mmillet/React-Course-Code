import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 }; // 初始化state
  }

  // 🤔 尝试简写？
  handleClick = () => {
    console.log(this);
  };

  render() {
    return <p onClick={this.handleClick}>Constructor</p>;
  }
}

export default Demo;
