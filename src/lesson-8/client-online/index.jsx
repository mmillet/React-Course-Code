import React from 'react';
import { ShareStateProvider } from './store';

import Login from './Login';
import Foods from './Foods';
import BottomCart from './BottomCart';

import './index.css';

const App = () => {
  return (
    <div className="order">
      <ShareStateProvider>
        <Login />
        <Foods />
        <BottomCart />
      </ShareStateProvider>
    </div>
  );
};

export default App;
