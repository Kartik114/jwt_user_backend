import React from 'react';
import { OrderComponent } from './OrderContent/OrderComponent';
import { useContext } from 'react';

import { CartContext } from '../App';

export const OrdersContent = () => {
  const { orderCart} =useContext(CartContext);
  return (
    <div class="main">
        <div class="page-title">Your Orders</div>
        <div class="orders-grid">
            {orderCart.map((order) => (
                <OrderComponent order={order}/>
            ))}
            {/*implicit return */}
        </div>
    </div>
  )
}

// [{  id:"srgvedscszfcdscz", 
// datePlaced:"August 12", 
// totalPrice:100,
// orderDetails:[
//     {
//         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
//         quantity: 1, 
//         deliveryOptionId: 1
//     },
//     {
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", 
//         quantity: 1, 
//         deliveryOptionId: 1
//     }
// ]
// }];