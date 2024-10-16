import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { optionSplit } from '../utils/dateFormat';
import BillModal from './BillModal';
import Modals from './Modals';

export default function BillInformation() {
  const [searchParams] = useSearchParams();
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [department,setDepartment]=useState("")
  const [regNumber,setRegNumber]=useState("")
  const [academicLevel,setAcademicLevel]=useState("")
  const option = searchParams.get("option");


 const disablLevel = academicLevel.length === 0;
 const disablReg = regNumber.length === 0; 
 const disableDep = department.length === 0 
  const disableLast =lastName.length === 0 
 const disableName = firstName.length === 0;
 

  const studentData = {
    academicLevel,
    regNumber,
    department,
    lastName,
    firstName,
    option,
  };
const handleSubmit = (e)=>{
e.preventDefault()
console.log(studentData);
}
  const className = "max-w-[1250px]   w-[90vw]  m-auto";
  return (
    <article className="hidden  h-[calc(100vh-75px)] lg:grid grid-rows-[1fr,auto]   ">
      <form
        onSubmit={handleSubmit}
        className={`${className}  h-full flex justify-between  gap-x-6`}
      >
        <div className="bg-white rounded-md  p-4 self-start w-[300px] shadow-lg">
          <h4 className="border-b capitalize font-semibold p-4">bill type</h4>
          <div className="flex gap-x-2 border border-stone-400 p-2 rounded-md">
            <input type="radio" checked className="self-start" value={option} />
            <div>
              <h4 className="mb-0">{optionSplit(option)}</h4>
              <h4 className="mb-0">1000</h4>
            </div>
          </div>
          <OpenModal />
        </div>

        <div className="flex flex-col gap-y-4 flex-1">
          <h4 className="font-semibold capitalize mb-0">student information</h4>

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
                required
                placeholder="enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                required
                placeholder="enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                required
                placeholder="enter your first name"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
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
                required
                placeholder="enter your last name"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
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
              <select
                required
                className="border border-stone-600 rounded-md p-3"
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value)}
              >
                <option>select level</option>
                <option>select level</option>
                <option>select level</option>
              </select>
            </div>

            <div className="flex justify-end items-end">
              <button
                disabled={
                  disablLevel &&
                  disablReg &&
                  disableDep &&
                  disableLast &&
                  disableName
                }
                className={`${
                  disablLevel ||
                  disablReg ||
                  disableDep ||
                  disableLast ||
                  disableName
                    ? "bg-secondary400"
                    : "bg-secondary600"
                }   rounded-md px-8 py-2 text-white capitalize font-heading font-semibold`}
              >
                continue
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="bg-secondary600 p-4 flex justify-center  ">
        <p className="text-white capitalize mb-0 font-heading font-semibold">
          all copyright reserved @schoolplug
        </p>
      </div>
    </article>
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