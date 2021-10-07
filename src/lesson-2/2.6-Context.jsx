import React from 'react';

// 创建 Context
const { Provider, Consumer } = React.createContext();

class Content extends React.Component {
  render() {
    return (
      <>
        {/* 组件内部也可以使用 Consumer */}
        <h3>{this.props.title}</h3>
      </>
    );
  }
}

class Demo extends React.Component {
  render() {
    return (
      // 提供 Provider
      <Provider value={{ title: 'Hello Context' }}>
        {/* 通过 Consumer 将值传递下去 */}
        <Consumer>{value => <Content title={value.title} />}</Consumer>
      </Provider>
    );
  }
}

export default Demo;
