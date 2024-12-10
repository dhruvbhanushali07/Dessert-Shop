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

    // function to check whether the product is in cart or not to apply active/selected styles
    isInCart:()=>{},
})

export const DessertContextProvider=DessertContext.Provider
