import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      list: [],
    };
  }

  render() {
    const { open, list } = this.state;
    return (
      <div>
        <button onClick={this.handleAdd}>加一行</button>
        <button onClick={this.handleMinus}>减一行</button>
        <button onClick={() => this.handleToggle(open)}>
          {open ? '收起' : '展开'}
        </button>
        <ul>{open ? list.map(item => <li>{item}</li>) : null}</ul>
      </div>
    );
  }

  handleAdd = () => {
    const list = this.state.list;
    list.push('line');
    this.setState({
      open: true,
      list,
    });
  };

  handleMinus = () => {
    const list = this.state.list;
    list.pop();
    this.setState({
      open: true,
      list,
    });
  };

  handleToggle = open => {
    this.setState({
      open: !open,
    });
  };
}

export default Demo;
