import React from 'react';
import { OrderSummary } from './CheckoutContent/OrderSummary';
import { PaymentSummary } from './CheckoutContent/PaymentSummary';

export const CheckoutContent = () => {
  return (
    <div class="main">
      <div class="page-title">Review your order</div>

      <div class="checkout-grid">
        <div class="order-summary js-order-summary">
            <OrderSummary key="1" />
        </div>

        <div class="payment-summary">
            <PaymentSummary key="2"/>
        </div>
      </div>
    </div>
  )
}

