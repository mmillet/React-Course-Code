import { createReducerContext } from '../../lesson-7/7.6-UseShareState';
import _ from 'lodash';
import axios from 'axios';

const initialState = {
  user: {},
  orders: {},
  loginVisible: false,
  categoryList: [
    { name: '凉菜', id: 1 },
    { name: '酒水', id: 5 },
  ],
  foodList: [
    {
      name: '凉拌鸡丁',
      price: 20,
      id: 1,
      categoryId: 1,
      image:
        'http://p0.meituan.net/rmscashier/b42110a0b54e07d8ed86dadd6adcad9b8836.jpg',
    },
    {
      name: '手撕兔',
      price: 32,
      id: 2,
      categoryId: 1,
      image:
        'http://p0.meituan.net/rmscashier/87aeafcd9fcd590ba345f631e91f7c0912427.jpg',
    },
    {
      name: '王老吉',
      price: 5,
      id: 27,
      categoryId: 5,
      image:
        'http://p1.meituan.net/rmscashier/0262cd13289e8186f8abd2ddffdbf0ab5392.jpg',
    },
  ],
};

const ACTION = {
  SET_FOODS: 1, // 设置分类和菜品
  SET_ORDERS: 2, // 设置点餐信息
  SET_USER: 3, // 设置登录用户
  SET_LOGIN_VISIBLE: 4, // 设置是否展示登录
  UPDATE_ORDER: 5, // 点餐
};

// 更新订单
const updateOrderMap = (orderMap, user, id, increment) => {
  // 找到订单
  let userOrder = { ...(orderMap[user] || {}) };
  let count = userOrder[id] || 0;
  count += increment ? 1 : -1;
  if (count <= 0) {
    delete userOrder[id];
  } else {
    userOrder[id] = count;
  }
  if (_.isEmpty(userOrder)) {
    delete orderMap[user];
  } else {
    orderMap[user] = userOrder;
  }

  // 每次更新订单后，将该用户的点餐信息同步到服务端
  axios.post('https://xiaozhu.run/api/order', {
    user,
    order: userOrder,
  });
};

const reducer = (state, action) => {
  console.log(`action`, action);

  switch (action.type) {
    case ACTION.SET_FOODS:
      return {
        ...state,
        ...action.data,
      };
    case ACTION.SET_ORDERS:
      return {
        ...state,
        orders: action.data,
      };
    case ACTION.SET_USER:
      return {
        ...state,
        user: action.data,
      };
    case ACTION.SET_LOGIN_VISIBLE:
      return {
        ...state,
        loginVisible: action.data,
      };
    case ACTION.UPDATE_ORDER:
      const { orders, user } = state;
      const { id, increment } = action.data;
      if (!state.user.name) {
        return {
          ...state,
          loginVisible: action.data,
        };
      }
      const newOrders = { ...orders };
      updateOrderMap(newOrders, user.name, id, increment);
      return {
        ...state,
        orders: newOrders,
      };
    default:
      return state;
  }
};

const [ShareStateProvider, useShareState] = createReducerContext(
  reducer,
  initialState
);

export { ShareStateProvider, useShareState, ACTION };
