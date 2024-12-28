import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import useFetchNotification from '../hooks/useFetchNotification';
import { useSocket } from '../components/SocketProvider';
import useFetchNotification from '../hooks/useFetchNotification';
import PerNotification from "../components/PerNotification"
// import BlueMiniLoader from '../ui/BlueMiniLoader';

export default function Notification() {
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
    <article className="p-3 bg-white min-h-[100dvh]">
      <div className="flex items-center gap-x-3">
        <button onClick={handleClick}>
          <img src="/assets/arrow-left.svg" alt="img" />
        </button>
        <h3 className="mb-0 font-semibold">notification</h3>
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
      {notification.length===0&& <p className='m-auto capitalize text-stone-600 text-center mt-3'>no notification yet </p>}
      {isLoading ? (
        <ul className="flex flex-col pt-4 divide-y-2  divide-secondary600">
          {Array.from({ length: 8 }).map((_, index) => (
            <NotificationSkeleton key={index} />
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col pt-4 divide-y-2  divide-secondary600">
          {notification?.map((item) => (
            <PerNotification key={item.postId} item={item} />
          ))}
        </ul>
      )}
    </article>
  );
}


function NotificationSkeleton() {
  return (
    <li className="flex gap-3 py-3 animate-pulse">
      <div className="bg-gray-300 rounded-full h-10 w-10"></div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
        <div className="bg-gray-300 h-3 rounded w-1/2"></div>
      </div>
    </li>
  );
}
