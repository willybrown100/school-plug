import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NotificationSkeleton } from './NotificationSkeleton';
import PerNotification from './PerNotification';
import useFetchNotification from '../hooks/useFetchNotification';
import { useSocket } from './SocketProvider';

export default function NotificationModal() {
    const navigate = useNavigate()
      const handleClick = function () {
        navigate(-1);
      };
      const btns = [
        { name: "all" },
        { name: "mentions" },
      ];
        const [active,setActive]=useState(null)
        const handleClickBtn = function(name){
      setActive(name);
        }
        const {isLoading}=useFetchNotification()
        const {notification}=useSocket()
        console.log(notification,isLoading);
  return (
    <div className='fixed top-[5.5rem] w-[20rem] hidden lg:block right-6 rounded-md h-[33rem] bg-white p-2 '>

       <div className=' p-1 rounded-xl '>
                <div className="flex items-center gap-x-3">
                  <button onClick={handleClick} className='bg-transparent md:hidden'>
                    <img src="/assets/arrow-left.svg" alt="img" />
                  </button>
                  <h3 className="mb-0 font-semibold lg:text-[1.3rem]">notification</h3>
                </div>
      
                <ul className="flex gap-x-4 mt-4 ">
                  {btns.map((btn) => (
                    <li key={btn.name}>
                      <button
                        onClick={() => handleClickBtn(btn.name)}
                        className={`capitalize ${
                          active === btn.name
                            ? " border-secondary600 text-secondary600"
                            : "border-stone-700"
                        } bg-transparent border  rounded-full px-4 py-[0.1rem]`}
                      >
                        {btn.name}
                      </button>
                    </li>
                  ))}
                </ul>
                {notification.length === 0 && (
                  <p className="m-auto capitalize text-stone-600 text-center mt-3">
                    no notification yet{" "}
                  </p>
                )}
                {isLoading ? (
                  <ul className="flex flex-col pt-4 divide-y-2  divide-secondary600">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <NotificationSkeleton key={index} />
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col pt-4 divide-y-2 overflow-auto divide-secondary600">
                    {notification?.map((item) => (
                      <PerNotification key={item.postId} item={item} />
                    ))}
                  </ul>
                )}
              </div>
    </div>
  )
}
