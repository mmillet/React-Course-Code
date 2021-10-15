import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const useFetch = (url, dependencies) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const res = await axios.get(url);
    setLoading(false);
    if (res.status === 200 && res.data) {
      setData(res.data.data || {});
    } else {
      setError({ msg: '请求失败' });
    }
  }, dependencies);

  return { data, loading, error };
};

const User = ({ id }) => {
  const {
    data = {},
    loading,
    error,
  } = useFetch(`https://xiaozhu.run/api/user/${id}`, [id]);
  if (error) {
    return <span>{error.msg}</span>;
  }
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
