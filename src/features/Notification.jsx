import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import useFetchNotification from '../hooks/useFetchNotification';
import { useSocket } from '../components/SocketProvider';
import useFetchNotification from '../hooks/useFetchNotification';
import PerNotification from "../components/PerNotification"
import Navbar from '../components/Navbar';
import { NotificationSkeleton } from '../components/NotificationSkeleton';
// import BlueMiniLoader from '../ui/BlueMiniLoader';

export default function Notification() {
  const navigate = useNavigate();
  const handleClick = function () {
    navigate(-1);
  };
  const btns = [{ name: "all" }, { name: "mentions" }];
  const [active, setActive] = useState(null);
  const handleClickBtn = function (name) {
    setActive(name);
  };

  const { isLoading } = useFetchNotification();
  const { notification } = useSocket();
  console.log(notification, isLoading);
  // Filter to keep only the first valid object for each unique postId with a valid message
  const uniqueNotifications = Array.from(
    notification
      .reduce((map, notification) => {
        // Check if the object has a valid message key
        if (!map.has(notification.postId) && notification.message) {
          map.set(notification.postId, notification);
        }
        return map;
      }, new Map())
      .values()
  );

  console.log(uniqueNotifications);

  return (
    <>
      <Navbar />
      <article className="p-3 bg-white md:bg-stone-100 min-h-[100dvh] md:pt-[10rem]">
        <div className="md:bg-white md:p-4 rounded-xl ">
          <div className="flex items-center gap-x-3">
            <button onClick={handleClick} className="bg-transparent md:hidden">
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
            <ul className="flex flex-col pt-4 divide-y-2  divide-secondary600">
              {uniqueNotifications?.map((item) => (
                <PerNotification key={item.postId} item={item} />
              ))}
            </ul>
          )}
        </div>
      </article>
    </>
  );
}



