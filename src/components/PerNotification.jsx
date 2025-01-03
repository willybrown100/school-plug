/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { notificationType } from "../utils/dateFormat";

export default function PerNotification({ item }) {
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const { title, likersPhotos, likersCount,text, message } = item;
   const handleOpenCommentModal = function () {

     setCommentModalVisible(true);
    //  setActiveTab(index);
   };
  return (
    <article className="p-2 bg-stone-100 hover:bg-stone-200 transition-all duration-300">
      <div className="flex  items-center ">
        <div className="flex items-center gap-x-2">
          {likersPhotos?.map((img) => (
            <div key={img} className="flex items-center gap-x-4">
              <img src={img} alt="img" className="w-8 rounded-full h-8" />
            </div>
          ))}
          {likersPhotos?.length >= 3 && (
            <span className="border border-stone-600 rounded-full p-2 font-semibold">
              +{likersCount - 2}
            </span>
          )}
        </div>

        <div className="flex gap-x-2 ml-auto items-center">
          <img
            src={notificationType(title)}
            alt="img"
            className="border border-secondary500 rounded-full p-1"
          />
          <button
            className="bg-transparent "
            onClick={() => handleOpenCommentModal()}
          >
            <img src="\assets\menu.svg" alt="icon" className="w-4" />
          </button>
        </div>
      </div>
      <p className="font-medium capitalize ">
        {message}:{" "}
        <span className="text-stone-600 font-normal">
          {text?.length > 50 ? `${text}.....` : text}
        </span>
      </p>

      {commentModalVisible && (
        <div
          onClick={() => setCommentModalVisible(false)}
          className="fixed bottom-0 inset-0 bg-black md:hidden  bg-opacity-50 z-50"
        >
          <div className="absolute bottom-0  bg-white rounded-tl-[1.5rem] rounded-tr-[1.5rem] w-full  h-[55dvh] p-6 grid grid-rows-[auto,1fr,auto] overflow-y-auto animate-slideUp">
            <span className="bg-stone-700 h-2 w-28 m-auto rounded-lg"></span>
            <div className="mt-6">
              <h4 className="flex items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\trash.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Delete notification
              </h4>
              <h4 className="flex items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\dislike.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Show less of this notification
              </h4>
              <h4 className="flex items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\notification-bing.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Turn off receiving notification
              </h4>
              <h4 className="flex items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\checkmark.svg"
                  className="border border-[#F5C662]  p-1 rounded-full"
                />
                Mark notification as read
              </h4>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
