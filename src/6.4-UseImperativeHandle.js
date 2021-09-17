import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';

// 第二个 ref 参数通过 forwardRef 转发进来
const Add = (props, ref) => {
  // 使用初始值来作为内部的 state
  const [count, setCount] = useState(props.initialCount);

  const onStateAdd = () => setCount(count + 1);

  // 暴露对应的方法
  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        setCount(props.initialCount);
      },
    }),
    []
  );

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={onStateAdd}>Add Count State</button>
    </div>
  );
};

// 调用 AddWithRef 能将 ref 传递下去
const AddWithRef = forwardRef(Add);

const Demo = () => {
  const addRef = useRef(null);
  const reset = () => addRef.current.reset();

  return (
    <>
      <AddWithRef ref={addRef} initialCount={10} />
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default Demo;
