import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { optionSplit } from '../utils/dateFormat';
import BillModal from './BillModal';
import Modals from './Modals';

export default function BillInformation() {
  const [searchParams] = useSearchParams();
  const option = searchParams.get("option");
  console.log(option);


  const className = "max-w-[1250px]   w-[90vw]  m-auto";
  return (
    <div className={`${className} min-h-screen flex justify-between  gap-x-6`}>
      <div className="bg-white rounded-md p-4 self-start w-[300px] shadow-lg">
        <h4 className="border-b capitalize font-semibold p-4">bill type</h4>
        <div className="flex gap-x-2 border border-stone-400 p-2 rounded-md">
          <input type="radio" checked className="self-start" />
          <div>
            <h4 className="mb-0">{optionSplit(option)}</h4>
            <h4 className="mb-0">1000</h4>
          </div>
        </div>
       <OpenModal/>
      </div>

      <div className='flex flex-col gap-y-4 flex-1'>
        <h4 className='font-semibold capitalize mb-0'>student information</h4>

        <div className="bg-white rounded-md p-3 flex justify-between gap-x-3">
          <div className="flex flex-col gap-y-3 flex-1">
            <div className="flex gap-x-2 items-center">
              <img src="\images\check-circle.svg" alt="icon" />
              <label className="capitalize font-heading font-semibold">
                1.first name
              </label>
            </div>
            <input
              type="text"
              placeholder="enter your first name"
              className="border p-2 w-full placeholder:capitalize border-stone-500 rounded-md"
            />
          </div>

          <div className="flex flex-col gap-y-3 flex-1">
            <div className="flex gap-x-2 items-center">
              <img src="\images\check-circle.svg" alt="icon" />
              <label className="capitalize font-heading font-semibold">
                1.last name
              </label>
            </div>
            <input
              type="text"
              placeholder="enter your last name"
              className="border p-2 w-full placeholder:capitalize border-stone-500 rounded-md"
            />
          </div>
        </div>

        <div className="bg-white rounded-md p-3 flex justify-between gap-x-3">
          <div className="flex flex-col gap-y-3 flex-1">
            <div className="flex gap-x-2 items-center">
              <img src="\images\check-circle.svg" alt="icon" />
              <label className="capitalize font-heading font-semibold">
                3.department
              </label>
            </div>
            <input
              type="text"
              placeholder="enter your first name"
              className="border p-2 w-full placeholder:capitalize border-stone-500 rounded-md"
            />
          </div>

          <div className="flex flex-col gap-y-3 flex-1">
            <div className="flex gap-x-2 items-center">
              <img src="\images\check-circle.svg" alt="icon" />
              <label className="capitalize font-heading font-semibold">
                4.reg. no
              </label>
            </div>
            <input
              type="text"
              placeholder="enter your last name"
              className="border p-2 w-full placeholder:capitalize border-stone-500 rounded-md"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-md p-3 grid grid-cols-2 gap-x-3">
          <div className="flex flex-col gap-y-3 ">
            <div className="flex gap-x-2 items-center">
              <img src="\images\check-circle.svg" alt="icon" />
              <label className="capitalize font-heading font-semibold">
                5.current academic level
              </label>
            </div>
           <select className='border border-stone-600 rounded-md p-3'>
            <option>select level</option>
            <option>select level</option>
            <option>select level</option>
            </select>
          </div>

       <div className='flex justify-end items-end'>
        <button className='bg-secondary400  rounded-md px-8 py-2 text-white capitalize font-heading font-semibold'>continue</button>
       </div>
        </div>


      </div>
    </div>
  );
}

function OpenModal() {
  return (
    <Modals>
      <Modals.Open opens="bill">
        <button className="bg-secondary600 p-3 rounded-md text-white w-full capitalize font-heading my-3">
          switch bill type
        </button>
      </Modals.Open>
      <Modals.Window name="bill">
        <BillModal />
      </Modals.Window>
    </Modals>
  );
}