import React from 'react';

export const DessertContext=React.createContext({
    // will contain all product with id for each product
    allDesserts:[],

    // will contain all product added to cart
    cart:[],

    // will contain list of ids of products present in cart
    allCartProductId:[],

    // function to add product in cart
    addToCart:(id)=>{},

    // function to increment or decrement quatities of product based on bool (if true then increment if false then decrement)
    updateQuantity:(id,update)=>{},

    // function to remove product from cart
    removeFromCart:()=>{},

    // function to place order and render popup
    placeOrder:()=>{},

    // function to clear cart and start new order
    startNewOrder:()=>{}

})

export const DessertContextProvider=DessertContext.Provider
