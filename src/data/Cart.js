import { useState} from "react";
// import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const useCart = (initialVal = [], userId) => {

  const [cart, setCart] = useState(initialVal);
  const [cartQuantity,setCartQuantity] = useState(0);

  const getCart = async (cartItem) => {
    const data = (await Axios.get("http://localhost:8060/cart/api/cart/12",requestData).then((res)=>res.data));
    console.log( 'data:', data);
  }

  const postCart = async (cartItem) => {
    const requestData = {userId:userId, item:cartItem};
    const data = (await Axios.post("http://localhost:8060/cart/api/cart/create",requestData).then((res)=>res.data));
    console.log( ' sent post data:', data);
  }

  const putCart = async (cartItem) => {
    const requestData =cartItem;
    const data = (await Axios.put(`http://localhost:8060/cart/api/cart/update/${userId}`,requestData).then((res)=>res.data));
    console.log( ' sent put data:', data);
  }

// Function to set cart for a user in local storage
  const setCartForUser = (cart, itemForDB, post) => {
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    carts[userId] = cart;
    localStorage.setItem("carts", JSON.stringify(carts));
    post? postCart(itemForDB): putCart(itemForDB);
  };

// Function to get cart for a user from local storage
  const getCartForUser = () => {
    const carts = JSON.parse(localStorage.getItem("carts")) || {};
    return carts[userId] || [];
  };

  const initializeCart =()=>{
    setCart(getCartForUser());  
  }
  const initializeCartQuantity =()=>{
      saveAddCartQuantity();
    // setCartQuantity(JSON.parse(localStorage.getItem('cartQuantity')) || 0 );
  }

  const saveToCart = (updatedCart,itemForDB, post) => {
    setCartForUser(updatedCart, itemForDB, post);
    console.log("saving to cart");
    console.log('use state cart: ',cart);
    console.log('local cart: ', (localStorage.getItem("carts"))[userId]);
  };

  const saveAddCartQuantity = () => {
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
    setCartQuantity(cartQuantity);
  };

  const addToCart = (productId) => {
    setCart((prevCart) => {
      let matchingItem, itemfordb;
      let post;

      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          matchingItem = { ...item, quantity: item.quantity + 1 };
          return matchingItem;
        }
        return item;
      });
  
      if (!matchingItem) {
        matchingItem = {
          id: productId,
          quantity: 1,
          deliveryOptionId: 1,
        };

        itemfordb = {
          productId: productId,
          quantity: 1,
          deliveryDate: "12 Aug",
        };
        post = false;
      }
      else{
        itemfordb={
          productId: productId,
          quantity :matchingItem.quantity,
          deliveryDate: "12 Aug"
        }
        post = false;
      }
      
      updatedCart.push(matchingItem);
      saveToCart(updatedCart,itemfordb,post);
  
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    const matchingIndex = cart.findIndex((item) => item.id === productId);
    if (matchingIndex !== -1) {
      cart.splice(matchingIndex, 1);
      saveToCart(cart);
      setCart([...cart]);
    }
  };

  const updateDeliveryOption = (productId, deliveryOptionId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, deliveryOptionId };
      }
      return item;
    });
    saveToCart(updatedCart);
    setCart(updatedCart);
  };

  const clearCart = () =>{
    const localCarts = JSON.parse(localStorage.getItem("carts")) || {};
    delete localCarts[userId];
    localStorage.setItem("carts", JSON.stringify(localCarts));
    // localStorage.removeItem('cart');
    localStorage.removeItem('cartQuantity');
    setCart([]);
    setCartQuantity(0);
  }

  return { cart,cartQuantity, initializeCart,initializeCartQuantity, addToCart, removeFromCart, saveToCart, saveAddCartQuantity, updateDeliveryOption, clearCart, updateDeliveryOption};
};

// export let cart=JSON.parse(localStorage.getItem('cart')) || [{id:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity:1,  deliveryOptionId:2}];


// export function addToCart(productId){
//     const [cart,setCart]=useCart();
//     let matchingItem;
//     cart.forEach((item)=>{
//         if(item.id===productId){
//             matchingItem=item;
//         }
//     });

//     if(!matchingItem) {
//         matchingItem = {
//             id: productId,
//             // name: event.target.parentNode.parentNode.querySelector('.product-name').textContent,
//             // priceCents: event.target.parentNode.parentNode.querySelector('.product-price').textContent,
//             // image: event.target.parentNode.parentNode.querySelector('.product-image').src,
//             quantity: 1,
//             deliveryOptionId:1
//         };
//         cart.push(matchingItem);
//     } else {
//     matchingItem.quantity++;
//     }
//     setCart(cart);
//     saveToCart();
// }

// export function removeFromCart(productId){
//     const [cart,setCart]=useCart();
//     let matchingIndex;
//     cart.find((item,index)=>{
//         if(item.id === productId) 
//         {
//             matchingIndex=index;
//         }
//     });
//     cart.splice(matchingIndex,1);
//     setCart(cart);
//     saveToCart(cart);
// }
// export function saveToCart(cart){
//     localStorage.setItem('cart',JSON.stringify(cart));
// }

// export const saveAddCartQuantity=()=>{
//     const [cart,setCart]=useCart();
//     let cartQuantity=0;
//     cart.forEach((item)=>{
//         cartQuantity+=item.quantity;
//     });
//     localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
// }

// export function updateDeliveryOption(productId,deliveryOptionId){
//     const [cart,setCart]=useCart();
//     let matchingItem = cart.find(item => item.id == productId);
//     matchingItem.deliveryOptionId=deliveryOptionId;
//     setCart(cart);
//     saveToCart();
// }

export const deliveryOptions=[
    {
        id: 1,
        deliveryTime: 7,
        deliveryPriceCents: 0
    },
    {
        id: 2,
        deliveryTime: 3,
        deliveryPriceCents: 499
    },
    {
        id: 3,
        deliveryTime: 1,
        deliveryPriceCents: 999
    }
];