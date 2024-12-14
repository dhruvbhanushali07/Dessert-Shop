import React, { useContext, useEffect, useState } from "react";
import { DessertContext } from "../context/DessertContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(DessertContext);
  //   const [totalItems, setTotalItems] = useState(0);
  let totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  let orderTotal = 0;
  function calcPrice(p, q) {
    let tot = p * q;
    orderTotal += tot;
    return tot;
  }
  console.log(cart);
  
  function handleClick(id) {
    removeFromCart(id);
  }

  return (
    <>
      <div className="w-full top-4  rounded-md cart sticky bg-Rose-50 min-h-[300px] p-4">
        <h1 className="text-2xl font-bold text-Red-primary">
          Your Cart ({totalItems})
        </h1>
        <div className="cartList">
          {totalItems == 0 ? (
            <div className="flex flex-col flex-wrap content-center justify-center w-full gap-4 h-fulls emptyCart">
              <img src="src\assets\images\illustration-empty-cart.svg" alt="" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div>
              <div className="list max-h-[70vh] overflow-y-auto">
                {cart.map((item) => {
                  return (
                    <div
                      key={item.prodId}
                      className="flex content-center w-full py-4 border-b-2 rounded-sm listItem border-rose-100"
                    >
                      <div className="w-4/5 item-details">
                        <p className="mb-2 text-base font-medium">
                          {item.name}
                        </p>
                        <div className="flex flex-wrap content-center justify-between w-2/5 text-sm pricing">
                          <span className="text-Red-primary">{item.qty}x</span>
                          <span className="text-rose-500">@ ${item.price}</span>
                          <span className="text-rose-900">
                            ${calcPrice(item.price, item.qty)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap content-center justify-center w-1/5 removeitem">
                        <button
                          onClick={() => {
                            handleClick(item.prodId);
                          }}
                        >
                          <img
                            src="src\assets\images\icon-remove-item.svg"
                            alt="remove item"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between w-full p-2 text-xl orderTotal">
                <span>Order Total</span>
                <span className="text-2xl font-bold">${orderTotal}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
