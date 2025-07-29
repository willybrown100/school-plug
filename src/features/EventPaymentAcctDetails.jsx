import React, {  useState } from 'react'
import useGetEventPaymentDetails from '../hooks/useGetEventPaymentDetails';
import { useNavigate } from 'react-router-dom';
import BlueMiniLoader from '../ui/BlueMiniLoader';
import { formatNaira } from '../utils/dateFormat';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function EventPaymentAcctDetails() {
  const [eventId]=useState(()=>localStorage.getItem("eventId"))
  const { dataz, isComing:isLoading ,refetch,isRefetching} = useGetEventPaymentDetails(eventId);
  const { accountNumber, bankName, accountName } =
  dataz?.student?.virtualAccount || {};
  const { paymentAmount } = dataz?.student?.paymentDetails || {};
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false);
  const handleClick = function () {
    navigate(-1);
    //   navigate("/home/payment-form");
  };
  

    const handleCopy = () => {
      // Use the Clipboard API to copy the text to the clipboard
      navigator.clipboard
        .writeText(accountNumber)
        .then(() => {
          setCopied(true); 
          setTimeout(() => setCopied(false), 2000); 
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    };

    const handleConfirm = async () => {
    const result = await refetch();
    const student = result.data?.student;
console.log("res",student)
    if (!student) {
      toast.error("Error: student data missing");
      return;
    }

    if (!("reference" in student)) {
      toast.error("Error: transaction not successful");
      return;
    }

    const newRef = student.reference;
    if (newRef === undefined || newRef === null) {
      toast.error("Error: reference is invalid");
      return;
    }

    const prevRef = localStorage.getItem("prevRefNumber");
    if (prevRef !== null && prevRef === String(newRef)) {
      toast.error("Error: duplicate reference, transaction already processed");
      return;
    }

    try {
      localStorage.setItem("prevRefNumber", String(newRef));
    } catch (err) {
      console.error("localStorage error:", err);
    }

    toast.success("Transaction successful");
    navigate("/home/receipt")
  };
     
  return (
    <article className="p-3 bg-white md:bg-stone-100 md:mt-24 md:grid md:place-items-center min-h-[100dvh]">
      <div className="md:w-[500px] md:bg-white px-5 py-3 rounded-md">
        <div className="flex gap-x-2 items-center mb-5 md:hidden">
          <button onClick={handleClick} className="bg-transparent">
            <img src="\assets\arrow-left.svg" alt="icon" />
          </button>
          <p className="mb-0 font-semibold capitalize">pay bills</p>
        </div>

        <div>
          <h2 className="font-semibold md:text-[1.7rem] md:text-center">
            Payment Account Details
          </h2>
          <p className="text-stone-600 md:text-center md:mb-0">
            Pay bills by making a direct transfer from any Nigerian bank.
          </p>
        </div>
        <div className="mt-16 divide-y  divide-secondary700  ">
          <div className="flex justify-between items-center py-5">
            <p className="text-stone-600 text-[1rem] mb-0">Account Number:</p>
            {isLoading ? (
              <BlueMiniLoader />
            ) : (
              <h3 className="flex font-semibold text-stone-800 md:text-[1.4rem] relative items-center gap-x-2 mb-0">
                {accountNumber}
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
            <h3 className="flex font-semibold text-stone-800 md:text-[1.4rem]  items-center gap-x-2 mb-0">
              {isLoading ? <BlueMiniLoader /> : accountName}
            </h3>
          </div>
          <div className="flex justify-between items-center py-5">
            <p className="text-stone-600 text-[1rem] mb-0">Bank Name:</p>
            <h3 className="flex font-semibold text-stone-800 md:text-[1.4rem] items-center gap-x-2 mb-0">
              {isLoading ? <BlueMiniLoader /> : bankName}
            </h3>
          </div>
          <div className="flex justify-between items-center py-5">
            <p className="text-stone-600 text-[1rem] mb-0"> Total Fee:</p>
            <h3 className="flex font-semibold md:text-[1.4rem] text-stone-800 items-center gap-x-2 mb-0">
              {isLoading ? <BlueMiniLoader /> : formatNaira(paymentAmount)}
            </h3>
          </div>
        </div>
        <Button onClick={handleConfirm} className="my-6 py-3 w-full">Confirm transaction</Button>

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
          <article className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm flex items-center justify-center max-sm:hidden md:flex">
            <div className="bg-white py-[4.5rem] px-40 rounded-lg shadow-lg">
              <h2 className="text-secondary600 mb-16 text-[1.9rem] text-center font-semibold">
                Confirming transaction
              </h2>
              <div className="flex justify-center">
                <div className=" load relative h-[5rem] md:h-[5.2rem]">
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
