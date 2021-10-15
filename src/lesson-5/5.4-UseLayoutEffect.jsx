import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

const getStyle = background => {
  return {
    background,
    color: '#fff',
    fontWeight: 'bold',
    display: 'block',
    textAlign: 'center',
    position: 'relative',
    lineHeight: '140px',
    width: 140,
    height: 140,
    transition: 'all 1s',
  };
};

const Box = () => {
  const eleA = useRef(null);
  const eleB = useRef(null);

  // useEffect 在渲染 DOM 前【异步】执行设置样式
  // 所以先渲染好 DOM，再设置样式，会有有动画效果
  useEffect(() => {
    eleA.current.style.transform = 'translateX(300px)';
  }, []);

  // useLayoutEffect 在渲染 DOM 前【同步】执行设置样式
  // 所以会阻塞渲染，等设置好样式后再渲染DOM，不会有动画效果
  useLayoutEffect(() => {
    eleB.current.style.transform = 'translateX(300px)';
  }, []);

  return (
    <div>
      <div style={getStyle('blue')} ref={eleA}>
        useEffect
      </div>
      <div style={getStyle('red')} ref={eleB}>
        useLayoutEffect
      </div>
    </div>
  );
};

const Demo = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Refresh</button>
      <Box key={count} />
    </div>
  );
};

export default Demo;
