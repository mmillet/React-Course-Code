import React, { useRef, useEffect } from 'react';
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
    data: { user, foodList, categoryList, orderMap, focusCategoryId },
    dispatch,
  } = useShareState();

  const containerRef = useRef();
  const currentCategoryIdRef = useRef();
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

  const onScroll = e => {
    const containerEle = containerRef.current;
    if (!containerEle) {
      return;
    }
    // 当前滚动高度
    const scrollTop = containerEle.scrollTop;
    const groupEles = containerEle.querySelectorAll('.order-food-list-group');
    // 获取即将滚动到的分组（向上偏移 20 像素）
    let groupEleIndex = [...groupEles].findIndex(
      ele => ele.offsetTop - 20 > scrollTop
    );
    if (groupEleIndex > 0) groupEleIndex = groupEleIndex - 1;
    if (groupEleIndex === -1) groupEleIndex = groupEles.length - 1;
    const groupEle = groupEles[groupEleIndex];
    const currentId = Number(groupEle.dataset['categoryId']);
    currentCategoryIdRef.current = currentId;
    dispatch({ type: ACTION.SET_FOCUS_CATEGORY_ID, data: currentId });
  };

  useEffect(() => {
    !!foodList.length && onScroll();
  }, [foodList]);

  useEffect(() => {
    const containerEle = containerRef.current;
    const currentCategoryId = currentCategoryIdRef.current;
    if (
      !containerEle ||
      !focusCategoryId ||
      currentCategoryId === focusCategoryId
    ) {
      return;
    }
    const groupEle = containerEle.querySelector(
      `.order-food-list-group[data-category-id='${focusCategoryId}']`
    );
    groupEle.scrollIntoView();
  }, [focusCategoryId]);

  return (
    <div className="order-food-list" onScroll={onScroll} ref={containerRef}>
      {categoryList.map(category => {
        const categoryId = category.id;
        const categoryName = (
          categoryList.find(item => item.id === categoryId) || {}
        ).name;

        return (
          <div
            key={categoryId}
            className="order-food-list-group"
            data-category-id={categoryId}
          >
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
