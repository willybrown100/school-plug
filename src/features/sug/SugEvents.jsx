import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SugEvents() {
  const [selectedFee, setSelectedFee] = useState("");
  const [active, setActive] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedContent, setSelectedContent] = useState("");

  const handleChange = function (e) {
    const selectedValue = e.target.value;

    console.log(selectedValue);

    setSelectedFee(selectedValue);

    setSelectedContent({ selectedValue });

    setIsButtonDisabled(false);
  };
  console.log(selectedContent);
  const queryString = encodeURIComponent(JSON.stringify(selectedContent));
  const event = [
    {
      name: "Paid event",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="paidevent"
          checked={selectedFee === "paidevent"}
        />
      ),
    },
    {
      name: "unpaid event",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="unpaidevent"
          checked={selectedFee === "unpaidevent"}
        />
      ),
    },
  ];
  const navigate = useNavigate();
  const handleClick1 = function () {
    navigate(-1);
  };

  const handleClick = function (i) {
    setActive(i);
  };
  return (
    <article className="p-3 min-h-screen grid grid-rows-[auto,auto,1fr,auto] py-5">
      <div className="flex gap-x-2 items-center mb-5">
        <button onClick={handleClick1} className="bg-transparent">
          <img src="\assets\arrow-left.svg" alt="icon" />
        </button>
        <p className="mb-0 font-semibold capitalize">Event category</p>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold ">Please select category</h4>
        <p className="text-stone-700">
          Let us know if this event requires ticket purchase or any form of
          payment
        </p>
      </div>

      <ul className="flex flex-col gap-y-3">
        {event.map((item, i) => (
          <li
            key={i}
            className={`${
              active === i
                ? "border border-secondary500"
                : "border border-stone-600"
            } flex p-3  gap-x-5 items-center rounded-lg`}
          >
            {/* <div className='flex justify-between items-center'> */}

            <span
              className={`${
                active === i ? " text-secondary600" : ""
              } capitalize`}
            >
              {item.name}
            </span>
            <div className="ml-auto " onClick={() => handleClick(i)}>
              {item.Element}
            </div>
            {/* </div> */}
          </li>
        ))}
      </ul>

      <Link
        to={`/sugpost?option=${queryString}`}
        disabled={isButtonDisabled}
        className={
          isButtonDisabled
            ? "bg-[#B8CFF3] text-[#FAFAFA]  grid grid-cols-1 hover:text-stone-100 text-center py-3 rounded  font-bold"
            : "bg-[#2B70DB] text-white py-3  grid text-center grid-cols-1 hover:text-stone-100  rounded  font-bold"
        }
      >
        continue
      </Link>
    </article>
  );
}
