import React from 'react'
import Button from '../ui/Button';

export default function PaymentReceipt() {
  return (
    <article className="min-h-screen pb-[8rem] bg-white p-3">
      <h4 className="text-center font-semibold my-3">Payment successful</h4>
      <div className="border-[1.1rem] border-secondary600 rounded-xl p-2">
        <div className="flex justify-between items-center ">
          <div className="flex gap-x-3 items-center">
            <img src="\images\smLogo.png" alt="img" />
            <h3 className="mb-0 text-secondary600 font-semibold font-heading capitalize">
              SchoolPlug
            </h3>
          </div>
          <p className="mb-0 text-stone-700 text-[0.8rem]">
            SUG Payment Receipt
          </p>
        </div>

        <div className="flex border-b border-stone-300 pb-2 justify-center items-center gap-y-2 mt-2 flex-col">
          <img src="\images\popcorn.png" alt="img" />
          <p className="mb-0 text-[#07B64A]">Payment success</p>
          <h4 className="mb-0 font-semibold text-[#07B64A]">1000</h4>
        </div>

        <h4 className="pt-4">student info</h4>
        <div className="border border-stone-300 border-b mb-3 flex flex-col gap-y-3 bg-stone-50 p-2 rounded-lg">
          <div className="flex flex-col ">
            <h4 className="text-[#07B64A] mb-0 text-sm">Payment made by</h4>
            <h4 className="mb-0">Pbrown willy</h4>
          </div>
          <div className="flex flex-col ">
            <h4 className="text-[#07B64A] mb-0 text-sm">Reg No</h4>
            <h4 className="mb-0">Pbrown willy</h4>
          </div>
          <div className="flex flex-col ">
            <h4 className="text-[#07B64A] mb-0 text-sm">Department</h4>
            <h4 className="mb-0">Pbrown willy</h4>
          </div>
          <div className="flex flex-col ">
            <h4 className="text-[#07B64A] mb-0 text-sm">Academic Year </h4>
            <h4 className="mb-0">Pbrown willy</h4>
          </div>
        </div>
      </div>
<div className='flex justify-center mt-3'>

      <Button className="text-stone-50 px-5 m-auto ">Download Reciept</Button>
</div>
    </article>
  );
}
