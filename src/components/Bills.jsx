import React, { useState } from "react";
import img1 from "../../public/assets/bill.svg";
import img2 from "../../public/assets/teacher.svg";

import img3 from "../../public/assets/book.svg";
import { Link } from "react-router-dom";

export default function Bills() {

   const [active, setActive] = useState(null);
     const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [selectedFee, setSelectedFee] = useState("");

    const [selectedContent, setSelectedContent] = useState("");
 
 const handleChange = function (e) {
   const selectedValue = e.target.value;

   const selectedPayment = payment.find(
     (item) => item.Element.props.value === selectedValue
   );
   if (selectedPayment) {
     setSelectedFee(selectedValue);

     setSelectedContent({ selectedValue, image: selectedPayment.image });
   }
   console.log(selectedPayment);

   setIsButtonDisabled(false);
 };
 const queryString = encodeURIComponent(JSON.stringify(selectedContent));

  const handleClick = function (i) {
    setActive(i);
  };
  const payment = [
    {
      image: img1,
      name: "sug fee",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="sugFee"
          checked={selectedFee === "sugFee"}
        />
      ),
    },
    {
      image: img2,
      name: "departmental fee",
      Element: (
        <input
          type="radio"
          disabled
          onChange={handleChange}
          value="departmentalFee"
          checked={selectedFee === "departmentalfee"}
        />
      ),
    },
    {
      image: img3,
      name: "faculty fee",
      Element: (
        <input
          type="radio"
          disabled
          onChange={handleChange}
          value="facultyFee"
          checked={selectedFee === "facultyFee"}
        />
      ),
    },
  ];


  return (
    <div className="hidden lg:block w-full sticky md:top-[9.9rem] max-h-screen overflow-y-auto lg:top-[5rem]">
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
              } flex p-3  gap-x-5 items-center rounded-lg`}
            >
              <img src={item.image} alt="i" />
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
<div className="mt-[2rem] w-full">

        <Link
          to={`/home/payment-form?option=${queryString}`}
          disabled={isButtonDisabled}
          className={
            isButtonDisabled
            ? "bg-[#B8CFF3] text-[#FAFAFA]  grid grid-cols-1 hover:text-stone-100 text-center py-3 rounded  font-bold"
            : "bg-[#2B70DB] text-white py-3  grid text-center grid-cols-1 hover:text-stone-100  rounded  font-bold"
          }
          >
          Make payment now
        </Link>
          </div>
      </div>
    </div>
  );
}
