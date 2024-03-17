import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
// import { useContext } from 'react';
// import { CartContext } from '../App';

// export let orders = JSON.parse(localStorage.getItem('orders'))||
//                 [{  id:"srgvedscszfcdscz", 
//                     datePlaced:"August 12", 
//                     totalPrice:100,
//                     orderDetails:[
//                         {
//                             productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
//                             quantity: 1, 
//                             deliveryOptionId: 1
//                         },
//                         {
//                             productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
//                             quantity: 1, 
//                             deliveryOptionId: 1
//                         }
//                     ]
//                 }];


export const useOrderCart = (initialVal = [], cart, clearCart, userId) => {
    const [orderCart, setOrderCart] = useState(initialVal);
    const [orderQuantity,setOrderQuantity] = useState(0);
  
    const setOrderCartForUser = (orderCart) => {
        const orderCarts = JSON.parse(localStorage.getItem("orderCarts")) || {};
        orderCarts[userId] = orderCart;
        localStorage.setItem("orderCarts", JSON.stringify(orderCarts));
      };
    
    // Function to get cart for a user from local storage
    const getOrderCartForUser = () => {
        const orderCarts = JSON.parse(localStorage.getItem("orderCarts")) || {};
        return orderCarts[userId] || [];
    };

    const initializeOrderCart =()=>{
      setOrderCart(getOrderCartForUser());  
    }
    const initializeOrderQuantity =()=>{
        saveAddOrderQuantity();
      //setOrderQuantity(JSON.parse(localStorage.getItem('orderQuantity')) || 0 );
    }
  
    const saveToOrderCart = (updatedOrderCart) => {
      setOrderCartForUser(updatedOrderCart);
      //localStorage.setItem("orderCart", JSON.stringify(updatedOrderCart));
      console.log("save to order cart");
      console.log(orderCart);
      console.log((localStorage.getItem("orderCarts"))[userId]);
    };
  
    const saveAddOrderQuantity = () => {
      let orderQuantity = 0;
      orderQuantity=orderCart.length;
      localStorage.setItem("orderQuantity", JSON.stringify(orderQuantity));
      setOrderQuantity(orderQuantity);
    };
  
    const emptyCart = () => {
      clearCart();
    };

    // Function to generate a random orderId
    const generateOrderId = () => {
        return uuidv4();
    };

    const addToOrderCart = (totalPrice) => {
        const newOrder = {
            id: generateOrderId(),
            datePlaced: "12 Aug", // Implement a function to get the current date
            totalPrice: totalPrice,
            orderDetails: cart.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              deliveryOptionId: item.deliveryOptionId,
            })),
          };
        setOrderCart((prevOrders) => [...prevOrders, newOrder]);
        saveToOrderCart([...orderCart, newOrder]);
        //saveAddOrderQuantity();
        emptyCart();
    };
  
    return {orderCart, orderQuantity, initializeOrderCart, initializeOrderQuantity, addToOrderCart, saveToOrderCart, saveAddOrderQuantity};
  };
  