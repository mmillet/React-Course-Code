import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const onAlert = () => {
    setTimeout(() => {
      alert('Count: ' + count);
    }, 3000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={onAlert}>Show count after 3 seconds</button>
    </div>
  );
};

export default Counter;
