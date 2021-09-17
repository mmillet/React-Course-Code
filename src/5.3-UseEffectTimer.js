import React, { useState, useEffect } from 'react';

const Component = props => {
  // 初始化计时器
  let timer = 0;

  useEffect(() => {
    // 更新
    console.log('Update');
    // 下一秒后 +1
    timer = setTimeout(props.updateCount, 1000);
    // 销毁
    return () => {
      console.log('Destroy');
      // 清除计时器
      clearTimeout(timer);
    };
  }, [props.count, props.updateCount]);
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
        <Component count={count} updateCount={() => setCount(count + 1)} />
      )}
    </div>
  );
};

export default App;
