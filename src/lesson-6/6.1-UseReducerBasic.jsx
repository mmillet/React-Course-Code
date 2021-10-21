import React, { useReducer, useState } from 'react';

// 声明初始 state
const initialState = { count: 0, times: 0 };

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + action.num,
        times: state.times + 1,
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - action.num,
        times: state.times + 1,
      };
    case 'double':
      return { ...state, count: state.count * 2, times: state.times + 1 };
    default:
      throw new Error('Invalid dispatch type');
  }
}

// 计数器组件
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [num, setNum] = useState(1);
  return (
    <>
      <p>Count: {state.count}</p>
      <p>Times: {state.times}</p>
      <button onClick={() => dispatch({ type: 'decrement', num })}>-</button>
      <button onClick={() => dispatch({ type: 'increment', num })}>+</button>
      <button onClick={() => dispatch({ type: 'double' })}>Double</button>
      <input value={num} onChange={e => setNum(+e.target.value)} />
    </>
  );
}

export default Counter;
