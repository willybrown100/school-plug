import React, { useState } from "react";
import Button from "../ui/Button";
import { Link, useSearchParams } from "react-router-dom";

export default function Bills() {
  const [selectedOption, setSelectedOption] = useState("");
  const [disable, setDisable] = useState(true);
  const [active, setActive] = useState(null);
console.log(active)

  const handleChange = function (e) {
    setSelectedOption(e.target.value);
   setDisable(false)
  };
  const handleClick = function (i) {
    setActive(i);
  };
  const payment = [
    {
      name: "sug fee",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="sugFee"
          checked={selectedOption === "sugFee"}
        />
      ),
    },
    {
      name: "departmental fee",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="departmentalfee"
          checked={selectedOption === "departmentalfee"}
        />
      ),
    },
    {
      name: "faculty fee",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="facultyFee"
          checked={selectedOption === "facultyFee"}
        />
      ),
    },
  ];


  return (
    <div className="hidden lg:block w-full">
      <div className="bg-white rounded-lg p-4">
        <h5 className="font-semibold capitalize font-heading">pay Bills</h5>
        <p className="text-sm text-stone-500">
          Select a bill you want to pay then proceed <br /> to making payment.
        </p>
        <ul className="flex flex-col gap-y-3">
          {payment.map((item, i) => (
            <li
              key={i}
              className={`${
                active === i
                  ? "border border-secondary500"
                  : "border border-stone-600"
              } flex p-3 justify-between gap-x-5 items-center rounded-lg`}
            >
              <span
                className={`${
                  active === i ? " text-secondary600" : ""
                } capitalize`}
              >
                {item.name}
              </span>
              <div onClick={() => handleClick(i)}>{item.Element}</div>
            </li>
          ))}
        </ul>
        <Link
          to={`/home/homePage/billz?option=${selectedOption}`}
          className={`${
            disable ? "bg-secondary400" : "bg-secondary600"
          } w-full grid grid-cols-1 text-center   text-white hover:text-white rounded-md  font-heading capitalize font-semibold mt-3`}
        >
          {!disable ? (
            <button className="bg-transparent p-2 capitalize">make payment now</button>
          ) : (
            <button disabled={disable} className="bg-transparent p-2 capitalize">
              make payment now
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}
