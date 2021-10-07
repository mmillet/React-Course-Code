import React from 'react';

class Demo extends React.Component {
  state = {
    times: 0,
    updated: false,
  };
  render() {
    return <p>{this.state.times}</p>;
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        times: this.state.times + 1,
      });
    }, 1000);

    // 为什么不能直接修改 state ？
    // this.state.times += 1;
    // setTimeout(() => {
    //   this.setState({ updated: true });
    // }, 5000);
  }
}

export default Demo;
