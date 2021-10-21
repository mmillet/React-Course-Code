import React from 'react';

class Demo extends React.Component {
  state = {
    open: false,
    list: ['a', 'b'],
  };

  onChangeList = insert => {
    const { list } = this.state;
    const nextList = [...list];
    if (insert) {
      // nextList = [...list, 'line'];
      nextList.push('line');
    } else {
      nextList.pop('line');
      // nextList = list.slice(0, -1);
    }
    this.setState({ list: nextList, open: true });
  };

  onToggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.onChangeList(true)}>加一行</button>
        <button onClick={() => this.onChangeList(false)}>减一行</button>
        <button onClick={this.onToggleOpen}>{open ? '收起' : '展开'}</button>
        {!!open && (
          <ul>
            {list.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default Demo;
