import React from 'react'
import { useContext } from 'react';
import { ProductsContext } from '../../App';
import { CartContext } from '../../App';
//import { products } from '../../data/products';
import { deliveryOptions } from '../../data/Cart';
import { useNavigate } from 'react-router-dom';

export const PaymentSummary = () => {

    const {products} = useContext(ProductsContext);

    const navigate = useNavigate();
    const {cart, cartQuantity, addToOrderCart}=useContext(CartContext);

    let itemsPrice=0;
    let shippingPrice=0;
    cart.forEach((item)=>{

        const matchingProduct=products.find((product)=>{
            return product.id === item.id;
        });

        itemsPrice+=item.quantity*matchingProduct.price;
    
        const deliveryOption=deliveryOptions.find((deliveryOption)=>{
            return deliveryOption.id == item.deliveryOptionId;
        });
        //console.log(deliveryOption);
        shippingPrice+=deliveryOption.deliveryPriceCents;
    });
    const totalPrice=itemsPrice+shippingPrice;
    //console.log(totalPrice);
    const tax=(totalPrice*0.01);
    //console.log(tax);
    const taxPrice=totalPrice+tax;
    console.log(taxPrice);

    function formatPrice(cents){
        return (Math.round(cents)/100).toFixed(2);
    }

    function handlePlaceOrder(taxPrice){
      if (taxPrice){
        addToOrderCart(taxPrice);
        navigate('/orders');
      }
    }

  return (
    <>
      <div className="payment-summary-title">
        Order Summary
      </div>

      <div className="payment-summary-row">
        <div>Items ({cartQuantity}):</div>
        <div className="payment-summary-money">${formatPrice(itemsPrice)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">${formatPrice(shippingPrice)}</div> 
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">${formatPrice(totalPrice)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">${formatPrice(tax)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">${formatPrice(taxPrice)}</div>
      </div>

      <button className="place-order-button button-primary" onClick={()=>handlePlaceOrder(taxPrice)}>
        Place your order
      </button>
    </>
  );
}



