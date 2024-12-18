/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { timeAgo } from "../../utils/timeStampAgo";
import { processText2 } from "../../utils/utils";
import { Link } from "react-router-dom";
import { formatNaira } from "../../utils/dateFormat";

export default function SugPerEvent({ item }) {
    const [isExpanded] = useState(false);

  const {
    createdAt,
    title,
    _id,
    flyer,
    isPaid,
    price,
    postedByBody,
    uniProfilePicture,
  } = item;
  return (
    <li className="bg-white rounded-lg p-2">
      <div className="flex gap-x-4 items-center">
        <img src={uniProfilePicture} alt="img" className="w-16" />
        <div className="flex flex-col ">
          <h5 className="mb-0 font-semibold capitalize">{postedByBody === "sug" ? "sug body" : ""}</h5>
          <h5 className="mb-0 text-stone-700 text-sm font-light flex gap-x-2">
            {timeAgo(createdAt)}{" "}
            <img src="/assets/clock.svg" alt="Time" className="w-4" />
          </h5>
        </div>
      </div>

      <p className="text-stone-700 mt-4 break-words max-full">
        {isExpanded ? processText2(title) : processText2(title).slice(0, 50)}
        {title?.length > 50 && (
          <Link
            to={`/sughome/sugevents/${_id}`}
            className="text-stone-600 cursor-pointer ml-1"
          >
            {isExpanded ? " less" : "...more"}
          </Link>
        )}
      </p>

      <div
        className={`grid gap-x-2 mt-2 ${
          flyer.length === 2
            ? "grid-cols-2"
            : flyer.length === 1
            ? "grid-cols-1"
            : "grid-cols-3"
        }`}
      >
        {flyer?.map((img, index) => (
          <Link
            to={`/sughome/sugevents/${_id}`}
            key={index}
            className="h-[17rem] "
          >
            <img
              src={img}
              alt="Post"
              loading="lazy"
              className="h-full object-cover w-full rounded-md cursor-pointer"
            />
          </Link>
        ))}
      </div>
      <div>
        {isPaid === true && (
          <div className="grid grid-cols-2 gap-x-3 items-center mt-6">
            {" "}
            <span className="border text-center border-stone-600 rounded-md p-2 text-stone-500 capitalize">
              event fee ({formatNaira(price)})
            </span>
            <span className="text-secondary600 border font-semibold capitalize rounded-md text-center border-secondary600 p-2">
              buy ticket
            </span>
          </div>
        )}
      </div>
    </li>
  );
}
