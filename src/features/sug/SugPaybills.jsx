

import React from 'react'
import {  useNavigate } from 'react-router-dom';

import useGetPaymentStatus from '../../hooks/useGetPaymentStatus';

import BlueMiniLoader from '../../ui/BlueMiniLoader';

export default function SugPaybills() {
   const { data, isLoading }=useGetPaymentStatus()
 
 
  const navigate = useNavigate()
  const handleClick = function(){
    navigate(-1);
  }
  const handleClick2 = function(){
    navigate("/sughome/sugviewbills");

  }



const { totalRegistrations, totalPaid, totalUnpaid,  } =
  data?.data || {};


  return (
    <article className="pb-[9rem] px-3 py-4">
      <button className="flex gap-x-2 items-center" onClick={handleClick}>
        {" "}
        <img src="/assets/arrow-left.svg" alt="icon" />
        <h4 className="font-semibold mb-0 ">bills</h4>
      </button>

      <div className="mt-6">
        <p className="text-stone-500">
          This is a summary of the total number of Reg. Numbers that has paid
          off their SUG bill.
        </p>

        <div className="border border-stone-400 rounded-md p-3">
          <div className="flex gap-x-2 items-center">
            <h3 className=" mb-0 font-semibold">SUG bills</h3>
            <p className="border border-secondary400 rounded-full mb-0 p-[0.1rem]">
              {" "}
              <span className="border-2 border-green-600 w-6 h-6 rounded-full flex justify-center items-center">
                <img src="\assets\billz.svg" />
              </span>
            </p>
          </div>

          <p className="text-stone-700 capitalize mt-3">payment summary</p>
          <div className="divive divide-y ">
            <div className="flex justify-between py-2">
              <p className="mb-0 text-stone-700">Total Reg. Number</p>
              <p className="mb-0 text-stone-700">
                {isLoading ? <BlueMiniLoader /> : totalRegistrations}
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="mb-0 text-stone-700">Reg. Number Paid</p>
              <p className="mb-0">
                {isLoading ? <BlueMiniLoader /> : totalPaid}
              </p>
            </div>
            <div className="flex justify-between py-2">
              <p className="mb-0 text-stone-700">Reg. Number Unpaid</p>
              <p className="mb-0">
                {isLoading ? <BlueMiniLoader /> : totalUnpaid}
              </p>
            </div>
            <div className="mt-10 w-full">
              <button
                onClick={handleClick2}
                className="capitalize border bg-transparent mt-6 border-secondary600 p-2 rounded-md w-full text-center text-secondary600 font-semibold"
              >
                view more details
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}





// const fetchPaymentStatus = async (schoolInfoId, page) => {
//   const response = await fetch(
//     `https://student-plug.onrender.com/api/payment/payment-status/${schoolInfoId}?page=${page}&limit=1`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch payment status");
//   }
//   const result = await response.json();
//   return result;
// };



