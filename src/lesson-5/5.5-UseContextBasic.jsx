import React, { useContext, useState } from 'react';

const emptyUser = {};
const UserContext = React.createContext(emptyUser);

function Demo() {
  const [user, setUser] = useState(emptyUser);

  const onLogin = () => {
    setUser({ name: 'Mike' });
  };

  const onLogout = () => {
    setUser(emptyUser);
  };

  const Provider = UserContext.Provider;

  return (
    // UserContext.Provider 提供 context 值
    <Provider value={{ ...user, onLogin, onLogout }}>
      <UserLogin />
      <UserCard />
    </Provider>
  );
}

function UserLogin() {
  // 获取 UserContext 当前的值，类似于 <UserContext.Consumer />
  const user = useContext(UserContext);
  return (
    <div>
      {user.name ? (
        <button onClick={user.onLogout}>Logout</button>
      ) : (
        <button onClick={user.onLogin}>Login</button>
      )}
    </div>
  );
}

function UserCard() {
  // 获取 UserContext 当前的值，类似于 <UserContext.Consumer />
  const user = useContext(UserContext);
  return <div>{user.name ? `Hi: ${user.name}` : 'Your are not login'}</div>;
}

export default Demo;

/*
// 通过 UserContext.Consumer 注入
<UserContext.Consumer>
  {user => <UserCardWithoutContextHook user={user} />}
</UserContext.Consumer>
function UserCardWithoutContextHook(props) {
  const { user } = props;
  return <div>{user.name ? `Hi: ${user.name}` : 'Your are not login'}</div>;
}
*/
