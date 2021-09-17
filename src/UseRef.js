
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

const Add = (props, ref) => {
  const [count, setCount] = useState(props.initialCount);
  const countRef = useRef(props.initialCount);

  const onStateAdd = () => {
    // 更新 count state
    setCount(count + 1);
  }

  const onRefAdd = () => {
    // 更新 ref
    countRef.current = countRef.current + 1;
  }

  useImperativeHandle(ref, () => ({
    reset: () => {
      countRef.current = props.initialCount;
      setCount(props.initialCount);
    }
  }));

  useEffect(() => {
    console.log('initial');
  }, []);

  return <div>
    <button onClick={onStateAdd}>Add Count State</button>
    <div>count: {count}</div>
    <button onClick={onRefAdd}>Add Count Ref</button>
    <div>current: {countRef.current}</div>
  </div>;
}

const Demo = () => {
  const addRef = useRef(null);
  const reset = () => addRef.current.reset();
  const AddWithRef = forwardRef(Add);
  return <>
    <Add ref={addRef} initialCount={10} />
    <button onClick={reset}>Reset</button>
  </>;
}

export default Demo;

