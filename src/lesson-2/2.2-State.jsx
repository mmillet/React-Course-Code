import React from 'react';

class Demo extends React.Component {
  state = {
    times: 0,
  };
  render() {
    return <p>{this.state.times}</p>;
  }
  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     times: this.state.times + 1,
    //   });
    // }, 1000);

    // 为什么不能直接修改 state ？
    this.setState(state =>
      // state.times ++;
      ({
        ...state,
        times: state.times + 1,
      })
    );
  }
}

export default Demo;
