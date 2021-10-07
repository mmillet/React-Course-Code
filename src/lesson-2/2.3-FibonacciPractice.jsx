import React from 'react';

class Demo extends React.Component {
  state = {
    a: 0,
    b: 1,
    list: [0, 1],
  };

  // @TODO

  render() {
    return <p>{this.state.list.join(', ')}</p>;
  }
}

export default Demo;
