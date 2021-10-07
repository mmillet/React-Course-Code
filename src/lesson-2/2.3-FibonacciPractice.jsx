import React from 'react';

class Demo extends React.Component {
  state = {
    a: 0,
    b: 1,
    list: [0, 1],
  };

  componentDidMount() {
    setInterval(() => {
      const a = this.state.b;
      const b = this.state.a + this.state.b;
      this.setState({
        a,
        b,
        list: [...this.state.list, b],
      });
    }, 1000);

    // 为什么不能直接修改 state ？
    // this.state.times += 1;
    // setTimeout(() => {
    //   this.setState({ updated: true });
    // }, 5000);
  }

  render() {
    return <p>{this.state.list.join(', ')}</p>;
  }
}

export default Demo;
