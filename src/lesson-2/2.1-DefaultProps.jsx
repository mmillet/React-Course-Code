import React from 'react';

class Content extends React.Component {
  static defaultProps = {
    title: '默认标题',
  };

  render() {
    const { title, content } = this.props;

    return (
      <div>
        {title}
        <p>{content}</p>
      </div>
    );
  }
}

const Demo = () => <Content content="内容" />;

// 多个 Props 可以覆盖部分

export default Demo;
