import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../App';

export const CheckoutHeader = () => {

  const { cartQuantity,saveAddCartQuantity } = useContext(CartContext);
  // saveAddCartQuantity();

  return (
    <div className="checkout-header">
      <div className="header-content">

        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="amazon-logo" src="images/amazon-logo.png"/>
            <img className="amazon-mobile-logo" src="images/amazon-mobile-logo.png"/>
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link to="/" className="return-to-home-link">{cartQuantity} items</Link>)
        </div>

        <div className="checkout-header-right-section">
        <Link className='return-to-home-link' to="/orders">
            <img src="images/icons/checkout-lock-icon.png"/>
            <span className="orders-textt">Orders</span>
        </Link>
        </div>

      </div>
    </div>
  );
}

