import React from 'react'
import './styles/pages/checkout/checkout-header.css';
import './styles/pages/checkout/checkout.css';

import { CheckoutHeader } from './Checkout/CheckoutHeader';
import { CheckoutContent } from './Checkout/CheckoutContent';
// import { useContext } from 'react';
// import { CartContext } from './App';

export const Checkout = () => {
  console.log('Checkout');
//   const { cartQuantity,saveAddCartQuantity } = useContext(CartContext);
//   saveAddCartQuantity();
  return (
    <>
        <CheckoutHeader/>
        <CheckoutContent/>
    </>
  );
}

