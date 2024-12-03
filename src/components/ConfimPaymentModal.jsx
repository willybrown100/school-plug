/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetCardDetails from "../hooks/useGetCardDetails";
import { getBankLogo } from "../utils/dateFormat";
import Button from "../ui/Button";
import useGetUser from "../hooks/useGetUser";
import useGetCardToken from "../hooks/useGetCardToken";
import BlueMiniLoader from "../ui/BlueMiniLoader";
import { useMutation } from "@tanstack/react-query";
import { studentMakePayment } from "../services/contactApi";
import MiniLoader from "../ui/MiniLoader";
import toast from "react-hot-toast";

export default function ConfimPaymentModal({ selectedAmount, feeType }) {
  const {cardToken}=useGetCardToken()
  const navigate = useNavigate()
  const {data:datas}=useGetUser()
  const email = datas?.user?.email
  const fee = feeType?.toUpperCase().replace(/FEE$/, "");
  const paymentData = {
    amount: selectedAmount,
    feeType: fee,
    email,
    cardToken,
  };

  const modalRef = useRef(null);

  const handleClose = function (e) {
    console.log(e, modalRef.current);
  };
const { mutate,isLoading:isPaying } = useMutation({
  mutationFn: studentMakePayment,
  onSuccess:()=>{
    navigate("/home/receipt/");
  },
  onError:(error)=>{
    toast.error(error.message)
  }
});
  const { data ,isLoading} = useGetCardDetails();
  const student = data?.student;
  const card = data?.card;
  const handleClick = function(){
mutate(paymentData);
console.log(paymentData)
  }
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
            <div className="flex justify-between">
              <h4>student info.</h4>
              <Link
                to="/home/payment-form"
                className="hover:text-stone-100 flex gap-x-2 bg-secondary600 p-1 rounded-md text-white capitalize items-center "
              >
                <img src="\assets\edit2.svg" alt="edit" />
                edit info
              </Link>
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
              <p className="text-sm mb-0 text-stone-700">{student?.regNo} </p>
              <div className="w-[0.13rem]  h-6 bg-green-500"></div>
              <p className="text-sm mb-0 text-stone-700">
                {student?.academicLevel}{" "}
              </p>
            </div>
            <div className=" flex justify-between  items-center">
              <h4 className="mb-0 font-semibold">debit card</h4>
              <Link
                to="/home/payment-form"
                className="hover:text-stone-100 flex gap-x-2 bg-secondary600 p-1 rounded-md text-white capitalize items-center "
              >
                <img src="\assets\edit2.svg" alt="edit" />
                edit info
              </Link>
            </div>
            <div className="flex items-center gap-x-1 justify-between p-2 border border-stone-300 rounded-lg my-6">
              <input type="radio" checked readOnly />
              <img
                src={getBankLogo(card?.bankName)}
                alt=""
                loading="lazy"
                className="w-20"
              />
              <span className="font-semibold capitalize">{card?.bankName}</span>
              <span className="capitalize">{card?.cardNumber}</span>
            </div>
            <Button onClick={handleClick} className="w-full">
              {isPaying ? (
                <div className="flex justify-center">
                  <MiniLoader />
                </div>
              ) : (
                "Yes they are, Make payment"
              )}
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
