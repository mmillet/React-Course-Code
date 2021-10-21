import React from 'react';

import './index.scss';

const BottomCart = () => {
  return (
    <div className="order-bottom-cart">
      <div className="order-bottom-cart-control">
        <i>
          <img src="https://xiaozhu.run/static/media/order.ef866849.svg" />
          <em>1115</em>
        </i>
        <b>¥57427</b>
        <button>去结算</button>
      </div>
    </div>
  );
};

export default BottomCart;
