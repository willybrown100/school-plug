import React from 'react'
import useGetUser from '../hooks/useGetUser'
import Button from '../ui/Button';
import {  getYearFromISODate } from '../utils/dateFormat';
import SmallLoader from './SmallLoader';

export default function UserDetails() {
const {data,isLoading}=useGetUser()
const {studentInfo,user}=data
const img = user?.profilePhoto
console.log(data)
  return (
    <div className="hidden md:block ">
      <div className=" p-6 bg-white rounded-lg ">
        <div className="flex gap-x-6 items-center pb-9 border-b-2">
          {isLoading?<SmallLoader/>:<img
            src={
              img
                ? img
                : "/images/profile-circle.svg"
            }
            alt={user?.name}
            className="rounded-full h-[5rem] w-[5rem] object-cover"
          />}
          <h4 className="font-heading mb-0 font-semibold capitalize">
            {user?.name}
          </h4>
        </div>

        <div className="flex flex-col gap-y-2 mt-2">
          <div className="flex gap-x-2 items-center">
            <img src="\images\teacher.svg" alt="icon" />
            <p className="mb-0  capitalize text-stone-600 font-heading">
              {" "}
              department:
            </p>
          </div>
          <p className="capitalize mb-0 text-stone-600  font-heading">
            {studentInfo?.department}
          </p>
        </div>
        <div className="flex flex-col gap-y-2 mt-[0.4rem]">
          <div className="flex gap-x-2 items-center">
            <img src="\images\book.svg" alt="icon" />
            <p className="mb-0  capitalize text-stone-600  font-heading">
              {" "}
              faculty:
            </p>
          </div>
          <p className="mb-0 capitalize text-stone-600  font-heading">jhj</p>
        </div>
        <div className="flex flex-col gap-y-2  mt-[0.4rem]">
          <div className="flex gap-x-2 items-center">
            <img src="\images\book2.svg" alt="icon" />
            <p className="mb-0  capitalize text-stone-600  font-heading">
              {" "}
              course:
            </p>
          </div>
          <p className="capitalize mb-0 text-stone-600  font-heading">
            {" "}
            {studentInfo?.course}
          </p>
        </div>
        <div className="flex flex-col  mt-[0.4rem] gap-y-2 ">
          <div className="flex gap-x-2 items-center">
            <img src="\images\calendar.png" className="w-[1rem]" alt="icon" />
            <p className="mb-0  capitalize text-stone-600  font-heading">
              {" "}
              admision year:
            </p>
          </div>

          <p className="capitalize mb-0 text-stone-600  font-heading">
            {getYearFromISODate(studentInfo?.yearOfAdmission)}
          </p>
        </div>
        <Button className="w-full mt-4 text-stone-600">view profile</Button>
      </div>
    </div>
  );
}
