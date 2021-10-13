import React, { useState, useReducer, useRef, useEffect } from 'react';

/**
 * 非受控表单
 */
const FormV1 = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const [values, setValues] = useState({});
  const onGetValues = () => {
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    setValues({ name, phone });
  };
  return (
    <form>
      <p>
        <label>Name: </label>
        <input type="text" ref={nameRef} />
      </p>
      <p>
        <label>Phone: </label>
        <input type="text" ref={phoneRef} />
      </p>
      <button onClick={onGetValues}>Get Values</button>
      {/* Set Form */}
      <p>Form Values: {JSON.stringify(values)}</p>
    </form>
  );
};

/**
 * 通过基础 state hook 管理表单
 */
const FormV2 = () => {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  return (
    <form>
      <p>
        <label>Name: </label>
        <input
          type="text"
          onChange={e => setName(e.target.value)}
          value={name || ''}
        />
      </p>
      <p>
        <label>Phone: </label>
        <input
          type="text"
          onChange={e => setPhone(e.target.value)}
          value={phone || ''}
        />
      </p>
      <p>Form Values: {JSON.stringify({ name, phone })}</p>
    </form>
  );
};

/**
 * 通过 reducer 统一管理表单
 */
const formReducer = (state, action) => {
  return {
    ...state,
    ...action,
  };
};
const FormV3 = () => {
  const [values, dispatch] = useReducer(formReducer, {});
  return (
    <form>
      <p>
        <label>Name: </label>
        <input
          type="text"
          onChange={e => dispatch({ name: e.target.value })}
          value={values.name || ''}
        />
      </p>
      <p>
        <label>Phone: </label>
        <input
          type="text"
          onChange={e => dispatch({ phone: e.target.value })}
          value={values.phone || ''}
        />
      </p>
      <p>Form Values: {JSON.stringify(values)}</p>
    </form>
  );
};

/**
 * 提取自定义 Hook：UseForm
 */
export const useForm = () => {
  const formReducer = (state, action) => ({ ...state, ...action });
  const [values, dispatch] = useReducer(formReducer, {});
  const getFieldProps = (field, options) => {
    return {
      type: 'input',
      value: values[field] || '',
      onChange: e => {
        dispatch({ [field]: e.target.value });
        setTimeout(() => {
          options && options.onChange && options.onChange();
        });
      },
    };
  };

  const setFieldsValue = field => dispatch(field);

  return [values, getFieldProps, setFieldsValue];
};
const FormV4 = () => {
  const [values, getFieldProps] = useForm({});
  return (
    <form>
      <p>
        <label>Name: </label>
        <input {...getFieldProps('name')} />
      </p>
      <p>
        <label>Phone: </label>
        <input {...getFieldProps('phone')} />
      </p>
      <p>Form Values: {JSON.stringify(values)}</p>
    </form>
  );
};

const Demo = () => {
  return (
    <ul>
      <li>
        <h3>V1 非受控表单</h3>
        <FormV1 />
      </li>
      <li>
        <h3>V2 useState 受控表单</h3>
        <FormV2 />
      </li>
      <li>
        <h3>V3 useReducer 统一管理</h3>
        <FormV3 />
      </li>
      <li>
        <h3>V4 useForm 自定义 Hook</h3>
        <FormV4 />
      </li>
    </ul>
  );
};

export default Demo;
