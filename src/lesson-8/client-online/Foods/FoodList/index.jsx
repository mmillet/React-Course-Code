import React from 'react';
import _ from 'lodash';

import { useShareState, ACTION } from '../../store';

import './index.scss';

// 获取某个菜品的数量
const getCountFromOrder = (orderMap, id) => {
  return Object.keys(orderMap).reduce((sum, user) => {
    return sum + (orderMap[user][id] || 0);
  }, 0);
};

const FoodList = () => {
  const { data, dispatch } = useShareState();
  const group = _.groupBy(data.foodList, 'categoryId');
  const categoryIdList = Object.keys(group);

  const onUpdateOrder = (id, increment) => {
    console.log(`onUpdateOrder`, id, increment);
    dispatch({
      type: ACTION.UPDATE_ORDER,
      data: {
        id,
        increment,
      },
    });
  };

  return (
    <div className="order-food-list">
      {categoryIdList.map(categoryId => {
        const category =
          data.categoryList.find(
            category => category.id === Number(categoryId)
          ) || {};

        return (
          <div className="order-food-list-group" key={categoryId}>
            <h3>{category.name}</h3>
            <ul>
              {group[categoryId].map(food => {
                const totalCount = getCountFromOrder(data.orders, food.id);
                const selfSelected = !!(data.orders[data.user.name] || {})[
                  food.id
                ];
                return (
                  <li key={food.id}>
                    <div className="order-food-list-image">
                      <img src={food.image} />
                    </div>
                    <div className="order-food-list-meta">
                      <h3>{food.name}</h3>
                      <em>¥{food.price}</em>
                    </div>
                    <div className="order-food-list-control">
                      <i onClick={() => onUpdateOrder(food.id, false)}>-</i>
                      <b className={selfSelected ? 'active' : ''}>
                        {totalCount}
                      </b>
                      <i onClick={() => onUpdateOrder(food.id, true)}>+</i>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default FoodList;
