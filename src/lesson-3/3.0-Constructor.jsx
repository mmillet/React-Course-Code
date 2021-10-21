import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    //
    this.state = {
      title: 'hello' + Date.now(),
    };
  }

  render() {
    console.log(this.props);
    return <p>Constructor {this.state.title}</p>;
  }
}

export default Demo;
