import React, { useContext } from 'react';
import { DessertContext } from '../context/DessertContext';



export default function MenuDisplay(){
    const {allDesserts, cart, addToCart}=useContext(DessertContext)

    return (
        <div className="menu">
            {allDesserts.map((item)=>{
                return(
                    <div className="item w-[20rem] h-[22rem] flex flex-col" key={item.id}>
                        <img src={`${item.image.mobile}`} alt={item.name} />

                    </div>
                )
            })}
        </div>
    )
}
// Dessert-Shop\src\assets\images\image-waffle-mobile.jpg