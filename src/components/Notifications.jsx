import React, { useState } from "react";
import notificationsData from "../lib/consts/notifications";
import deleting from "../../src/assets/notifications/delete.svg";
import showLess from "../../src/assets/notifications/show-less.svg";
import mute from "../../src/assets/notifications/mute.svg";
import mark from "../../src/assets/notifications/mark.svg";
import notifications from "../lib/consts/notifications";

const Notifications = () => {
  const [activeModalId, setActiveModalId] = useState(null);
  const [filter, setFilter] = useState("All");

  function handleToggleModal(id) {
    if (activeModalId === id) {
      setActiveModalId(null); // Close the modal if it is already open
    } else {
      setActiveModalId(id); // Open the modal for the clicked item
    }
  }

  // Function to filter notifications based on filter state
  const filteredNotifications =
    filter === "All"
      ? notificationsData
      : notificationsData.filter((notification) =>
          notification.action.toLowerCase().includes("mention")
        );

  return (
    <div className="bg-white px-20 flex flex-col w-full justify-center py-5 gap-3 container mx-auto">
      <h1 className="text-2xl font-semibold">Notification</h1>
      <div className="flex gap-2">
        <button
          className={`border rounded-full px-5 py-1 ${
            filter === "All" ? "text-[#2B70DB] border-[#2B70DB]" : ""
          }`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`border rounded-full px-5 py-1 ${
            filter === "Mentions" ? "text-[#2B70DB] border-[#2B70DB]" : ""
          }`}
          onClick={() => setFilter("Mentions")}
        >
          Mentions
        </button>
      </div>
      <div className="bg-gray-100 ">
        {filteredNotifications.map((object) => (
          <div key={object.id} className="">
            <div className="flex justify-between items-center px-2 py-2">
              <div className="flex py-2 items-center gap-1">
                {object.images &&
                  Object.keys(object.images).map((key) => (
                    <img
                      key={key}
                      src={object.images[key]}
                      alt=""
                      className="w-[32px] h-[32px]"
                    />
                  ))}
              </div>

              <div className="flex items-center gap-3">
                {object.icon && (
                  <img src={object.icon} alt="Notification icon" />
                )}

                <div className="relative">
                  <ul
                    className="flex flex-col gap-[3px] cursor-pointer"
                    onClick={() => handleToggleModal(object.id)}
                  >
                    <li className="border w-5 border-gray-500 rounded-full h-[2px] bg-gray-500" />
                    <li className="border w-5 border-gray-500 rounded-full h-[2px] bg-gray-500" />
                    <li className="border w-5 border-gray-500 rounded-full h-[2px] bg-gray-500" />
                  </ul>
                  {activeModalId === object.id && (
                    <ul className="absolute w-80 top-full right-0 border rounded-xl bg-white py-2 px-5 z-10">
                      <li className="flex my-3 place-items-center gap-2 w-full bg-gray-100 border-gray-100 rounded-md border px-2 py-1 relative">
                        <img
                          src={deleting}
                          alt=""
                          className="w-[24px] h-[24px]"
                        />
                        <h4 className="text-xs absolute top-2 left-[40px]">Delete notification</h4>
                      </li>
                      <li className="flex my-3 items-center gap-2 w-full bg-gray-100 border-gray-100 rounded-md border px-2 py-1 relative">
                        <img
                          src={showLess}
                          alt=""
                          className="w-[24px] h-[24px]"
                        />
                        <h4 className="text-xs absolute top-2 left-[40px]">
                          Show less of this notification
                        </h4>
                      </li>
                      <li className="flex my-3 items-center gap-2 w-full bg-gray-100 border-gray-100 rounded-md border px-2 py-1 relative">
                        <img src={mute} alt="" className="w-[24px] h-[24px]" />
                        <h4 className="text-xs absolute top-2 left-[40px]">
                          Turn off receiving notification
                        </h4>
                      </li>
                      <li className="flex my-3 items-center gap-2 w-full bg-gray-100 border-gray-100 rounded-md border px-2 py-1 relative">
                        <img src={mark} alt="" className="w-[24px] h-[24px]" />
                        <h4 className="text-xs absolute top-2 left-[40px]">Mark notification as read</h4>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

           <div className="py-2 px-2">
           <h1 className="text-sm font-bold">
              {object.title.text}{" "}
              <span className="font-normal">{object.title.span}</span>
            </h1>
            <p>
              {object.action}: {object.message}
            </p>
           </div>
          <hr className="pb-3  border-[#2B70DB]" />
          </div>

        ))}
      </div>
    </div>
  );
};

export default Notifications;
