import React from 'react';

class Content extends React.Component {
  render() {
    return <div>{this.props.title}</div>;
  }
}

const Demo = () => <Content title="我是标题" />;

export default Demo;
