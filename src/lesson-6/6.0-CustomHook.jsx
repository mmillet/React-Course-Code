import React, { useState, useEffect } from 'react';

// 自定义 Hook
function useCount(initialCount) {
  const [count, setCount] = useState(initialCount);
  return [count, setCount];
}

// 计数器组件
function Counter() {
  const [count, setCount] = useCount(0);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </>
  );
}

export default Counter;
