import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import { DessertContext } from "../context/DessertContext";
import AddToCartButton from "./AddToCartButton";
import gsap from "gsap";

export default function MenuDisplay() {
  const { allCartProductId, allDesserts } = useContext(DessertContext);
  const itemRef = useRef([]);
  const skeletonRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(allDesserts.length > 0);
  let itemPosition;

  function isInCart(id) {
    itemPosition = allCartProductId.indexOf(id);
    return itemPosition;
  }

  useLayoutEffect(() => {
    // Show/hide skeleton based on data presence
    if (allDesserts.length > 0) {
      setIsLoaded(true);

      // Animate real items
      if (itemRef.current.length) {
        // clear previous refs if any
        gsap.killTweensOf(itemRef.current);
        gsap.from(itemRef.current, {
          y: -10,
          stagger: 0.12,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    } else {
      setIsLoaded(false);

      // Animate skeleton placeholders when they appear
      if (skeletonRef.current.length) {
        gsap.killTweensOf(skeletonRef.current);
        gsap.from(skeletonRef.current, {
          y: -6,
          opacity: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: "power2.out",
        });
      }
    }
  }, [allDesserts]);

  const SKELETON_COUNT = 6;

  return (
    <>
      {/* Displaying all products by mapping allDesserts list; or skeleton until loaded */}
      <div
        className="grid content-start w-full h-full min-h-[80vh] grid-cols-1 gap-4 px-4 tablet:grid-cols-2 laptop:grid-cols-3 menu"
        role="list"
        aria-live="polite"
      >
        {!isLoaded
          ? // --- Skeleton placeholders ---
            Array.from({ length: SKELETON_COUNT }).map((_, sIndex) => (
              <div
                key={`sk-${sIndex}`}
                className="flex flex-col w-full h-auto gap-8 item skeleton-item animate-pulse"
                ref={(el) => (skeletonRef.current[sIndex] = el)}
                role="status"
                aria-busy="true"
              >
                {/* image placeholder */}
                <div className="relative item-image">
                  <div
                    className="rounded-lg bg-neutral-700/30 border-2 border-transparent h-44 md:h-56 w-full"
                    aria-hidden="true"
                  />
                </div>

                {/* details placeholder */}
                <div className="flex flex-col flex-wrap gap-3 item-details">
                  <div className="w-28 h-3 rounded bg-neutral-700/30" />
                  <div className="w-48 h-5 rounded bg-neutral-700/30" />
                  <div className="w-20 h-4 rounded bg-neutral-700/30" />
                </div>
              </div>
            ))
          : // --- Actual items ---
            allDesserts.map((item, index) => {
              const cartStatus = isInCart(item.id) > -1 ? true : false;
              return (
                <div
                  className="flex flex-col w-full h-auto gap-8 item"
                  key={item.id}
                  ref={(el) => (itemRef.current[index] = el)}
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
                      imgpath={item.image.thumbnail}
                      cartStatus={cartStatus}
                      itemPos={itemPosition}
                    />
                  </div>

                  {/* Item details section: category, name, price */}
                  <div className="flex flex-col flex-wrap gap-1 item-details">
                    <div className=" category text-Rose-500">
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
