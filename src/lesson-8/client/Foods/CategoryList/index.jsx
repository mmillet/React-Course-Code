import React from 'react';
import { useShareState, ACTION } from '../../store';

import './index.scss';

const CategoryList = () => {
  const {
    data: { categoryList, focusCategoryId },
    dispatch,
  } = useShareState();

  const onScrollToCategory = categoryId => {
    dispatch({ type: ACTION.SET_FOCUS_CATEGORY_ID, data: categoryId });
  };

  return (
    <div className="order-category-list">
      <ul>
        {categoryList.map(category => (
          <li
            key={category.id}
            className={focusCategoryId === category.id ? 'active' : ''}
            onClick={() => onScrollToCategory(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
