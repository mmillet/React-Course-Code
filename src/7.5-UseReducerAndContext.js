import React, { useReducer, useContext } from 'react';

// 这是我们初始的数据仓库 store
const initialState = {
  user: { id: 1, name: 'Lisi' },
  friends: ['LiLei', 'HanMeiMei'],
};

// 定义一个 UserContext，用于传递 store
const UserContext = React.createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'addFriends':
      return {
        ...state,
        friends: [...state.friends, action.name],
      };
    case 'modifyName':
      return {
        ...state,
        user: { ...state.user, name: action.name },
      };
  }
};

const User = () => {
  // 通过 context 获取 store 和 dispatch
  const { store, dispatch } = useContext(UserContext);
  return (
    <>
      <p>My name is: {store.user.name}</p>
      <button
        onClick={() => dispatch({ type: 'modifyName', name: 'Zhangsan' })}
      >
        Modify Name
      </button>
    </>
  );
};

const Friends = () => {
  // 通过 context 获取 store 和 dispatch
  const { store, dispatch } = useContext(UserContext);
  return (
    <>
      <p>My Friends: {store.friends.join(', ')} </p>
      <button
        onClick={() => dispatch({ type: 'addFriends', name: 'Zhangsan' })}
      >
        Add Friends
      </button>
    </>
  );
};

export default () => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ store, dispatch }}>
        <User />
        <Friends />
      </UserContext.Provider>
      <p>Store: {JSON.stringify(store)}</p>
    </div>
  );
};
