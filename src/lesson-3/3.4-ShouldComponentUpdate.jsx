import React from 'react';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'text',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.text === nextState.text) {
      return false;
    }
    return true;
  }

  // PureComponent
  componentDidMount() {
    console.log('Component componentDidMount');
    this.setState({
      text: 'mounted',
    });
  }

  render() {
    console.log('Component Render', this.state.text);
    return (
      <p>
        count: {this.props.count} <br />
        text: {this.state.text}
      </p>
    );
  }
}

class Demo extends React.Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    setInterval(() => {
      // console.log(`Demo setInterval run`);
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
  }

  render() {
    // console.log(`Demo Render`, this.state.count);
    return <Component count={this.state.count} />;
  }
}

export default Demo;
