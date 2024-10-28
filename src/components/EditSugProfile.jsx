import React from 'react'
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import useGetSugUser from '../hooks/useGetSugUser';

export default function EditSugProfile() {

    const { data, isLoading } = useGetSugUser();
    const sugImg = data?.data?.uniProfilePicture;

  const navigate = useNavigate()
  const handleClick = function(e){

navigate(-1)
  }
  const handleSubmit = function(e){
e.preventDefault()
  }
  return (
    <article className="p-3">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <button type='button' onClick={handleClick} className='bg-transparent'>
              <img src="\src\assets\arrow-left.svg" alt="icon" />
            </button>
            <p className="mb-0 font-semibold capitalize">Edit Profile</p>
          </div>
          <button className="rounded-[1rem] bg-secondary600 capitalize px-4 py-1 tracking-wide font-semibold  text-white ">
            save
          </button>
        </div>

        <div className="relative inline-block my-4">
          <img src={sugImg} alt="img" className="rounded-full w-20 h-20" />

          <div className="absolute inset-0 bg-black opacity-20 rounded-full"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white rounded-full  w-8 h-8 flex items-center justify-center z-50">
              <span className="mb-1 text-[1.2rem]">+</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1">
            <label className="text-stone-500 font-medium ">School name</label>
            <input
              type="text"
              className="border p-2 border-stone-500 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-stone-500 font-medium ">State</label>
            <input
              type="text"
              className="border p-2 border-stone-500 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-stone-500 font-medium ">SUG Full name</label>
            <input
              type="text"
              className="border p-2 border-stone-500 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-stone-500 font-medium ">Email</label>
            <input
              type="text"
              className="border p-2 border-stone-500 rounded-md"
            />
          </div>
          <div className="">
            <textarea
              className="border p-2 border-stone-500 rounded-md h-[9rem] w-full"
              placeholder="About university"
            />
          </div>
        </div>
      </form>
    </article>
  );
}
