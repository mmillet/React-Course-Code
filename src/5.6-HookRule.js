import React, { useEffect, useState } from 'react';

function Demo() {
  const [count, setCount] = useState(0);
  const [range, setRange] = useState('Less than 5');
  // Hook 只能放在顶层，不能放在判断条件里
  if (count > 5) {
    useEffect(() => {
      setRange('Greate than 5 ');
    });
  }

  return (
    <div>
      <p>Current Count: {count}</p>
      <p>Range: {range}</p>
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </div>
  );
}

export default Demo;
