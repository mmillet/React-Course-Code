import React from 'react';
import { useShareState } from '../../store';

import './index.scss';

const CategoryList = () => {
  const { data: categoryList } = useShareState(state => state.categoryList);

  return (
    <div className="order-category-list">
      <ul>
        {categoryList.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
