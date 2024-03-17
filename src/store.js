import { configureStore, createSlice } from "@reduxjs/toolkit";

//generate different parts of reducer
const userSlice = createSlice(
    {
        name:  'user',  //slice name,identity
        initialState: {
            userId: null,
            email: null
        },
        reducers:{
            setUser: (state, action) => {
                state.email=action.payload.email;
                state.userId=action.payload.id;
            },
            logout: (state) => {
                state.userId=null;
                state.email=null;
            }
        }
    }
);

export const {setUser, logout} = userSlice.actions;

export const store = configureStore(
    {
        //arguments: action and previous state
        //return a new state
        reducer:{
            user:userSlice.reducer
        }
    }
);