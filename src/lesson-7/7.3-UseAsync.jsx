import axios from 'axios';
import React, { useState, useEffect } from 'react';

import _ from 'lodash';

const hello = () => {
  console.log('在吗？');
};

window.debouncedHello = _.debounce(hello, 1000);

window.throttledHello = _.throttle(hello, 2000);

export const useAsync = (promiseFn, dependencies, debounceTimeout) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setLoading(true);
    try {
      setData(await promiseFn());
    } catch (e) {
      setError(error);
    }
    setLoading(false);
    return () => setError(null);
  }, dependencies);
  return { data, loading, error };
};

const getUserPromise = async id => {
  const res = await axios.get(`https://xiaozhu.run/api/user/${id}`);
  return res.data.data;
};

const timeoutPromise = timeout =>
  new Promise(resolve => setTimeout(resolve, timeout));

const User = ({ id }) => {
  const { data = {}, loading } = useAsync(async () => {
    await timeoutPromise(1000);
    return await getUserPromise(id);
  }, [id]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      <li>Email: {data.email}</li>
      <li>Name: {data.username}</li>
    </ul>
  );
};

const Demo = () => {
  const [count, setCount] = useState(9527);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>GetUser {count}</button>
      <User id={count} />
    </>
  );
};

export default Demo;
