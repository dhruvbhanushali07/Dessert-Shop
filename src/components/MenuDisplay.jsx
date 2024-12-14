import React, { useContext } from "react";
import { DessertContext } from "../context/DessertContext";
import AddToCartButton from "./AddToCartButton";

export default function MenuDisplay() {
  const {
    allCartProductId,
    allDesserts,
  } = useContext(DessertContext);

  let itemPosition

  function isInCart(id) {
    itemPosition=allCartProductId.indexOf(id)
    return itemPosition ;
  }
  return (
    <>
      {/* Displaying all products by mappnig allDesserts list */}
      <div className="grid content-start w-full h-full grid-cols-1 gap-4 px-4 tablet:grid-cols-2 laptop:grid-cols-3 menu">
        {allDesserts.map((item) => {
          const cartStatus = isInCart(item.id)>-1?true:false;
          return (
            <div
              className="flex flex-col w-full h-auto gap-8 item"
              key={item.id}
            >
              {/* Image section of item */}
              <div className="relative item-image">
                <picture>
                  <source
                    srcSet={`${item.image.desktop}`}
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet={`${item.image.tablet}`}
                    media="(min-width: 600px)"
                  />
                  <img
                    className={`rounded-lg border-2 ${
                      cartStatus ? " border-Red-primary" : "border-transparent"
                    }`}
                    src={`${item.image.mobile}`}
                    alt={item.name}
                  />
                </picture>
                <AddToCartButton
                  prodId={item.id}
                  prodnm={item.name}
                  prodpri={item.price}
                  cartStatus={cartStatus}
                  itemPos={itemPosition}
                />
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
