import { useCart, deliveryOptions, removeFromCart, saveAddCartQuantity, updateDeliveryOption } from '../../data/Cart.js';
//import { products } from '../../data/products.js';
import dayjs from 'dayjs';
import OrderComponent from './OrderSummary/OrderComponent.js';
import { useContext } from 'react';
import { ProductsContext } from '../../App.js';
import { CartContext } from '../../App.js';

export const OrderSummary =()=>{
    const {products} =useContext(ProductsContext);

    const {cart}=useContext(CartContext);
    // console.log("ordersummary");
    // console.log(cart);
    const OrderComponents = cart.map((item) => {
        let matchingProduct = products.find((product) => product.id === item.id);
    
        const deliveryOptionId = item.deliveryOptionId;
        const deliveryOption = deliveryOptions.find((option) => option.id === deliveryOptionId);
    
        let dateString = '';
        if (deliveryOption) {
          const today = dayjs();
          const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
          dateString = deliveryDate.format('dddd,MMMM d') || 'Tuesday, June 21';
        }
    
        return (
          <OrderComponent
            key={item.id}
            dateString={dateString}
            matchingProduct={matchingProduct}
            item={item}
          />
        );
      });

      return (
        <>
            {OrderComponents}
        </>
    );
}