import React, { useState, memo, useCallback } from 'react';

const UserLogin = props => {
  console.log('User Component Rendering');
  return (
    <div>
      <button onClick={props.onLogin}>Login</button>
    </div>
  );
};

const Demo = () => {
  const [user, setUser] = useState('');
  const [count, setCount] = useState(1);

  const onLogin = () => {
    setUser('Zhangsan');
  };

  return (
    <div>
      <UserLogin onLogin={onLogin} />
      <h3>{user}</h3>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <span>{count}</span>
    </div>
  );
};

export default Demo;
