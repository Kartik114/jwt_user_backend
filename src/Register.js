import React, { useState, useContext } from "react";
import './styles/pages/login.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Popup from 'reactjs-popup';
import { UserContext } from "./App";

export const Register = () => {
    
    const {addToUsers} = useContext(UserContext);

    const schema = yup.object().shape({
        userName: yup.string().required(),     
        email: yup.string().email().required('Please enter an Email'),
        // phoneNo: yup.number().positive().min(10).required('Please enter a phone number'),
        address: yup.string().required('Please enter an address'),
        password: yup.string().required('Please enter a password'),
        confirmPassword: yup.string().
            oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
    });

    const {register,handleSubmit, formState: {errors}, reset} = useForm(
        { resolver: yupResolver(schema) }
    );

    const [errorMessage, setErrorMessage] = useState(null);
    
    const handleClose = () => {
        setErrorMessage(null);
        reset(); // This function resets all the fields in the form
        // close();  // Close the popup
    }
    
    const onSubmit = (data, handleClose) => {
        try {
            const success = addToUsers(data.userName, data.email, data.address, data.password);
            if (!success) {
                setErrorMessage("User with the same email already exists");
            } else {
                setErrorMessage(null);
                handleClose();
            }
        } catch (error) {
            console.error("Error while registering user:", error);
            setErrorMessage("An error occurred. Please try again later.");
        }
    }

    return (
        <Popup 
        trigger={<button className="navbar-button header-link">Register</button>}
        modal
        nested
        onClose={handleClose}
        >
        {close=>{
            return(
                <div className="modal form-container reg-form-container">
                    <div className="header brand-title"> Welcome to Amazon!</div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="content form-inputs">
                    <form onSubmit={handleSubmit((data) => onSubmit(data, handleClose))}>
                        <label className="form-label">USERNAME </label>
                        <input className="form-input" type="text" placeholder='Username' {...register("userName")} />
                        <span>{errors.userName?.message}</span>
                        <label className="form-label">EMAIL</label>
                        <input className="form-input" type="email" placeholder='Email' {...register("email")}/>
                        <span>{errors.email?.message}</span>
                        {/* <label className="form-label">PHONE NUMBER</label>
                        <input className="form-input" type="number" placeholder='Phone No.' {...register("phoneNo")} />
                        <span>{errors.phoneNo?.message}</span> */}
                        <label className="form-label">ADDRESS</label>
                        <input className="form-input" type="text" placeholder='Address' {...register("address")} />
                        <span>{errors.address?.message}</span>
                        <label className="form-label">PASSWORD</label>
                        <input className="form-input" type="password" placeholder='Password' {...register("password")}/>
                        <span>{errors.password?.message}</span>
                        <label className="form-label">CONFIRM PASSWORD</label>
                        <input className="form-input" type="password" placeholder='Confirm Password' {...register("confirmPassword")}/>
                        <span>{errors.confirmPassword?.message}</span>
                        <button className="form-button" type='submit'>Sign Up</button>
                    </form>
                    </div>
                </div>
            );
        }}
        </Popup>
    )
}

{/* <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Username:
                        <input type="text" placeholder='Username' {...register("userName")} value={username} onChange={e => setUsername(e.target.value)} />
                        <span>{errors.userName?.message}</span>
                    </label>
                    <label>
                        Email:
                        <input type="email" placeholder='Email' {...register("email")} />
                        <span>{errors.email?.message}</span>
                    </label>
                    <label>
                        Phone Number:
                        <input type="number" placeholder='Phone No.' {...register("phoneNo")} />
                        <p>{errors.phoneNo?.message}</p>
                    </label>
                    <label>
                        Address:
                        <input type="text" placeholder='Address' {...register("address")} />
                        <span>{errors.address?.message}</span>
                    </label>
                    <label>
                        Password:
                        <input type="password" placeholder='Password' {...register("password")} />
                        <span>{errors.password?.message}</span>
                    </label>
                    <label>
                        Confirm Password:
                        <input type="password" placeholder='Confirm Password' {...register("confirmPassword")} />
                        <span>{errors.confirmPassword?.message}</span>
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button onClick={toggle}>Close</button>
            </div>
        </div> */}