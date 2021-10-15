import React, { useEffect, useState } from 'react';
import CategoryList from './CategoryList';
import FoodList from './FoodList';
import { useFetch } from '../../../lesson-7/7.2-UseFetch';
import { useShareState, ACTION } from '../store';

const Foods = () => {
  const [tick, setTick] = useState(5);
  const { data: foods, loading } = useFetch(
    'http://120.25.62.254:9000/api/foods',
    []
  );
  const { data: orderMap } = useFetch('http://120.25.62.254:9000/api/orders', [
    tick,
  ]);
  const { dispatch } = useShareState();

  useEffect(() => {
    if (foods) {
      dispatch({
        type: ACTION.SET_FOOD_LIST,
        data: foods,
      });
    }
  }, [foods]);

  useEffect(() => {
    if (orderMap) {
      dispatch({ type: ACTION.SET_ORDER_MAP, data: orderMap });
    }
  }, [orderMap]);

  let timer;
  useEffect(() => {
    timer = setTimeout(() => {
      setTick(tick + 1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [tick]);

  return loading ? (
    <div style={{ textAlign: 'center' }}>Loading...</div>
  ) : (
    <>
      <CategoryList />
      <FoodList />
    </>
  );
};

export default Foods;
