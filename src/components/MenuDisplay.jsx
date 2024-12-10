import React, { useContext } from "react";
import { DessertContext } from "../context/DessertContext";
import AddToCartButton from "./AddToCartButton";

export default function MenuDisplay() {
  const { allDesserts, cart,allCartProductId, addToCart, isInCart } = useContext(DessertContext);

  return (
    <>
        {/* Main heading */}
        <h1 className="p-4 text-4xl font-bold header font-Red-Hat-Text">Desserts</h1>

        {/* Displaying all products by mappnig allDesserts list */}
        <div className="grid content-center w-full h-full grid-cols-1 gap-4 px-4 menu">
        {allDesserts.map((item) => {
            return (
            <div
                className="flex flex-col w-full h-auto gap-8 item"
                key={item.id}
            >
                {/* Image section of item */}
                <div className={`relative rounded-lg item-image ${isInCart(item.id)?"border-2 border-Red-primary":""}`}>
                <picture>
                    <source
                    srcSet={`${item.image.desktop}`}
                    media="(min-width: 1024px)"
                    />{" "}
                    <source
                    srcSet={`${item.image.tablet}`}
                    media="(min-width: 600px)"
                    />
                    <img
                    className="rounded-lg"
                    src={`${item.image.mobile}`}
                    alt={item.name}
                    />
                </picture>
                <AddToCartButton prodId={item.id} />
                </div>

                {/* Item details section: category, name, price */}
                <div className="flex flex-col flex-wrap gap-1 item-details">
                <div className="text-sm category text-Rose-500">
                    {item.category}
                </div>
                <div className="text-base font-semibold name text-Rose-900">
                    {item.name}
                </div>
                <div className="text-base price text-Red-primary">
                    {"$" + `${item.price}`}
                </div>
                </div>
            </div>
            );
        })}
    </div>
    </>
  );
}

// Dessert-Shop\src\assets\images\image-waffle-mobile.jpg
