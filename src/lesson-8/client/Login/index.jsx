import React, { useEffect, useRef } from 'react';
import person from './person.svg';
import { useForm } from '../../../lesson-7/7.0-UseForm';
import { useShareState, ACTION } from '../store';

import './index.scss';

const Login = () => {
  const { data, dispatch } = useShareState();
  const [values, getFieldProps, setFieldsValue] = useForm();
  const ref = useRef();

  // 自动 focus
  useEffect(() => {
    if (data.showLogin) {
      ref.current && ref.current.focus();
    }
  }, [data.showLogin]);

  // 退出登录
  const onLogout = () => {
    dispatch({ type: ACTION.SET_USER, data: '' });
  };

  // 确认登录
  const onLogin = () => {
    dispatch({ type: ACTION.SET_USER, data: values.user });
  };

  // 登录弹框
  const onToggleLogin = (show = true) => {
    dispatch({ type: ACTION.TOGGLE_LOGIN, data: show });
  };

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
        <div
          className="order-login-modal"
          tabIndex="1"
          ref={ref}
          onKeyDown={e => {
            e.key === 'Escape' && onToggleLogin(false);
          }}
        >
          <div className="order-login-modal-content">
            <h3>登录</h3>
            <div className="order-login-modal-content-form">
              <input
                {...getFieldProps('user')}
                onKeyPress={e => e.key === 'Enter' && onLogin()}
                placeholder="请输入用户名"
              />
              {data.loginError && <p>{data.loginError}</p>}
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
