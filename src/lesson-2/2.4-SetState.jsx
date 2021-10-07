import React from 'react';

class Demo extends React.Component {
  state = {
    number: 0,
  };
  render() {
    return <p>{this.state.number}</p>;
  }
  componentDidMount() {
    console.log('action1', this.state.number);
    this.setState(
      {
        number: this.state.number + 1,
      },
      () => {
        console.log('action3', this.state.number);
      }
    );
    console.log('action2', this.state.number);
  }
}

export default Demo;
