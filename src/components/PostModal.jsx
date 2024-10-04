import React from 'react'
import useGetUser from '../hooks/useGetUser';

export default function PostModal() {
  
     const { data, isLoading } = useGetUser();
     const {user,studentInfo}=data
     const img = data?.user?.profilePhoto;
     console.log(img);
  return (
    <div className="">
      {/* Background overlay */}
      <div className="fixed z-10 inset-0 pointer-events-auto grid place-items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Separate background overlay */}
        {/* Content div */}
        <div className="relative w-[600px] rounded-md z-20 bg-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <img
                src={img ? img : ""}
                alt={user?.name}
                className="w-[3rem] h-[3rem] rounded-full object-cover"
              />
              <h4 className="mb-0">{user?.name}</h4>
            </div>
            <button className="h-8 w-8 border border-stone-500 rounded-full p-[0.6rem]  bg-transparent">
              <img src="\images\close-circle.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
