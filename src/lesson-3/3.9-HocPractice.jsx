import React from 'react';

function widthHoc(WrappedComponent) {
  return class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        windowWidth: window.innerWidth,
      };
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
      this.setState({
        windowWidth: window.innerWidth,
      });
    };
  };
}

// @widthHoc
class Demo extends React.Component {
  render() {
    return <div>浏览器宽度：{this.props.windowWidth}</div>;
  }
}

export default widthHoc(Demo);
