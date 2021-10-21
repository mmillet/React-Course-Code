import React from 'react';

function widthHoc(WrappedComponent) {
  return class HocComponent extends React.PureComponent {
    state = {
      windowWidth: 0,
    };

    setWindowWith = () => {
      this.setState({ windowWidth: window.innerWidth });
    };

    componentDidMount() {
      window.addEventListener('resize', this.setWindowWith);
      this.setWindowWith();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.setWindowWith);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          windowWidth={this.state.windowWidth}
        />
      );
    }
  };
}

function dragHoc(WrappedComponent) {
  return WrappedComponent;
}

class Demo extends React.Component {
  render() {
    return <div>浏览器宽度：{this.props.windowWidth}</div>;
  }
}

const User = props => <div>User：{props.windowWidth}</div>;

const WidthDemo = dragHoc(widthHoc(Demo));
const WidthUser = widthHoc(User);

export default () => {
  return (
    <>
      <WidthDemo />
      <WidthUser />
    </>
  );
};
