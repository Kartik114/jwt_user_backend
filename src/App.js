import './App.css';
import './styles/shared/general.css';
import Axios from "axios";

import { Amazon } from './Amazon';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { Checkout } from './Checkout';
import { Orders } from './Orders';

import { useState,useEffect,createContext } from'react';
import { useCart} from './data/Cart';
import { useOrderCart } from './data/Orders';
// import { Register } from './Register';
// import { Login } from './Login';

//import { store } from './store';
import { useUsers } from './data/Users';
import { useSelector } from 'react-redux';

// import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import { useProducts } from './data/products';

export const CartContext = createContext();
export const UserContext = createContext();
export const ProductsContext = createContext();

function App() {

  const queryClient = useQueryClient(); // Get the QueryClient instance
  const {fetchProducts, products:p, setProducts} = useProducts([]);
  const {isLoading, data:products}= fetchProducts();
  
  useEffect(()=>{
      setProducts(products);
      console.log("products:",p);
  },[products]);

  const { users, initializeUsers, addToUsers, saveToUsers, validateUser} = useUsers();

  useEffect(()=>{
    initializeUsers();
  },[]);

  const userId = useSelector(state => state.user.userId);
  const [isLoggedIn, setLoggedIn]=useState(false);
  useEffect(()=>{
    setLoggedIn(!!userId);
  },[userId])

  // console.log(userId, isLoggedIn);

  const { cart,cartQuantity, initializeCart,initializeCartQuantity, addToCart, removeFromCart, saveToCart, saveAddCartQuantity, updateDeliveryOption, clearCart} = useCart([],userId);
  const {orderCart, orderQuantity, initializeOrderCart, initializeOrderQuantity, addToOrderCart, saveToOrderCart, saveAddOrderQuantity} =useOrderCart([], cart, clearCart, userId);

  useEffect(()=>{
    initializeCart();
    initializeCartQuantity();
    initializeOrderCart();
    initializeOrderQuantity();
  },[userId]);

  useEffect(()=>{
    if(userId)
      saveAddCartQuantity();
  },[cart]);

  useEffect(()=>{
    if(userId)
      saveAddOrderQuantity();
  },[orderCart]);

  // console.log('error:',error);
  if(isLoading){
    return (<div>loading........</div>);
  }
  
  return (
    <ProductsContext.Provider value={{products}}>
    <UserContext.Provider value={{ users, addToUsers, saveToUsers, validateUser, isLoggedIn}}>
        {isLoggedIn ? (
          <CartContext.Provider value={{ cart, cartQuantity, initializeCart, initializeCartQuantity, addToCart, removeFromCart, saveToCart, saveAddCartQuantity, updateDeliveryOption, orderCart, orderQuantity, initializeOrderCart, initializeOrderQuantity, addToOrderCart, saveToOrderCart, saveAddOrderQuantity }}>
            <div className="App">
              <Router>
                <Routes>
                  <Route path="/" element={<Amazon/>} />
                  <Route path='/checkout' element={<Checkout/>} />
                  <Route path="/orders" element= {<Orders/>} />
                </Routes>
              </Router>
            </div>
          </CartContext.Provider>
        ) : (
          <div className="App">
            <Router>
              <Routes>
                <Route path="/" element={<Amazon/>} />
              </Routes>
            </Router>
          </div>
        )}
    </UserContext.Provider>
    </ProductsContext.Provider>
  );
}

export default App;

 