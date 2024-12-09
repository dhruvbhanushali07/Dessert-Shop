import React from 'react';

export const DessertContext=React.createContext({
    allDesserts:[],
    cart:[{
        // id: "",
        // productName:"",
        // qty:0,
    }],
    addToCart:()=>{},
    updateQuantity:()=>{},
    removeFromCart:()=>{}
})

export const DessertContextProvider=DessertContext.Provider
