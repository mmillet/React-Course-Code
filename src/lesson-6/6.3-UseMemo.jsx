// 计算税率
import React, { useState, useMemo, useRef } from 'react';

const pow = a => {
  console.log('pow is called');
  return a * a;
};

//
const Content = props => {
  console.log('Content is rendered');
  return <div>Large Component {props.visible ? 'show' : 'hide'}</div>;
};

const Demo = () => {
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(false);

  // 每次 Toggle 都会执行
  // const result = pow(count);

  const result = useMemo(() => pow(count), [count]);

  const MemoizedContent = (
    <>
      <h3>This is Content:</h3>
      <Content visible={visible} />
    </>
  );

  return (
    <div>
      <p>
        The compute result of {count} is
        <b style={{ color: 'red' }}> {result}</b>
      </p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      {/* 每次 Add 都会渲染 */}
      {MemoizedContent}
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  const countRef = useRef(0);

  const onAlert = () => {
    setTimeout(() => {
      alert('Count: ' + countRef.current);
    }, 3000);
  };

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          countRef.current = count + 1;
          setCount(count + 1);
        }}
      >
        ADD
      </button>
      <button onClick={onAlert}>Show Count {count}</button>
    </div>
  );
};

export default Counter;
