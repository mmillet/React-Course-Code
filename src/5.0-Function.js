import React from 'react';

function Counter(props) {
  return (
    <div>
      {/* 展示计数 */}
      <p>Count: {props.count}</p>
      {/* 计数 + 1，交给外部实现 */}
      <button onClick={props.addCount}>Add</button>
    </div>
  );
}

// 默认值
Counter.defaultProps = {
  count: 10,
};

const Example = () => {
  return <Counter />;
};

export default Example;
