import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import useGetSugUser from '../../hooks/useGetSugUser';
import BlueMiniLoader from '../../ui/BlueMiniLoader';

const reg = [
    { regNums: "Reg5349",faculty:"faculty of arts" },
    { regNums: "Reg5349",faculty:"faculty of arts" },
    { regNums: "Reg5349",faculty:"faculty of arts" },
    { regNums: "Reg5349",faculty:"faculty of arts" },
    { regNums: "Reg5349",faculty:"faculty of arts" },
    { regNums: "Reg5349",faculty:"faculty of arts" },

];

export default function SugImportedRegNums() {
  const { data, isLoading } = useGetSugUser();

  const { students } = data?.data?.user || {};

    const navigate = useNavigate()
    const handleClick=function(){
        navigate(-1)
    }
  return (
    <section>
      <article className="">
        <div className="flex justify-between items-center gap-x-3 mb-5">
          <div className="flex gap-x-2 items-center ">
            <button onClick={handleClick} className="bg-transparent">
              <img src="\assets\arrow-left.svg" alt="icon" />
            </button>
            <p className="mb-0 font-semibold capitalize">Imported Reg no.</p>
          </div>
          <button className="bg-secondary600 px-5 py-1 capitalize text-white rounded-2xl">
            save
          </button>
        </div>

        <article className="border border-stone-400 rounded-md  p-2">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Imported Reg. No.</h4>
            <p className="mb-0 text-secondary600 font-semibold">
              {isLoading?<BlueMiniLoader/>:students?.length}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="mb-0  text-stone-500">Add or remove Reg. No.</p>
            <p className="mb-0 capitalize text-stone-500">added</p>
          </div>
          <ul className="overflow-auto h-[50vh]  divide divide-y">
            {reg.map((item) => (
              <li className="flex justify-between py-3 items-center">
                <div>
                  <p className="mb-2 capitalize font-semibold  text-stone-600">
                    {item.regNums}
                  </p>
                  <p className="mb-0 capitalize text-stone-500">
                    {item.faculty}
                  </p>
                </div>
                <button className="border border-stone-500 px-2 text-stone-500 rounded-full bg-transparent">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </article>

        <article className=" mt-6 border border-stone-500 p-2 rounded-md">
          <div className="flex gap-x-3 items-center mb-3">
            <h4 className="mb-0">Add a new Reg No.</h4>
            <img src="\assets\circlesmall.svg" alt="icon" />
          </div>
          <form className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1 bg-stone-50 p-2">
              <label className="capitalize text-stone-700">
                Student Reg No.{" "}
              </label>
              <input
                type="text"
                placeholder="e.g Reg5349"
                className="border border-stone-500 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-y-1 bg-stone-50 p-2">
              <label className="capitalize text-stone-700">faculty </label>
              <input
                type="text"
                placeholder="e.g Faculty of arts"
                className="border border-stone-500 rounded-md p-2"
              />
            </div>
            <button className="border bg-transparent text-secondary600 font-semibold border-secondary600 p-3 rounded-md text-center w-full">
              Add Reg No
            </button>
          </form>
        </article>
      </article>
    </section>
  );
}
