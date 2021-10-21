import React from 'react';
import './2.5-StatePractice.css';

class Demo extends React.Component {
  // @TODO

  render() {
    const list = [2, 4, 6, 8, 10];
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
}

export default Demo;
