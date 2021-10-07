import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    // super();
    // console.log(this.props); // undefinded
    super(props);
    console.log(this.props);
  }
  render() {
    return <p>Constructor</p>;
  }
}

export default Demo;
