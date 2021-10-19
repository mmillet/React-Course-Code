import React from 'react';
import './2.5-StatePractice.css';

const typeEnum = {
  odd: 1,
  even: 2,
  normal: 3,
};

class Demo extends React.Component {
  state = {
    // 初始为默认展示
    type: typeEnum.normal,
  };

  render() {
    const list = [2, 4, 6, 8, 10];
    const { type } = this.state;
    return (
      <>
        <button onClick={() => this.handleChange(typeEnum.odd)}>
          奇数行加深
        </button>
        <button onClick={() => this.handleChange(typeEnum.even)}>
          偶数行加深
        </button>
        <button onClick={() => this.handleChange(typeEnum.normal)}>
          正常展示
        </button>
        {list.map((item, index) => {
          let isDeep = '';
          if (type === typeEnum.odd) {
            // 奇数行加深
            isDeep = index % 2 ? '' : 'deep-style';
          } else if (type === typeEnum.even) {
            // 偶数行加深
            isDeep = index % 2 ? 'deep-style' : '';
          }
          return (
            <p key={index} className={`line ${isDeep}`}>
              {item}
            </p>
          );
        })}
      </>
    );
  }

  handleChange = type => {
    this.setState({
      type,
    });
  };
}

export default Demo;
