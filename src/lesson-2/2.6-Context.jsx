import React from 'react';

// 创建 Context
const { Provider, Consumer } = React.createContext();

class Title extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Consumer>{value => <h4>{value.title}</h4>}</Consumer>
      </div>
    );
  }
}

class Content extends React.Component {
  render() {
    return (
      <>
        {/* 组件内部也可以使用 Consumer */}
        <Consumer>{value => <Title title={value.title} />}</Consumer>
        <p>Content</p>
      </>
    );
  }
}

class Demo extends React.Component {
  render() {
    return (
      // 提供 Provider
      <Provider value={{ title: 'Hello Context 44' }}>
        <Content />
      </Provider>
    );
  }
}

export default Demo;
