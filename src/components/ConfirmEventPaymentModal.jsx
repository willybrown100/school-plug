/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { getEventCardDetails, studentConfirmEventPayment } from "../services/contactApi";
import useGetUser from "../hooks/useGetUser";
import BlueMiniLoader from "../ui/BlueMiniLoader";
import { getBankLogo } from "../utils/dateFormat";
import Button from "../ui/Button";
import MiniLoader from "../ui/MiniLoader";
import useGetEventCardToken from "../hooks/useGetEventCardToken";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export default function ConfirmEventPaymentModal({ selectedFee }) {
  // const navigate = useNavigate()
    const { data: datas } = useGetUser();
    const email = datas?.user?.email;
     const { cardToken } = useGetEventCardToken();
     console.log(cardToken)
  const selectedFeez = selectedFee?.selectedFee;
  console.log(selectedFeez?.eventId)
  const { data: dataz, isLoading: isComing } = useQuery({
    queryFn: () => getEventCardDetails(email),
    queryKey: ["eventCardDetails"],
    enabled: !!email && !!selectedFeez,
  });
   const modalRef = useRef(null);

   const handleClose = function (e) {
     console.log(e, modalRef.current);
   };
  const {
    firstName,
    lastName,
    regNo,
    academicLevel,
    department,
    cardMasked,
    bankName,
  } = dataz?.data || {};

  console.log(isComing)

 const { mutate, isLoading: isPaying } = useMutation({
   mutationFn: studentConfirmEventPayment,
   onSuccess: () => {
    //  navigate("/home/eventreceipt");
   },

   onError: (error) => {
     toast.error(error.message);
   },
 });

  const handleSubmit = function(){
    const data = {
      email,
      amount: selectedFeez?.price,
      authorization_code: cardToken,
      eventId: selectedFeez?.eventId,
    };
    console.log(data);
mutate(data);
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
                  <h4 className="mb-0 font-semibold">debit card</h4>
                  <button disabled  className="hover:text-stone-100 flex gap-x-2 bg-secondary600 p-1 rounded-md text-white capitalize items-center ">
                    <img src="\assets\edit2.svg" alt="edit" />
                    edit info
                  </button>
                </div>
                <div className="flex items-center gap-x-1 justify-between p-2 border border-stone-300 rounded-lg my-6">
                  <input type="radio" checked readOnly />
                  <img
                    src={getBankLogo(bankName)}
                    alt=""
                    loading="lazy"
                    className="w-20"
                  />
                  <span className="font-semibold capitalize">{bankName}</span>
                  <span className="capitalize">{cardMasked}</span>
                </div>
                <Button onClick={handleSubmit} className="w-full">
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
          </>
        )}
      </div>
    </article>
  );
}
