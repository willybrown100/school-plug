import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatNaira } from '../utils/dateFormat';
import Button from '../ui/Button';
import useGetCardDetails from '../hooks/useGetCardDetails';
import MiniLoader from "../ui/MiniLoader";
import BlueMiniLoader from '../ui/BlueMiniLoader';


export default function PaymentAcctDetails() {
      const [copied, setCopied] = useState(false);
  const { data, isLoading,refetch ,isRefetching} = useGetCardDetails();
    const acct = data?.data?.student?.OtherVirtualAccount
;
  const { paymentAmount } = data?.student?.paymentDetails || {};
console.log(data?.student)
    const navigate =useNavigate()
    const handleClick = function () {
      navigate(-1);
    //   navigate("/home/payment-form");
    };

const handleConfirm =  function(){
  
    refetch()
  
}
      const handleCopy = () => {
        // Use the Clipboard API to copy the text to the clipboard
        navigator.clipboard
          .writeText(acct?.accountNumber) 
          .then(() => {
            setCopied(true); // Set copied state to true after successful copy
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      };

  return (
    <article className="p-3 bg-white md:bg-stone-100 md:grid md:place-items-center min-h-[100dvh]">
      <div className="md:w-[600px] md:bg-white px-5 py-3 rounded-md">
        <div className="flex gap-x-2 items-center mb-5">
          <button onClick={handleClick} className="bg-transparent">
            <img src="\assets\arrow-left.svg" alt="icon" />
          </button>
          <p className="mb-0 font-semibold capitalize">account settings</p>
        </div>

        <div>
          <h2 className="font-semibold">Payment Account Details</h2>
          <p className="text-stone-600 ">
            Pay bills by making a direct transfer from any Nigerian bank.
          </p>
        </div>
        <div className="mt-16 divide-y  divide-secondary700  ">
          <div className="flex justify-between items-center py-5">
            <p className="text-stone-600 text-[1rem] mb-0">Account Number:</p>
            {isLoading ? (
              <BlueMiniLoader />
            ) : (
              <h3 className="flex font-semibold text-stone-800 relative items-center gap-x-2 mb-0">
                {acct?.accountNumber}
                <button onClick={handleCopy}>
                  <img src="\assets\copy.svg" alt="copy" />
                </button>
                {copied && (
                  <p className="absolute text-sm right-1 bottom-2 text-stone-500 ">
                    copied
                  </p>
                )}
              </h3>
            )}
          </div>
          <div className="flex justify-between items-center py-5">
            <p className="text-stone-600 text-[1rem] mb-0">Account Name:</p>
            <h3 className="flex font-semibold text-stone-800 relative items-center gap-x-2 mb-0">
              {isLoading ? <BlueMiniLoader /> : acct?.accountName}
            </h3>
          </div>
          <div className="flex justify-between items-center py-5">
            <p className="text-stone-600 text-[1rem] mb-0">Bank Name:</p>
            <h3 className="flex font-semibold text-stone-800 relative items-center gap-x-2 mb-0">
              {isLoading ? <BlueMiniLoader /> : acct?.bankName}
            </h3>
          </div>
          <div className="flex justify-between items-center py-5">
            <p className="text-stone-600 text-[1rem] mb-0"> Total Fee:</p>
            <h3 className="flex font-semibold relative text-stone-800 items-center gap-x-2 mb-0">
              {isLoading ? <BlueMiniLoader /> : formatNaira(paymentAmount)}
            </h3>
          </div>
        </div>
        <Button className="my-6 py-3 w-full" onClick={handleConfirm}>{isRefetching?<MiniLoader/>:"Confirm transaction"}</Button>

        {isRefetching && (
          <div className="fixed  bottom-0 inset-0 bg-black md:hidden  bg-opacity-50 z-50">
            <div className="absolute bottom-0 bg-white rounded-tl-[1rem] rounded-tr-[1rem] w-full  h-[25dvh] p-4 grid grid-rows-[auto,1fr,auto] overflow-y-auto animate-slideUp">
              <h4 className="text-secondary600 text-lg text-center font-semibold">
                Confirming transaction
              </h4>
              <div className="grid place-items-center">
                <div className="load relative  h-[5rem] md:h-[8rem] ">
                  <img
                    src="/images/loader1.png"
                    alt="img"
                    className="p-3 h-[5rem] md:h-[8rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {isRefetching && (
          <article className="fixed p-3 bg-black bg-opacity-50 z-30  backdrop-blur-sm max-sm:hidden md:block inset-0 grid place-items-center">
            <div className="bg-white py-[4.5rem] px-40 rounded-lg">
              <h2 className="text-secondary600 mb-16 text-[1.9rem] text-center font-semibold">
                Confirming transaction
              </h2>
              <div className="grid place-items-center">
                <div className="load relative  h-[5rem] md:h-[5.2rem] ">
                  <img
                    src="/images/loader1.png"
                    alt="img"
                    className="p-3 h-[5rem] md:h-[5.2rem]"
                  />
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </article>
  );
}


