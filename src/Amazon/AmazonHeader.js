import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../App';
import { CartContext } from '../App';
import { Register } from '../Register';
import { Login } from '../Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';

export const AmazonHeader = () => {
  
  const { isLoggedIn } = useContext(UserContext);
  const { cartQuantity } = useContext(CartContext) || 0;

  console.log(isLoggedIn);

  //const email=useSelector((state)=>state.user.email);
  //const loggedIn = email || false;

  const dispatch =useDispatch();
  const navigate = useNavigate();
  const handleLogout=()=>{
    dispatch(logout());
    navigate('/');
  }

  return (
    <div className="amazon-header">
        <div className='amazon-header-left-section'>
            <Link to="/" className='header-link'>
                <img className='amazon-logo' src='images/amazon-logo-white.png'/>
                <img className='amazon-mobile-logo' src='../images/amazon-mobile-logo-white.png'/>
            </Link>
        </div>

        <div className='amazon-header-middle-section'>
            <input className="search-bar" type="text" placeholder="Search"/>

            <button className="search-button">
                <img className="search-icon" src="images/icons/search-icon.png"/>
            </button>
        </div>

        <div  className='amazon-header-right-section'>
            {!isLoggedIn ? (
            <>
                <Login />
                <Register/>
            </>
            ) : (
            <>
                <p onClick={handleLogout} className='header-link'>
                <span className='logout-text' style={{margin:"0px 15px"}}>Logout</span>
                </p>
            </>
            )}
            <Link to={!isLoggedIn? "/" : "/orders"} className='orders-link header-link' >
                <span className='returns-text'>Returns</span>
                <span className='orders-text'>& Orders </span>
            </Link>
            <Link to={!isLoggedIn? "/":"/checkout"} className='cart-link heder-link'>
                <img className='cart-icon' src='images/icons/cart-icon.png'/>
                <div className='cart-quantity'>{cartQuantity}</div>
                <div className='cart-text'>Cart</div>
            </Link>
        </div>
    </div>
  );
}

