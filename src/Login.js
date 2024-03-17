import React from 'react';
import Popup from 'reactjs-popup';
import "./styles/pages/login.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useContext } from 'react';
import { UserContext } from './App';
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from './store';

export const Login = () => {
  
  const schema = yup.object().shape({
        email: yup.string().email().required('Please enter an Email'),
        password: yup.string().required('Please enter a password')
  });

  const {register,handleSubmit, formState: {errors}, reset} = useForm(
    { resolver: yupResolver(schema) }
  );

  const {validateUser} = useContext(UserContext);
  const email=useSelector((state)=>state.user.email);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
    
  const handleClose = () => {
        setErrorMessage(null);
        reset(); // This function resets all the fields in the form
        // close();  // Close the popup
  }

    const onSubmit = (data, handleClose) => {
        try {
            const user = validateUser(data.email, data.password);
            if (!user) {
                setErrorMessage("Invalid credentials");
            } else {
                setErrorMessage(null);
                dispatch(setUser(user));
                handleClose();
                alert('Successfully logged in');
            }
        } catch (error) {
            console.error("Error while registering user:", error);
            setErrorMessage("An error occurred. Please try again later.");
        }
    }

  return (
    <Popup
    trigger={<button className="navbar-button header-link"> Login </button>}
    modal
    nested
    onClose={handleClose}
    >
    {close => {
        const closePopup = close;
        return (
      <div className="modal form-container">
        {/* <button className="close" onClick={close}>
          &times;
        </button> */}
        <div className="header brand-title"> Welcome Back!</div>
        {errorMessage && <div className='error-message'>{errorMessage}</div>}
        <div className="content form-inputs">
          <form onSubmit={handleSubmit((data) => onSubmit(data, close))}>
            <label className='form-label'>EMAIL</label>
            <input className="form-input" type="email" placeholder='Email' {...register("email")}/>
            <span>{errors.email?.message}</span>
            <label className='form-label'>PASSWORD</label>
            <input className="form-input" type="password" placeholder='Password' {...register("password")}/>
            <span>{errors.password?.message}</span>
            <button className="form-button" type='submit'>Login</button>
          </form>
        </div>
        <p>{email}</p>
      </div>
    );
    }}
  </Popup>
);
}

