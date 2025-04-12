import React, { useContext } from "react";
import { DessertContext } from "../context/DessertContext";

export default function ConfirmOrderPopup() {
  const { cart,startNewOrder } = useContext(DessertContext);
  let totalamt = 0;
  function calcPrice(qty, pri) {
    let amt = qty * pri;
    totalamt += amt;
    return amt;
  }
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-[100vh] bg-black/40 flex flex-wrap content-end tablet:justify-center tablet:content-center ">
      <div className="w-full tablet:w-3/5 tablet:h-4/5 laptop:h-[85%] justify-center p-4  flex flex-col gap-6 tablet:gap-4 laptop:w-[35%]  laptop:p-6 laptop:gap-4 h-[90%] rounded-xl popup bg-white">
        <div>
          <img src=".\images\icon-order-confirmed.svg" alt="" />
        </div>

        <p className="text-5xl font-bold laptop:text-6xl text-rose-950">Order Confirmed</p>
        <p className="text-base text-Rose-900">We hope you enjoy your food!</p>

        <div className="p-4 rounded-md bg-rose-50" >
          <div className=" relative scrollbar max-h-[15rem] overflow-y-scroll laptop:max-h-[25rem] ">
            {cart.map((item) => {
              return (
                <div
                  key={item.prodId}
                  className="flex content-center w-full gap-2 py-4 border-b-2 rounded-sm justify-evenly listItem border-rose-100">
                  <div className="item-thumbnail">
                    <img src={item.thumbnail} alt="item-image" />
                  </div>
                  <div className="w-4/5 item-details">
                    <p className="mb-2 text-base font-medium">{item.name}</p>
                    <div className="flex flex-wrap content-center w-full gap-4  pricing">
                      <span className="text-Red-primary">{item.qty}x</span>
                      <span className="text-rose-500">@ ${item.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap content-center justify-center w-1/5 removeitem">
                    <p className="font-bold">
                      ${calcPrice(item.qty, item.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between w-full p-4 text-xl border-t-2 border-rose-100 orderTotal">
            <span className="text-base">Order Total</span>
            <span className="text-2xl font-bold">${totalamt}</span>
          </div>
        </div>
        
        <button onClick={startNewOrder} className="p-4 text-center text-white rounded-full bg-Red-primary">
          Start New Order
        </button>
      </div>
    </div>
  );
}
