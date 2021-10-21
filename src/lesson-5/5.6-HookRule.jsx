import React, { useEffect, useState } from 'react';

function Demo() {
  const [count, setCount] = useState({ value: 0 });
  const [range, setRange] = useState('Less than 5');
  // Hook 只能放在顶层，不能放在判断条件里
  useEffect(() => {
    if (count.value > 5) {
      setRange('Greate than 5 ');
    }
  }, [count]);

  return (
    <div>
      <p>Current Count: {count.value}</p>
      <p>Range: {range}</p>
      <button
        onClick={() => {
          setCount({ ...count, value: count.value + 1 });
        }}
      >
        ADD
      </button>
    </div>
  );
}

export default Demo;
