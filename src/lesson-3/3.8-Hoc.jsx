import React from 'react';

const withHeader = (WrappedComponent, fullTitle) => {
  class Component extends React.PureComponent {
    render() {
      return (
        <>
          <h1>{fullTitle ? '高阶组件标题' : '标题'}</h1>
          <WrappedComponent {...this.props} username="oo" />
        </>
      );
    }
  }

  return Component;
};

class Demo extends React.Component {
  onChange = () => {
    const content = 'hello';
    console.log(`子组件 onChange`, content);
    this.props.onChange(content);
  };

  render() {
    return <div onClick={this.onChange}>内容 {this.props.username}</div>;
  }
}

const WrapperedDemo = withHeader(Demo, false);

export default () => (
  <WrapperedDemo
    username="张三"
    onChange={content => console.log('根组件 onchange', content)}
  />
);
