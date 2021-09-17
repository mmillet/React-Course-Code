import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// lesson 5
import Function from './5.0-Function';
import UseStateBasic from './5.1-UseStateBasic';
import UseEffectBasic from './5.2-UseEffectBasic';
import UseEffectTimer from './5.3-UseEffectTimer';
import UseLayoutEffect from './5.4-UseLayoutEffect';
import UseContextBasic from './5.5-UseContextBasic';
import HookRule from './5.6-HookRule';

// lesson 6
import CustomHook from './6.0-CustomHook';
import UseReducerBasic from './6.1-UseReducerBasic';
import UseCallback from './6.2-UseCallback';
import UseMemo from './6.3-UseMemo';
import UseImperativeHandle from './6.4-UseImperativeHandle';
import UseEffectAsync from './6.5-UseEffectAsync';

// lesson 7
import UseForm from './7.0-UseForm';
import UseEffect from './7.1-UseEffect';
import UseFetch from './7.2-UseFetch';
import UseAsync from './7.3-UseAsync';
import UseReducer from './7.4-UseReducer';
import UseReducerAndContext from './7.5-UseReducerAndContext';
import UseShareState from './7.6-UseShareState';

// lesson 8

import './index.css';

const pages = [
  // lesson 5
  {
    lesson: 'React Hook 基础',
    title: '5.0-Function',
    Component: Function,
  },
  {
    title: '5.1-UseStateBasic',
    Component: UseStateBasic,
  },
  {
    title: '5.2-UseEffectBasic',
    Component: UseEffectBasic,
  },
  {
    title: '5.3-UseEffectTimer',
    Component: UseEffectTimer,
  },
  {
    title: '5.4-UseLayoutEffect',
    Component: UseLayoutEffect,
  },
  {
    title: '5.5-UseContextBasic',
    Component: UseContextBasic,
  },
  {
    title: '5.6-HookRule',
    Component: HookRule,
  },
  // lesson 6
  {
    lesson: 'React Hook 进阶',
    title: '6.0-CustomHook',
    Component: CustomHook,
  },
  {
    title: '6.1-UseReducerBasic',
    Component: UseReducerBasic,
  },
  {
    title: '6.2-UseCallback',
    Component: UseCallback,
  },
  {
    title: '6.3-UseMemo',
    Component: UseMemo,
  },
  {
    title: '6.4-UseImperativeHandle',
    Component: UseImperativeHandle,
  },
  {
    title: '6.5-UseEffectAsync',
    Component: UseEffectAsync,
  },
  {
    lesson: 'React Hook 应用场景',
    title: '7.0-UseForm',
    Component: UseForm,
  },
  {
    title: '7.1-UseEffect',
    Component: UseEffect,
  },
  {
    title: '7.2-UseFetch',
    Component: UseFetch,
  },
  {
    title: '7.3-UseAsync',
    Component: UseAsync,
  },
  {
    title: '7.4-UseReducer',
    Component: UseReducer,
  },
  {
    title: '7.5-UseReducerAndContext',
    Component: UseReducerAndContext,
  },
  {
    title: '7.6-UseShareState',
    Component: UseShareState,
  },
];

const App = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const Component = pages[pageIndex].Component;
  const onSetPage = index => {
    setPageIndex(index);
    window.location.hash = index;
  };

  useEffect(() => {
    const index = Number(window.location.hash.replace('#', '')) || 0;
    onSetPage(index);
  }, []);

  return (
    <div className="app">
      <ul className="menu">
        {pages.map((page, index) => (
          <li className={index === pageIndex ? 'current' : ''} key={index}>
            {page.lesson && <h3>{page.lesson}</h3>}
            <a onClick={() => onSetPage(index)}>{page.title}</a>
          </li>
        ))}
      </ul>
      <div>
        <Component />
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
