import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice'
import cartReducer from './features/card/CartSlice'


export const store=configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer

    }
})

export type StoreType=ReturnType<typeof store.getState>

export type DispatchType=typeof store.dispatch