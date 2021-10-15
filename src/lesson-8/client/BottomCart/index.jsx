import React from 'react';
import _ from 'lodash';
import { useShareState, ACTION } from '../store';

import orderImage from './order.png';
import './index.scss';

const BottomCart = () => {
  const {
    data: { showCartDetail, orderMap, foodList },
    dispatch,
  } = useShareState();

  const foodMap = _.reduce(
    foodList,
    (map, food) => {
      map[food.id] = food;
      return map;
    },
    {}
  );
  let totalMoney = 0;
  let totalCount = 0;
  const userOrderList = Object.keys(orderMap).map(user => {
    const userOrder = orderMap[user];
    let money = 0;
    const orders = Object.keys(userOrder).map(id => {
      const food = foodMap[id];
      const count = userOrder[id];
      money += food.price * count;
      totalCount += count;
      totalMoney += money;
      return { food, count };
    });
    return {
      money,
      user,
      orders,
    };
  });

  return (
    <div className="order-bottom-cart">
      {showCartDetail && (
        <div className="order-bottom-cart-detail">
          {userOrderList.map(userOrder => {
            return (
              <div
                className="order-bottom-cart-detail-item"
                key={userOrder.user}
              >
                <h4>{userOrder.user}</h4>
                <b>¥{userOrder.money}</b>
                <ul>
                  {userOrder.orders.map(order => {
                    return (
                      <li key={order.food.id}>
                        <span>{order.food.name}</span>
                        <i></i>
                        <em>{order.count}</em>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
      <div className="order-bottom-cart-control">
        <i
          onClick={() =>
            dispatch({
              type: ACTION.TOGGLE_CART_DETAIL,
              data: !showCartDetail,
            })
          }
        >
          <img src={orderImage} />
          <em>{totalCount}</em>
        </i>
        <b>¥{totalMoney}</b>
        <button>去结算</button>
      </div>
    </div>
  );
};

export default BottomCart;
