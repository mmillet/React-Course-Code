import React from 'react';

function widthHoc(WrappedComponent) {
  // @TODO：改写返回值，实现高阶组件
  return WrappedComponent;
}

// @widthHoc
class Demo extends React.Component {
  render() {
    return <div>浏览器宽度：{this.props.windowWidth}</div>;
  }
}

export default widthHoc(Demo);
