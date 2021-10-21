import React, { useState, useEffect } from 'react';

const Component = props => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.onAdd();
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.count]);

  return <div>Effect Hook {props.count}</div>;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [destroy, setDestroy] = useState(false);
  return (
    <div>
      {/* 点击和可以初始化和销毁组件 */}
      <button onClick={() => setDestroy(!destroy)}>
        {destroy ? 'Initialize' : 'Destroy'}
      </button>
      {/* 计数 + 1 */}
      <button onClick={() => setCount(count + 1)}>Add</button>
      {destroy ? null : (
        <Component count={count} onAdd={() => setCount(count + 1)} />
      )}
    </div>
  );
};

export default App;
