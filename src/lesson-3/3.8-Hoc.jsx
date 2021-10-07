import React from 'react';

function withHeader(WrappedComponent) {
  return class HOC extends React.Component {
    render() {
      return (
        <div>
          <div className="demo-header">我是标题</div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

// @withHeader
class Demo extends React.Component {
  render() {
    return <div>内容1</div>;
  }
}

export default withHeader(Demo);
