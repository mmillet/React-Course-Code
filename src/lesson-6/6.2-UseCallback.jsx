import React, { useState, useCallback, useMemo } from 'react';

const UserLogin = React.memo(props => {
  console.log('User Component Rendering');
  return (
    <div>
      <button onClick={props.onLogin}>Login</button>
    </div>
  );
});

const Demo = () => {
  const [user, setUser] = useState('');
  const [count, setCount] = useState(1);

  const onLogin = useMemo(
    () => () => {
      console.log(count);
      setUser('Zhangsan');
    },
    [count]
  );

  // ...

  return (
    <div>
      <UserLogin onLogin={onLogin} />
      <h3 onClick={onLogin}>{user}</h3>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <span>{count}</span>
    </div>
  );
};

export default Demo;
