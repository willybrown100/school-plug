import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSugFetchNotification from '../../hooks/useSugFetchNotification'
import { useSocket } from '../../components/SocketProvider'
import PerNotification from '../../components/PerNotification'
import { NotificationSkeleton } from '../../components/NotificationSkeleton'

export default function SugNotification() {
  const navigate = useNavigate()
  const handleClick = function(){
    navigate(-1)
  }
  const [active,setActive]=useState(null)
  const handleClickBtn = function(name){
setActive(name);
  }
  console.log(active)
  const btns = [{ name: "all" }, { name: "mentions" }, { name: "   new post" }];

  const {isLoading}=useSugFetchNotification()
  console.log(isLoading)
  const {sugNotification}= useSocket()
  console.log(sugNotification)
  return (
    <div className="p-3 ">
      <div className="flex items-center gap-x-3">
        <button onClick={handleClick}>
          <img src="/assets/arrow-left.svg" alt="img" />
        </button>
        <h3 className="mb-0 font-semibold">notification</h3>
      </div>

      <ul className="flex gap-x-4 mt-4">
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

      {sugNotification.length === 0 && (
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
        <ul className="flex flex-col pt-4 divide-y-2  divide-secondary600">
          {sugNotification?.map((item) => (
            <PerNotification key={item.postId} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

        