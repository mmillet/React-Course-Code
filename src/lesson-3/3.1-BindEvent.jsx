import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 }; // 初始化state
    this.handleClick = this.handleClick.bind(this); // 事件绑定
  }

  // 🤔 尝试简写？
  handleClick() {
    console.log(this.state);
  }

  render() {
    return <p onClick={this.handleClick}>Constructor</p>;
  }
}

export default Demo;
