import React from 'react';
import _ from 'lodash';
import { ACTION, useShareState } from '../../store';

import './index.scss';

// 获取某个菜品的数量
const getCountFromOrder = (orderMap, id) => {
  return Object.keys(orderMap).reduce((sum, user) => {
    return sum + (orderMap[user][id] || 0);
  }, 0);
};

const FoodList = () => {
  const {
    data: { user, foodList, categoryList, orderMap },
    dispatch,
  } = useShareState();
  const foodGroups = _.groupBy(foodList, 'categoryId');

  const onUpdateOrder = (id, increment) => {
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
      {categoryList.map(category => {
        const categoryId = category.id;
        const categoryName = (
          categoryList.find(item => item.id === categoryId) || {}
        ).name;

        return (
          <div key={categoryId} className="order-food-list-group">
            <h3>{categoryName}</h3>
            <ul>
              {(foodGroups[categoryId] || []).map(food => {
                const count = getCountFromOrder(orderMap, food.id);
                const selfSelected = !!(orderMap[user] || {})[food.id];
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
                      {count > 0 && (
                        <>
                          <i onClick={() => onUpdateOrder(food.id, false)}>-</i>
                          <b className={selfSelected ? 'active' : ''}>
                            {count}
                          </b>
                        </>
                      )}
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
