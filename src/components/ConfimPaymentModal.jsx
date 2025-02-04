/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import {  useNavigate } from "react-router-dom";
import useGetCardDetails from "../hooks/useGetCardDetails";
import Button from "../ui/Button";

import BlueMiniLoader from "../ui/BlueMiniLoader";

import { formatNaira } from "../utils/dateFormat";


export default function ConfimPaymentModal({  feeType }) {

  const navigate = useNavigate();


 



  
  const modalRef = useRef(null);

  const handleClose = function (e) {
    console.log(e, modalRef.current);
  };

  const { data, isLoading } = useGetCardDetails();




  const student = data?.student;

  const handleClick = function () {
  navigate("/home/acctdetails")
  };
  return (
    <article
      onClick={handleClose}
      className="fixed p-3 bg-black bg-opacity-50 z-30 inset-0 backdrop-blur-sm grid place-items-center"
    >
      <div className="bg-white p-3 rounded-lg" ref={modalRef}>
        <h4 className="text-[#F0AA14] font-semibold">Confirm payment</h4>
        <p className="text-sm text-stone-500">
          Please make sure the information provided are correct, otherwise we
          can’t guarantee you made payment
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <BlueMiniLoader />
          </div>
        ) : (
          <>
            {feeType && (
              <>
                <div className="flex justify-between">
                  <h4>student info.</h4>
                  <button
                    type="b"
                    className="hover:text-stone-100 flex gap-x-2 bg-secondary600 p-1 rounded-md text-white capitalize items-center "
                  >
                    <img src="\assets\edit2.svg" alt="edit" />
                    edit info
                  </button>
                </div>
                <div className="flex items-center gap-x-3 border-b pb-2 border-stone-300 mb-4">
                  <p className="text-sm mb-0 text-stone-700">
                    {student?.firstName} {student?.lastName}{" "}
                  </p>
                  <div className="w-[0.13rem]  h-6  bg-green-500"></div>

                  <p className="text-sm mb-0 text-stone-700">
                    {student?.department}{" "}
                  </p>
                  <div className="w-[0.13rem] h-6 bg-green-500 "></div>
                  <p className="text-sm mb-0 text-stone-700">
                    {student?.regNo}{" "}
                  </p>
                  <div className="w-[0.13rem]  h-6 bg-green-500"></div>
                  <p className="text-sm mb-0 text-stone-700">
                    {student?.academicLevel}{" "}
                  </p>
                </div>
                <div className=" flex justify-between  items-center">
                  <h4 className="mb-0 font-semibold">
                    Paying via bank transfer
                  </h4>
                </div>
                <div className="flex items-center gap-x-1 justify-between p-2 border border-stone-300 rounded-lg my-6">
                  <div>
                    <p className="mb-0">Payment amount:</p>
                    <p className="mb-0 text-secondary600 text-sm">
                      included service fee of N100
                    </p>
                  </div>
                  <h3 className="font-semibold">
                    {formatNaira(student?.paymentDetails?.paymentAmount)}
                  </h3>
                </div>
                <Button onClick={handleClick} className="w-full">
                 
                    Yes they are, Make payment
                 
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </article>
  );
}
