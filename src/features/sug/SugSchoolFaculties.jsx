import React from 'react'
import { useNavigate } from 'react-router-dom';
import useGetSugUser from '../../hooks/useGetSugUser';
import MiniLoader from '../../ui/MiniLoader';
import BlueLoader from '../../components/BlueLoader';


const faculty = [
    {faculty:"faculty of art"},
    {faculty:"faculty of art"},
    {faculty:"faculty of art"},
    {faculty:"faculty of art"},
    {faculty:"faculty of art"},
    {faculty:"faculty of art"},

]
export default function SugSchoolFaculties() {
      const { data, isLoading } = useGetSugUser();
     
      const {faculties} = data?.data?.user || {};
      

    const navigate = useNavigate()
    const handleClick = function(){
navigate(-1)
    }
  return (
    <section className="min-h-screen ">
      <article className="pb-[10rem]">
        <div className="flex justify-between gap-x-2 items-center">
          <div className="flex gap-x-2 items-center ">
            <button onClick={handleClick} className="bg-transparent">
              <img src="\assets\arrow-left.svg" alt="icon" />
            </button>
            <h4 className="mb-0 font-semibold capitalize">School faculties</h4>
          </div>
          <button className="bg-secondary600 px-4 py-1 rounded-[2rem] capitalize text-white">
            save
          </button>
        </div>

        <article className="border border-stone-500 rounded-md p-2 mt-6">
          <div className="flex justify-between gap-x-3 items-center">
            <div className="flex flex-col gap-y-1">
              <h4 className="mb-0">School Faculties</h4>
              <p className="mb-0 text-stone-500">Add or remove faculty</p>
            </div>
            <p className="border border-secondary400 rounded-full mb-0 p-1">
              {" "}
              <span className="border-2 border-green-600 w-7 h-7 rounded-full flex justify-center items-center">
                0
              </span>
            </p>
          </div>
          <ul className="mt-5">
            {isLoading && (
              <div className='flex  justify-center items-baseline'>
                <BlueLoader />
              </div>
            )}
            {faculties?.map((item) => (
              <li className="relative p-2">
                <div className="border  border-stone-500 p-2 rounded-md">
                  <h5 className="pl-3">{item.facultyName}</h5>
                  <button className="absolute border p-1 border-green-500 px-1 top-4 left-0 ">
                    <div className="w-3  h-3 rounded-full bg-secondary500"></div>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </article>
    </section>
  );
}
