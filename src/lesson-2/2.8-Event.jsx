import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  render() {
    return (
      <div>
        <p onClick={this.handleClick}>{this.state.value}</p>
        <input
          value={this.state.value}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />
      </div>
    );
  }

  handleClick = e => {
    console.log('点击事件对象', e);
  };

  handleFocus = () => {
    this.setState({
      value: '聚焦初始值',
    });
  };

  handleChange = e => {
    console.log(e);
    this.setState({
      value: e.target.value,
    });
  };
}

export default Demo;
