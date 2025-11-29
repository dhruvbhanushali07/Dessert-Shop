import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { DessertContext } from "../context/DessertContext";
import AddToCartButton from "./AddToCartButton";
import gsap from "gsap";

export default function MenuDisplay() {
  const { allCartProductId, allDesserts } = useContext(DessertContext);

  const itemsRef = useRef([]);
  const skeletonRef = useRef([]);
  const [loaded, setLoaded] = useState(false);

  // Check if product is in cart
  function isInCart(id) {
    return allCartProductId.indexOf(id) !== -1;
  }

  useLayoutEffect(() => {
    if (allDesserts.length > 0) {
      // Hide skeleton
      gsap.to(skeletonRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => setLoaded(true),
      });

      // Animate items
      gsap.from(itemsRef.current, {
        opacity: 0,
        y: 10,
        stagger: 1,
        duration: 0.45,
        ease: "power2.out",
      });
    }
  }, [allDesserts]);

  const SKELETON_COUNT = 6;

  return (
    <div
      className="grid content-start w-full min-h-[80vh] grid-cols-1 gap-6 px-4 
      tablet:grid-cols-2 laptop:grid-cols-3"
    >
      {/* ---------------------- SKELETON GRID ---------------------- */}
      {!loaded &&
        Array.from({ length: SKELETON_COUNT }).map((_, sIndex) => (
          <div
            key={sIndex}
            ref={(el) => (skeletonRef.current[sIndex] = el)}
            className="flex flex-col w-full gap-4 animate-pulse"
          >
            {/* image skeleton */}
            <div className="rounded-lg bg-neutral-700/30 h-48 md:h-96 w-full"></div>

            {/* text lines */}
            <div className="flex flex-col gap-2">
              <div className="w-24 h-3 bg-neutral-700/30 rounded"></div>
              <div className="w-40 h-4 bg-neutral-700/30 rounded"></div>
              <div className="w-16 h-4 bg-neutral-700/30 rounded"></div>
            </div>

            {/* Reserved space for AddToCartButton */}
            <div className="h-10 w-full"></div>
          </div>
        ))}

      {/* ---------------------- REAL ITEMS ---------------------- */}
      {loaded &&
        allDesserts.map((item, index) => {
          const inCart = isInCart(item.id);
          const itemPos = allCartProductId.indexOf(item.id);

          return (
            <div
              key={item.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className="flex flex-col w-full gap-4"
            >
              {/* IMAGE */}
              <div className="relative">
                <picture>
                  <source
                    srcSet={item.image.desktop}
                    media="(min-width: 1024px)"
                  />
                  <source
                    srcSet={item.image.tablet}
                    media="(min-width: 600px)"
                  />
                  <img
                    src={item.image.mobile}
                    alt={item.name}
                    className={`rounded-lg border-2 ${
                      inCart ? "border-Red-primary" : "border-transparent"
                    }`}
                  />
                </picture>

                {/* Add to Cart */}
                <AddToCartButton
                  prodId={item.id}
                  prodnm={item.name}
                  prodpri={item.price}
                  imgpath={item.image.thumbnail}
                  cartStatus={inCart}
                  itemPos={itemPos}
                />
              </div>

              {/* DETAILS */}
              <div className="flex flex-col gap-1">
                <div className="category text-Rose-500">{item.category}</div>
                <div className="text-base font-semibold text-Rose-900">
                  {item.name}
                </div>
                <div className="text-base text-Red-primary">
                  {"$" + item.price}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
