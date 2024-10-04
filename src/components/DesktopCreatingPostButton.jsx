import React from 'react'
import useGetUser from '../hooks/useGetUser';
import Modals from "../components/Modals"
import PostModal from "../components/PostModal"
export default function DesktopCreatingPostButton() {

     const { data, isLoading } = useGetUser();
     const img = data?.user?.profilePhoto;
     console.log(img);
  return (
    <div className="mt-6 hidden md:block">
      <div className="bg-white rounded-lg p-2 ">
        <div className="grid grid-cols-[auto,1fr] gap-x-2 ">
          <div className=" rounded-full">
            <img
              src={img ? img : "/images/profile-circle.svg"}
              alt={data?.user?.name}
              className="w-[3rem] object-cover rounded-full h-[3rem] my-0"
            />
          </div>
          <div className="flex flex-col gap-y-4 items-center">
            {/* <input
              type="text"
              placeholder="Share a post for Admin to approve"
              className="w-full border p-2 my-0 border-stone-500 rounded-md focus:outline-none"
            /> */}
            <OpenModal/>
            <div className=" self-start flex gap-x-3">
              <button className="flex gap-x-2 items-center">
                <img src="\images\image.svg" alt="icon" />
                <p className='mb-0 font-heading capitalize'>photos/videos</p>
              </button>
              <button className="flex gap-x-2 items-center">
                <img src="\images\calendar2.svg" alt="icon" />
                <p className='mb-0 font-heading capitalize'>events</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function OpenModal() {
  return (
    <Modals>
      <Modals.Open opens="externalPageUserModal">
        <input
          type="text"
          placeholder="Share a post for Admin to approve"
          className="w-full border p-2 my-0 border-stone-500 rounded-md focus:outline-none"
        />
      </Modals.Open>
      <Modals.Window name="externalPageUserModal">
        <PostModal  />
      </Modals.Window>
    </Modals>
  );
}