import React, { useReducer, useContext } from 'react';

const initialState = {
  user: { id: 1, name: 'Lisi' },
  friends: ['LiLei', 'HanMeiMei'],
};

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

export const createReducerContext = (reducer, initialState) => {
  // 在内部定义一个 StoreContext，用于传递 store
  const StoreContext = React.createContext(initialState);

  // Provider
  const ShareStateProvider = props => {
    const [store, dispatch] = useReducer(reducer, initialState);
    return (
      <StoreContext.Provider value={{ store, dispatch }}>
        {props.children}
      </StoreContext.Provider>
    );
  };

  // 用于取数据的自定义 Hook
  const useShareState = partialFn => {
    const { store, dispatch } = useContext(StoreContext);
    return {
      data: partialFn ? partialFn(store) : store,
      dispatch,
    };
  };

  return [ShareStateProvider, useShareState];
};

// 再组件外部创建 Provider 和
const [ShareStateProvider, useShareState] = createReducerContext(
  reducer,
  initialState
);

// 用户组件
const User = () => {
  const { data, dispatch } = useShareState(store => store.user);
  return (
    <>
      <p>My name is: {data.name}</p>
      <button
        onClick={() => dispatch({ type: 'modifyName', name: 'Zhangsan' })}
      >
        Modify Name
      </button>
    </>
  );
};

// 好友列表组件
const Friends = () => {
  const { data, dispatch } = useShareState(store => store.friends);
  return (
    <>
      <p>My Friends: {data.join(', ')} </p>
      <button
        onClick={() => dispatch({ type: 'addFriends', name: 'Zhangsan' })}
      >
        Add Friends
      </button>
    </>
  );
};

const Demo = () => {
  return (
    <>
      <ShareStateProvider>
        <User />
        <Friends />
      </ShareStateProvider>
    </>
  );
};

export default Demo;
