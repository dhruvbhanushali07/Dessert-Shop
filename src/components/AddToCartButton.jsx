import React, { useContext, useEffect, useState } from "react";
import { DessertContext } from "../context/DessertContext";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AddToCartButton({
  prodId,
  prodnm,
  prodpri,
  imgpath,
  cartStatus,
  itemPos,
}) {
  const { cart, addToCart, updateQuantity } = useContext(DessertContext);
  const cartbtnRef = useRef();
  const btnRef = useRef();
  const incrementlogoRef = useRef();
  const decrementLogoRef = useRef();
  
  console.log("cart button render");
  
  const handleClick = () => {
    addToCart(prodId, prodnm, prodpri, imgpath);
  };

  const onIncrement = () => {
    updateQuantity(itemPos, prodId, true);
  };
  const onDecrement = () => {
    updateQuantity(itemPos,prodId, false);
  };

  useGSAP(() => {
    if (cartStatus) {
      gsap.to(btnRef.current, {
        top: "-100%",
      });

      gsap.to(decrementLogoRef.current, {
        left: "0.5rem",
      });
      gsap.to(incrementlogoRef.current, {
        right: "0.5rem",
      });
    } else {
      gsap.to(btnRef.current, {
        top: "50%",
        y: "-50%",
      });

      gsap.to(decrementLogoRef.current, {
        left: "-100%",
      });
      gsap.to(incrementlogoRef.current, {
        right: "-100%",
      });
    }
  }, [cartStatus]);

  return (
    <div className="wrapper absolute bottom-[-1.1rem] left-[50%] translate-x-[-50%]">
      <div
        className={`relative overflow-hidden flex flex-wrap content-center justify-around  w-44 h-10 rounded-full ${
          cartStatus ? "bg-Red-primary" : "bg-white"
        } transition-all duration-200 border border-Red-primary`}
      >
        <button
          onClick={onDecrement}
          ref={decrementLogoRef}
          className="absolute top-[50%] left-[-100%] translate-y-[-50%]"
        >
          <img src="src\assets\images\icon-decrement-quantity.svg" alt="" />
        </button>

        <div className="text-white qtyDisplay">{cart[itemPos]?.qty}</div>

        <button
          ref={btnRef}
          className="absolute flex flex-wrap content-center justify-center w-full h-full gap-2 "
          onClick={handleClick}
        >
          <img src="src\assets\images\icon-add-to-cart.svg" alt="" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={onIncrement}
          ref={incrementlogoRef}
          className="absolute top-[50%] right-[-100%] translate-y-[-50%]"
        >
          <img src="src\assets\images\icon-increment-quantity.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
