import React, { useEffect, useState, useRef } from 'react';

import { useFetch } from '../../../lesson-7/7.2-UseFetch';
import { useShareState, ACTION } from '../store';

import CategoryList from './CategoryList';
import FoodList from './FoodList';

const useTick = timeout => {
  const [tick, setTick] = useState(1);
  const timerRef = useRef(0);
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setTick(tick + 1);
    }, timeout);
    return () => clearTimeout(timerRef.current);
  }, [tick]);
  return tick;
};

const Foods = () => {
  const { dispatch } = useShareState();
  const tick = useTick(5000);
  const { data, loading } = useFetch('https://www.xiaozhu.run/api/foods', []);
  const { data: orders } = useFetch('https://www.xiaozhu.run/api/orders', [
    tick,
  ]);

  useEffect(() => {
    data && dispatch({ type: ACTION.SET_FOODS, data });
  }, [data]);

  useEffect(() => {
    orders && dispatch({ type: ACTION.SET_ORDERS, data: orders });
  }, [orders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CategoryList />
      <FoodList />
    </div>
  );
};

export default Foods;
