import React from 'react';

class Content extends React.Component {
  onClick = () => {
    // this.props.title = '被我修改了';
    this.props.obj.a = 'world';
    this.forceUpdate();
  };

  render() {
    return (
      <div onClick={this.onClick}>
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
        <p>{this.props.obj.a}</p>
      </div>
    );
  }
}

const Demo = () => (
  <>
    <Content title="我是标题" content="我是内容" obj={{ a: 'hello' }} />
    {/* <Content title="我也是标题" content={undefined} /> */}
  </>
);

export default Demo;
