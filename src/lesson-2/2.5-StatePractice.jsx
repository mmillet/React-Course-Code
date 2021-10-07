import React from 'react';
import './2.5-StatePractice.css';

class Demo extends React.Component {
  // @TODO

  render() {
    const list = [2, 4, 6, 8, 10];
    return (
      <>
        <button>奇数行加深</button>
        <button>偶数行加深</button>
        <button>正常展示</button>
      </>
    );
  }
}

export default Demo;
