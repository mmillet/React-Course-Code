import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
    };
  }

  static getDerivedStateFromProps = (nextProps, nextState) => {
    return null;
  };

  render() {
    return <p>GetDerivedStateFromProps</p>;
  }
}

export default Demo;
