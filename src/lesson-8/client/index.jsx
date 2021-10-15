import React from 'react';
import Login from './Login';
import BottomCart from './BottomCart';
import Foods from './Foods';
import { ShareStateProvider } from './store';

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
