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

  timer = 0;

  componentDidMount() {
    this.timer = setInterval(() => {
      console.log(`Demo setInterval run`);
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    console.log('willUnmount');
    clearTimeout(this.timer);
  }

  render() {
    return (
      <>
        <div>父组件：{this.state.count}</div>
        <Component data={this.state} />
      </>
    );
  }
}

export default Demo;
