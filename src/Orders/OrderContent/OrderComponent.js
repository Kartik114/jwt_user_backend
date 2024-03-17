import React from 'react';
//import { products } from '../../data/products';
import { useContext } from 'react';
import { ProductsContext } from '../../App';
import { CartContext } from '../../App';

export const OrderComponent = ({order}) => {

  const {products} = useContext(ProductsContext);
  //const {cart} = useContext(CartContext);

  // const totalPrice = order.orderDetails.reduce((accumulator, item) => {
  //   return accumulator + item.priceCents;
  // }, 0);

  function formatPrice(cents){
    return (Math.round(cents)/100).toFixed(2);
  }
  return (
    <div class="order-container">

    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>{order.datePlaced}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>${formatPrice(order.totalPrice)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>{order.id}</div>
      </div>
    </div>

    <div class="order-details-grid">
       {order.orderDetails.map((orderProduct) => {
            const matchingProduct=products.find((item)=>{
                return item.id===orderProduct.productId
            })

            return (
            <OrderProduct  matchingProduct={matchingProduct} orderProduct= {orderProduct}/>
            )
        })} 
    </div>
  </div>
  );
}


const OrderProduct=({matchingProduct,orderProduct})=>{
  return (
    <>
      <div class="product-image-container">
          <img src={matchingProduct.imageUrl}/>
      </div>

      <div class="product-details">
          <div class="product-name">
              {matchingProduct.name}
          </div>
          <div class="product-delivery-date">
              Arriving on: {orderProduct.deliveryOptionId}
          </div>
          <div class="product-quantity">
              Quantity: {orderProduct.quantity}
          </div>
          <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png"/>
          <span class="buy-again-message">Buy it again</span>
          </button>
      </div>

      <div class="product-actions">
          <a href="tracking.html">
          <button class="track-package-button button-secondary">
              Track package
          </button>
          </a>
      </div>
    </>
  );
}