import { createReducerContext } from '../../lesson-7/7.6-UseShareState';
import _ from 'lodash';
import axios from 'axios';

const initialState = {
  user: '',
  loginError: '',
  showLogin: false,
  showCartDetail: false,
  foodList: [],
  categoryList: [],
  orderMap: [],
  focusCategoryId: null,
};

const ACTION = {
  TOGGLE_LOGIN: 1, // 登录弹框
  SET_USER: 2, // 设置用户
  SET_FOOD_LIST: 3, // 设置菜品
  SET_ORDER_MAP: 4, // 设置订单
  TOGGLE_CART_DETAIL: 5, // 购物车详情
  UPDATE_ORDER: 6, // 更新订单（点餐）
  SET_FOCUS_CATEGORY_ID: 7, // 设置当前高亮的分组
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
  axios.post('https://xiaozhu.run/api/order', { user, order: userOrder });
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.TOGGLE_LOGIN:
      return {
        ...state,
        showLogin: action.data,
      };
    case ACTION.SET_USER:
      if (action.data && !/^[a-z0-9\-_]{4,20}$/.test(action.data)) {
        return {
          ...state,
          loginError: '用户名长度 4~20，包含小写字母、数字、_、-',
        };
      }
      return {
        ...state,
        loginError: '',
        showLogin: false,
        user: action.data,
      };
    case ACTION.SET_FOOD_LIST:
      return {
        ...state,
        categoryList: action.data.categoryList,
        foodList: action.data.foodList,
      };
    case ACTION.SET_ORDER_MAP:
      return {
        ...state,
        orderMap: action.data,
      };
    case ACTION.TOGGLE_CART_DETAIL:
      return {
        ...state,
        showCartDetail: action.data,
      };
    case ACTION.UPDATE_ORDER:
      const { orderMap, user } = state;
      const { id, increment } = action.data;
      if (!state.user) {
        return {
          ...state,
          showLogin: true,
        };
      }
      const newOrderMap = { ...orderMap };
      updateOrderMap(newOrderMap, user, id, increment);
      return {
        ...state,
        orderMap: newOrderMap,
      };
    case ACTION.SET_FOCUS_CATEGORY_ID:
      return {
        ...state,
        focusCategoryId: action.data,
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
