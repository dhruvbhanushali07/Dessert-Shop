import React, { useContext } from 'react';
import { DessertContext } from '../context/DessertContext';

export default function AddToCartButton({prodId}){
    const {addToCart}=useContext(DessertContext)
    const handleClick=()=>{
        addToCart(prodId)
    }
    return (
        <div className="absolute bottom-[-1.1rem] left-[50%] translate-x-[-50%] w-40 h-10 rounded-full bg-Rose-50 border border-Red-primary">
            <button className='flex flex-wrap content-center justify-center w-full h-full gap-2 ' onClick={handleClick}> 
                <img src="src\assets\images\icon-add-to-cart.svg" alt="" />
                Add to Cart
            </button>
        </div>
    )
}