// 计算税率
import React, { useState, useMemo } from 'react';

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
  const result = pow(count);

  // const result = useMemo(() => pow(count), [count]);
  // const MemoizedContent = useMemo(
  //   () => <Content visible={visible} />,
  //   [visible]
  // );

  return (
    <div>
      <p>
        The compute result of {count} is
        <b style={{ color: 'red' }}> {result}</b>
      </p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={() => setVisible(!visible)}>Toggle</button>
      {/* 每次 Add 都会渲染 */}
      <Content visible={visible} />
    </div>
  );
};

export default Demo;
