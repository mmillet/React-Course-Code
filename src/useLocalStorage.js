import React, { useState, useEffect } from 'react';

const useLocalStorage = key => {
  // 声明 value 和 setValue
  const [value, setValue] = useState(localStorage.getItem(key) || '');

  const setLocalStorageValue = value => {
    // 设置 localStorage
    localStorage.setItem(key, value);
    // 发送自定义消息
    const event = new CustomEvent('customStorage', { detail: { key, value } });
    window.dispatchEvent(event);
    // 更新 state
    setValue(value);
  };

  useEffect(() => {
    const customStorageHandler = e => {
      if (e.detail.key === key) {
        setValue(e.detail.value);
      }
    };
    // 监听storage变化
    window.addEventListener('customStorage', customStorageHandler);
    return () => {
      // 销毁监听
      window.removeEventListener('customStorage', customStorageHandler);
    };
  }, []);

  return [value, setLocalStorageValue];
};

const ComponentA = () => {
  const [value, setValue] = useLocalStorage('user');
  return (
    <div>
      <h3>Component A：</h3>
      <button onClick={() => setValue(`Mike ${Date.now()}`)}>
        Set User Mike
      </button>
      <span>{value}</span>
    </div>
  );
};

const ComponentB = () => {
  const [value, setValue] = useLocalStorage('user');
  return (
    <div>
      <h3>Component B：</h3>
      <button onClick={() => setValue(`Jack ${Date.now()}`)}>
        Set User Jack
      </button>
      <span>{value}</span>
    </div>
  );
};

export default function App() {
  const [user] = useLocalStorage('user');
  return (
    <div>
      <h2>Current User Is: {user}</h2>
      <ComponentA />
      <ComponentB />
    </div>
  );
}
