import React from 'react';

class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: 'text',
    };
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
        count: {this.props.data.count} <br />
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
      this.state.count++;
      this.forceUpdate();
    }, 1000);
  }

  render() {
    // console.log(`Demo Render`, this.state.count);
    return (
      <>
        <div>父组件：{this.state.count}</div>
        <Component data={this.state} />
      </>
    );
  }
}

export default Demo;
