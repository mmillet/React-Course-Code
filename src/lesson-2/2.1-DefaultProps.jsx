import React from 'react';

class Content extends React.Component {
  static defaultProps = {
    title: '默认标题',
  };

  render() {
    return <div>{this.props.title}</div>;
  }
}

const Demo = () => <Content />;

// 多个 Props 可以覆盖部分

export default Demo;
