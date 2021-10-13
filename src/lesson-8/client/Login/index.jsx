import React, { useEffect } from 'react';
import person from './person.svg';
import { useForm } from '../../../lesson-7/7.0-UseForm';
import { useShareState, ACTION } from '../store';

import './index.scss';

const Login = () => {
  const { data, dispatch } = useShareState();
  const [values, getFieldProps, setFieldsValue] = useForm();

  const onLogout = () => {
    dispatch({ type: ACTION.SET_USER, data: '' });
  };

  const onLogin = () => {
    dispatch({ type: ACTION.SET_USER, data: values.user });
    onToggleLogin(false);
  };

  const onToggleLogin = (show = true) => {
    dispatch({ type: ACTION.TOGGLE_LOGIN, data: show });
  };

  useEffect(() => {
    setFieldsValue({ user: data.user });
  }, [data.user]);

  return (
    <div className="order-login">
      <div className="order-login-user">
        {data.user ? (
          <>
            <img src={person} />
            <h2>{data.user}</h2>
            <a onClick={onLogout}>退出</a>
          </>
        ) : (
          <a onClick={() => onToggleLogin()}>登录</a>
        )}
      </div>
      {data.showLogin && (
        <div className="order-login-modal">
          <div className="order-login-modal-content">
            <h3>登录</h3>
            <div className="order-login-modal-content-form">
              <input {...getFieldProps('user')} placeholder="请输入用户名" />
            </div>
            <div className="order-login-modal-content-control">
              <button onClick={() => onToggleLogin(false)}>取消</button>
              <button onClick={onLogin}>确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
