/* eslint-disable react/prop-types */

import React, { useRef } from "react";

import BlueMiniLoader from "../ui/BlueMiniLoader";

import Button from "../ui/Button";
import { formatNaira } from "../utils/dateFormat";


import { useNavigate } from "react-router-dom";
import useGetEventPaymentDetails from "../hooks/useGetEventPaymentDetails";

export default function ConfirmEventPaymentModal({ selectedFee }) {
  
  const navigate = useNavigate()
  const eventId=selectedFee?.eventId
 const { dataz, isComing } = useGetEventPaymentDetails(eventId);
   const modalRef = useRef(null);
const {
  firstName,
  lastName,
  academicLevel,
  department,
  regNo,
  paymentDetails,
} = dataz?.student || {};
console.log(dataz?.student)
   const handleClose = function (e) {
     console.log(e, modalRef.current);
   };


  console.log(paymentDetails?.paymentAmount);

 
  const handleClick = function () {
    navigate("/home/eventacctdetails");
  };




  return (
    <article
      onClick={handleClose}
      className="fixed p-3 bg-black bg-opacity-50 z-30 inset-0 backdrop-blur-sm grid place-items-center"
    >
      <div className="bg-white px-5 py-8 rounded-lg" ref={modalRef}>
        <h4 className="text-[#F0AA14] font-semibold">Confirm payment</h4>
        <p className="text-sm text-stone-500">
          Please make sure the information provided are correct, otherwise we
          can’t guarantee you made payment
        </p>

        {isComing ? (
          <div className="flex justify-center items-center">
            <BlueMiniLoader />
          </div>
        ) : (
          <>
            {selectedFee && (
              <>
                <div className="flex justify-between items-center">
                  <h4>student info.</h4>
                  <button
                    type="b"
                    disabled
                    className="hover:text-stone-100 flex gap-x-2 mb-4 bg-secondary600 p-1 rounded-md text-white capitalize items-center "
                  >
                    <img src="\assets\edit2.svg" alt="edit" />
                    edit info
                  </button>
                </div>
                <div className="flex items-center gap-x-3 border-b pb-2 border-stone-300 mb-4">
                  <p className="text-sm mb-0 text-stone-700">
                    {firstName} {lastName}{" "}
                  </p>
                  <div className="w-[0.13rem]  h-6  bg-green-500"></div>

                  <p className="text-sm mb-0 text-stone-700">{department} </p>
                  <div className="w-[0.13rem] h-6 bg-green-500 "></div>
                  <p className="text-sm mb-0 text-stone-700">{regNo} </p>
                  <div className="w-[0.13rem]  h-6 bg-green-500"></div>
                  <p className="text-sm mb-0 text-stone-700">
                    {academicLevel}{" "}
                  </p>
                </div>
                <div className=" flex justify-between  items-center">
                  <h4 className="mb-0 font-semibold">
                    Paying via bank transfer
                  </h4>
                </div>
                <div className="flex items-center gap-x-1 justify-between p-2 border border-stone-300 rounded-lg my-6">
                  <div className="flex flex-col gap-y-">
                    <span className="font-semibold capitalize">
                      Payment amount:
                    </span>
                    <span className="capitalize text-secondary600">
                      included service fee of N100
                    </span>
                  </div>
                  <p className="mb-0">{formatNaira(paymentDetails?.paymentAmount)}</p>
                </div>
                <Button onClick={handleClick} className="w-full">
                  yes they are, make payment
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </article>
  );
}
