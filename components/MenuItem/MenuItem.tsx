"use client";

import Link from "next/link";
import {
    ArrowUpIcon,
    ArrowDownIcon,
    HeartIcon,
    FunnelIcon,
    ArrowPathIcon,
  } from "@heroicons/react/24/outline";
  import {
    HeartIcon as HeartIconSolid,
    StarIcon,
  } from "@heroicons/react/24/solid";

  import React, {
    ChangeEvent,
    ReactElement,
    ReactNode,
    Ref,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";

  import Ratings from "../Ratings/Ratings";

  const THUMBNAIL_PATH = "https://foodfishing.com/next_thumbs/";
  const IMAGE_PATH = "https://foodfishing.com/next_images/";
  
  type FavoritedItem = {
    menuItemId: string;
  };

export default function MenuItem({
    menuItem,
    index,
    setHoveredLocation,
    setFavoritedItems,
  }: any) {
    const {
      menuId,
      restaurantId,
      item,
      pic,
      description,
      price,
      name,
      address,
      lat,
      lon,
      mainCategory,
      dollar,
      restaurantPic,
      rating,
    } = menuItem;
  
    const fileName =
      restaurantId +
      "/" +
      menuId +
      "_" +
      item.replace(/[^a-zA-Z0-9]/g, "_") +
      ".jpg";
  
    let derivedThumbnail = "";
    if (pic !== "") derivedThumbnail = THUMBNAIL_PATH + fileName;
    let derivedImage = "";
    if (pic !== "") derivedImage = IMAGE_PATH + fileName;
  
    const [myRating, setMyRating] = useState(rating);
    const [myFavorite, setMyFavorite] = useState(false);
    return (
      <div
        className="hover:shadow-2xl rounded-lg p-4 mb-4 relative"
        onMouseEnter={() => setHoveredLocation(restaurantId)}
      >
        <div className="ml-3 text-small absolute top-6 left-3 font-semibold shadow-sm rounded-lg bg-white p-3">
          {price.trim() === "-" || price.trim() === "" ? `N/A` : `${price}`}
        </div>
  
        <button
          className={
            myFavorite
              ? "absolute top-6 right-6 h-[30px] w-[30px] bg-transparent text-red-600 hover:text-red-600 z-10"
              : "absolute top-6 right-6 h-[30px] w-[30px] bg-transparent text-slate-200 hover:text-red-600 z-10"
          }
          onClick={(e) => {
            setFavoritedItems((currFavArr: FavoritedItem[]) => [
              ...currFavArr,
              menuId,
            ]);
            setMyFavorite(true);
          }}
        >
          <HeartIconSolid />
        </button>
  
        <button
          className="absolute top-[240px] left-5 z-10"
          onClick={(e) =>
            setFavoritedItems((currFavArr: FavoritedItem[]) => [
              ...currFavArr,
              menuId,
            ])
          }
        >
          <Ratings value={myRating} onChange={(value) => setMyRating(value)} />
        </button>
  
        <div className="">
          {derivedThumbnail ? (
            <img
              src={derivedThumbnail}
              placeholder="blur"
              alt={item}
              // onMouseEnter={() => console.log("entered" + index)}
              // onMouseLeave={() => console.log("exited" + index)}
              width="350"
              height="350"
              className="object-cover rounded-[3%] text-sub w-[350px] h-[250px]"
            />
          ) : (
            <img
              src={`${THUMBNAIL_PATH}/no-image.png`}
              alt="No Image Available"
              width="120"
              height="120"
              className="object-contain rounded-[3%] text-sub w-[350px] h-[250px] opacity-20"
            />
          )}
  
          {/* {derivedImage ? (
            <ImagePopup imageSrc={derivedImage} index={index} />
          ) : (
            <ImagePopup
              imageSrc="${process.env.IMAGE_HOST}/next_thumbs/no-image.png"
              index={index}
            />
          )} */}
  
          <h6 className="text-small font-semibold mt-2 text-ellipsis overflow-hidden whitespace-nowrap w-full">
            {item}
          </h6>
          <p className="italic font-extralight text-small">{description}</p>
        </div>
        <div className="">
          <Link
            className="block text-small"
            style={{ color: "blue" }}
            href={`/restaurant/${restaurantId}`}
          >
            {name}
          </Link>
          <div className="text-small">
            <span className="inline-block text-small font-extralight">
              {rating}
            </span>
            {rating ? (
              <span className="inline-block pl-2 text-small font-extralight">
                &bull;
              </span>
            ) : null}
            <span className="inline-block pl-2 text-small font-extralight">
              {dollar}
            </span>
            {dollar ? (
              <span className="inline-block pl-2 text-small font-extralight">
                &bull;
              </span>
            ) : null}
            <span className="inline-block pl-2 text-small font-extralight">
              {mainCategory}
            </span>
          </div>
          <address className="block text-small">{address}</address>
        </div>
      </div>
    );
  }