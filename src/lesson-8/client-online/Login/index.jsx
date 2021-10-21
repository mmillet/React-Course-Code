import React, { useRef, useEffect } from 'react';
import { useShareState, ACTION } from '../store';

import { useForm } from '../../../lesson-7/7.0-UseForm';

import './index.scss';

const Login = () => {
  const { data, dispatch } = useShareState();

  const [values, getFieldProps] = useForm({});

  const ref = useRef();

  // 自动 focus
  useEffect(() => {
    if (data.loginVisible) {
      ref.current && ref.current.focus();
    }
  }, [data.loginVisible]);

  const onLogout = () => {
    dispatch({ type: ACTION.SET_USER, data: {} });
  };

  const onLogin = () => {
    dispatch({ type: ACTION.SET_USER, data: values });
    onToggleLogin(false);
  };

  const onToggleLogin = (visible = true) => {
    console.log(`onToggleLogin`, visible);
    dispatch({ type: ACTION.SET_LOGIN_VISIBLE, data: visible });
  };

  return (
    <div className="order-login">
      <div className="order-login-user">
        {!!data.user.name ? (
          <>
            <img src="https://xiaozhu.run/static/media/person.41f311b4.svg" />
            <h2>{data.user.name}</h2>
            <a onClick={onLogout}>退出</a>
          </>
        ) : (
          <a onClick={() => onToggleLogin(true)}>登录</a>
        )}
      </div>

      {!!data.loginVisible && (
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
                placeholder="请输入用户名"
                onKeyPress={e => e.key === 'Enter' && onLogin()}
                {...getFieldProps('name')}
              />
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
