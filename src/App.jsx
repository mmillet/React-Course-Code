import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// lesson 1
import Component from './lesson-1/1.0-Component';
import Jsx from './lesson-1/1.1-Jsx';
import Express from './lesson-1/1.2-Express';
import ReactPractice from './lesson-1/1.3-Practice';

// lesson 2
import Props from './lesson-2/2.0-Props';
import DefaultProps from './lesson-2/2.1-DefaultProps';
import State from './lesson-2/2.2-State';
import FibonacciPractice from './lesson-2/2.3-FibonacciPractice';
import SetState from './lesson-2/2.4-SetState';
import StatePractice from './lesson-2/2.5-StatePractice';
import Context from './lesson-2/2.6-Context';
import Ref from './lesson-2/2.7-Ref';
import Event from './lesson-2/2.8-Event';
import EventPractice from './lesson-2/2.9-Practice';

// lesson 3
import Constructor from './lesson-3/3.0-Constructor';
import BindEvent from './lesson-3/3.1-BindEvent';
import GetDerivedStateFromProps from './lesson-3/3.2-GetDerivedStateFromProps';
import ComponentDidMount from './lesson-3/3.3-ComponentDidMount';
import ShouldComponentUpdate from './lesson-3/3.4-ShouldComponentUpdate';
import ComponentDidUpdate from './lesson-3/3.5-ComponentDidUpdate';
import Form from './lesson-3/3.6-Form';
import FormRef from './lesson-3/3.7-FormRef';
import Hoc from './lesson-3/3.8-Hoc';
import HocPractice from './lesson-3/3.9-HocPractice';

// lesson 4
import Lesson4 from './lesson-4';

// lesson 5
import Function from './lesson-5/5.0-Function';
import UseStateBasic from './lesson-5/5.1-UseStateBasic';
import UseEffectBasic from './lesson-5/5.2-UseEffectBasic';
import UseEffectTimer from './lesson-5/5.3-UseEffectTimer';
import UseLayoutEffect from './lesson-5/5.4-UseLayoutEffect';
import UseContextBasic from './lesson-5/5.5-UseContextBasic';
import HookRule from './lesson-5/5.6-HookRule';
import ClockPractice from './lesson-5/5.7-Practice';

// lesson 6
import CustomHook from './lesson-6/6.0-CustomHook';
import UseReducerBasic from './lesson-6/6.1-UseReducerBasic';
import UseCallback from './lesson-6/6.2-UseCallback';
import UseMemo from './lesson-6/6.3-UseMemo';
import UseImperativeHandle from './lesson-6/6.4-UseImperativeHandle';
import UseEffectAsync from './lesson-6/6.5-UseEffectAsync';
import ClockPracticeV2 from './lesson-6/6.6-Practice';

// lesson 7
import UseForm from './lesson-7/7.0-UseForm';
import UseEffect from './lesson-7/7.1-UseEffect';
import UseFetch from './lesson-7/7.2-UseFetch';
import UseAsync from './lesson-7/7.3-UseAsync';
import UseReducer from './lesson-7/7.4-UseReducer';
import UseReducerAndContext from './lesson-7/7.5-UseReducerAndContext';
import UseShareState from './lesson-7/7.6-UseShareState';
import ClockPracticeV3 from './lesson-7/7.7-Practice';

// lesson 8
import Lesson8 from './lesson-8/client';

import './App.css';

const pages = [
  // lesson 1
  {
    lesson: '1. React 初探',
    title: '1.0-Component',
    Component: Component,
  },
  {
    title: '1.1-Jsx',
    Component: Jsx,
  },
  {
    title: '1.2-Express',
    Component: Express,
  },
  {
    title: '1.3-Practice',
    Component: ReactPractice,
  },
  // lesson 2
  {
    lesson: '2. React 基础精讲',
    title: '2.0-Props',
    Component: Props,
  },
  {
    title: '2.1-DefaultProps',
    Component: DefaultProps,
  },
  {
    title: '2.2-State',
    Component: State,
  },
  {
    title: '2.3-FibonacciPractice',
    Component: FibonacciPractice,
  },
  {
    title: '2.4-SetState',
    Component: SetState,
  },
  {
    title: '2.5-StatePractice',
    Component: StatePractice,
  },
  {
    title: '2.6-Context',
    Component: Context,
  },
  {
    title: '2.7-Ref',
    Component: Ref,
  },
  {
    title: '2.8-Event',
    Component: Event,
  },
  {
    title: '2.9-Practice',
    Component: EventPractice,
  },
  // lesson 3
  {
    lesson: '3. React 进阶',
    title: '3.0-Constructor',
    Component: Constructor,
  },
  {
    title: '3.1-BindEvent',
    Component: BindEvent,
  },
  {
    title: '3.2-GetDerivedStateFromProps',
    Component: GetDerivedStateFromProps,
  },
  {
    title: '3.3-ComponentDidMount',
    Component: ComponentDidMount,
  },
  {
    title: '3.4-ShouldComponentUpdate',
    Component: ShouldComponentUpdate,
  },
  {
    title: '3.5-ComponentDidUpdate',
    Component: ComponentDidUpdate,
  },
  {
    title: '3.6-Form',
    Component: Form,
  },
  {
    title: '3.7-FormRef',
    Component: FormRef,
  },
  {
    title: '3.8-Hoc',
    Component: Hoc,
  },
  {
    title: '3.9-HocPractice',
    Component: HocPractice,
  },
  // lesson 4
  {
    lesson: '4. React 实战',
    title: '4.0-计算器',
    Component: Lesson4,
  },
  // lesson 5
  {
    lesson: '5. React Hook 基础',
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
  {
    title: '5.7-Practice',
    Component: ClockPractice,
  },
  // lesson 6
  {
    lesson: '6. React Hook 进阶',
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
    title: '6.6-Practice',
    Component: ClockPracticeV2,
  },
  // lesson 7
  {
    lesson: '7. React Hook 应用场景',
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
  {
    title: '7.7-Practice',
    Component: ClockPracticeV3,
  },
  // lesson 8
  {
    lesson: '8. React Hook 实战',
    title: '8.0-多人点餐',
    Component: Lesson8,
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
      <div className="content">
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
