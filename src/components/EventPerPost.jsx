/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { processText2 } from "../utils/utils";
import { formatNaira } from "../utils/dateFormat";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeStampAgo";

export default function EventPerPost({item}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => setIsExpanded((prev) => !prev);
const {
postedByBody,
  title,
  flyer,
  uniProfilePicture,
_id,
  createdAt,
  isPaid,
  price,
} = item;

const selectedContent = { price, event: "event", eventId: _id };
       const queryString = encodeURIComponent(JSON.stringify(selectedContent));
  return (
    <div className="bg-white p-4 mb-3  rounded-lg">
      <div className="flex items-center gap-x-2">
        <img
          src={uniProfilePicture}
          alt="img"
          className="w-16  rounded-full h-16"
        />
        <div className="flex flex-col gap-y-1 ">
          <h4 className="mb-0">{postedByBody === "sug" ? "sug body" : ""}</h4>
          <p className="mb-0 text-stone-600">{timeAgo(createdAt)}</p>
        </div>
      </div>
      <p className="text-stone-700 mt-4 break-words max-full">
        {isExpanded ? processText2(title) : processText2(title).slice(0, 40)}
        {title.length > 40 && (
          <Link
            to={`/home/events/${_id}`}
            onClick={toggleText}
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
            to={`/home/events/${_id}`}
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
      {isPaid == true && (
        <div className="grid grid-cols-2 gap-x-2 mt-4">
          <button className="border border-stone-600 text-stone-600 capitalize rounded-md bg-transparent px-3 py-3">
            event fee ({formatNaira(price)})
          </button>
          <Link
            to={`/home/payment-form?option=${queryString} `}
            className="border capitalize text-center font-semibold text-secondary600 border-secondary600 px-3 bg-transparent rounded-md py-3"
          >
            buy ticket
          </Link>
        </div>
      )}
    </div>
  );
}
