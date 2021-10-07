import React from 'react';
import './1.3-Practice.css';

class Demo extends React.Component {
  render() {
    const list = [2, 4, 6, 8, 10];
    return (
      <>
        {list.map((item, index) => {
          const isEven = index % 2 ? 'even-style' : '';
          return <p className={`line ${isEven}`}>{item}</p>;
        })}
      </>
    );
  }
}

export default Demo;
