import React from 'react';

import { useShareState } from '../../store';

import './index.scss';

const CategoryList = () => {
  const { data: categoryList, dispatch } = useShareState(
    state => state.categoryList
  );

  console.log(`categoryList`, categoryList);

  return (
    <div className="order-category-list">
      <ul>
        {categoryList.map(category => {
          return <li key={category.id}>{category.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
