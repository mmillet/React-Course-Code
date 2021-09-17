import React, { useReducer } from 'react';

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

const User = props => {
  const onModifyName = () => {
    props.dispatch({ type: 'modifyName', name: 'ZhangSan' });
  };
  return (
    <>
      <p>My name is: {props.user.name}</p>
      <button onClick={onModifyName}>Modify Name</button>
    </>
  );
};

const Friends = props => {
  const onAddFriend = () => {
    props.dispatch({ type: 'addFriends', name: 'Zhangsan' });
  };
  return (
    <>
      <p>My Friends: {props.friends.join(', ')} </p>
      <button onClick={onAddFriend}>Add Friends</button>
    </>
  );
};

const Demo = () => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <User user={store.user} dispatch={dispatch} />
      <Friends friends={store.friends} dispatch={dispatch} />
      <p>Store: {JSON.stringify(store)}</p>
    </div>
  );
};

export default Demo;
