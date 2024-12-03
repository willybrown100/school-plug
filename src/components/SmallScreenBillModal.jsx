/* eslint-disable react/prop-types */
import React, { useContext, useRef, useState } from "react";
import img1 from "../../public/assets/bill.svg";
import img2 from "../../public/assets/teacher.svg";

import img3 from "../../public/assets/book.svg";
import { ModalContext } from "./Modals";
import { useSearchParams } from "react-router-dom";
export default function SmallScreenBillModal() {
  const [selectedOption,setSelectedOption]=useState()
  const [active,setActive]=useState(null)
  const [selectedFee,setSelectedFee]=useState(null)
    const [searchParams, setSearchParams] = useSearchParams("");
    const [selectedContent, setSelectedContent] = useState("");
      const modalRef = useRef();
      const { close } = useContext(ModalContext);
console.log(selectedOption, selectedContent);

  // const handleChange = function (e) {
  //   const newOption = e.target.value;
  //        const selectedPayment = payment.find(
  //          (item) => item.Element.props.value === newOption
  //        );
  //        if (selectedPayment) {
  //            setSelectedFee(newOption);
  //          setSelectedContent({ newOption, image: selectedPayment.image });
  //        }

  //   setSelectedOption(newOption);
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   newSearchParams.set("option", selectedContent);
  //   setSearchParams(newSearchParams);
   
  // };

  const handleChange = function (e) {
    const selectedValue = e.target.value;

    // Find the selected payment object
    const selectedPayment = payment.find(
      (item) => item.Element.props.value === selectedValue
    );

    if (selectedPayment) {
      // Create the new selected content
      const newContent = { selectedValue, image: selectedPayment.image };

      // Update state
      setSelectedFee(selectedValue);
      setSelectedContent(newContent);

      // Update search params with the new content
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("option", JSON.stringify(newContent));
      setSearchParams(newSearchParams);
    }

    setSelectedOption(selectedValue);
  };




      const handleClose = function (e) {
        console.log(e, modalRef.current);
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          close();
        }
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
              onChange={handleChange}
              value="departmentalfee"
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
              onChange={handleChange}
              value="facultyFee"
              checked={selectedFee === "facultyFee"}
            />
          ),
        },
      ];

       const handleClick = function (i) {
         setActive(i);
       };
  return (
    <div
      onClick={handleClose}
      className="fixed p-3 bg-black bg-opacity-50 z-30 inset-0 backdrop-blur-sm grid place-items-center"
    >
      <div ref={modalRef} className="bg-white p-3 rounded-md">
        <h4 className="font-semibold">Switch Bill type</h4>
        <p className="text-sm text-stone-500">
          Select a bill you want to pay then proceed to making payment.
        </p>
        <div className="flex justify-between gap-x-3">
          <ul className="flex justify-between gap-x-3">
            {payment.map((item, i) => (
              <li
                key={i}
                className={`${
                  active === i
                    ? "border border-secondary500"
                    : "border border-stone-600"
                } flex p-2 flex-col gap-y-2 items-center relative rounded-lg`}
              >
                <img src={item.image} alt="" />
                {/* <div className='flex justify-between items-center'> */}

                <span
                  className={`${
                    active === i ? " text-secondary600" : ""
                  } capitalize text-center`}
                >
                  {item.name}
                </span>
                <div className="absolute top-[-0.4rem] right-[-0.5rem]" onClick={() => handleClick(i)}>
                  {item.Element}
                </div>
                {/* </div> */}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => close()}
          className="bg-secondary600 p-2 rounded-md w-full text-white mt-6 capitalize font-semibold"
        >
          continue
        </button>
      </div>
    </div>
  );
}
