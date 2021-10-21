import React, { useState, useEffect } from 'react';

// 自定义 Hook
function useCount(initialCount) {
  const [count, setCount] = useState(initialCount);
  const [status, setStatus] = useState(true);
  const timerRef = useRef(0);
  // const [timer, setTimer] = useState(0);
  useEffect(() => {
    timerRef.current = setTimeout(() => setCount(count + 1), 1000);
    // setTimer(setTimeout(() => setCount(count + 1), 1000));
    return () => clearTimeout(timerRef.current);
    // return () => clearTimeout(timer);
  }, [count]);

  const toggle = () => {
    if (status) {
      clearTimeout(timer);
      setStatus(false);
    } else {
      setCount(count + 1);
      setStatus(true);
    }
    console.log('暂停');
  };

  return [status, count, toggle];
}

// 计数器组件
function Counter() {
  const [status1, count1, toggle1] = useCount(1000);
  const [status2, count2, toggle2] = useCount(2000);

  const toggle = () => {
    toggle1();
    toggle2();
  };

  return (
    <>
      <p>Count1: {count1}</p>
      <p>Count2: {count2}</p>
      <button onClick={toggle}>{status1 && status2 ? '暂停' : '启动'}</button>
    </>
  );
}

const Title = () => {
  const value = useCount(1);
  return <>{value[1] * 2}</>;
};

export default () => {
  return (
    <>
      <Counter />
      {/* <Title /> */}
    </>
  );
};
