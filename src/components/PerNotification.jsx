/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { notificationType } from "../utils/dateFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "../services/contactApi";
import toast from "react-hot-toast";

export default function PerNotification({ item }) {
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const {
    title,
    photo,
    count,
    text,
    notificationId,
    isRead,
    message,
  } = item;
  const [readNotification, setReadNotification] = useState(isRead);
  const [isOpen,setIsOpen]=useState(false)
console.log(readNotification, notificationId);
const queryClient = useQueryClient()
   const handleOpenCommentModal = function () {

     setCommentModalVisible(true);
  setIsOpen((prev)=>!prev)
   };

   const { mutate,isLoading } = useMutation({
     mutationFn: markNotificationAsRead,
     onSuccess:()=>{
      toast.success("succesfully marked")
      queryClient.invalidateQueries({
        queryKey: ["notification", notificationId],
      });
      setReadNotification(true);
     },
     onError:(error)=>{
      toast.error(error.message)
     }
   });
const handleMarkAsRead = function(){
  mutate({ notificationId: notificationId });
}
  return (
    <article
      className={`p-2  ${
        readNotification ? "bg-white" : "bg-stone-100"
      } hover:bg-stone-200 transition-all duration-300 relative`}
    >
      <div className="flex  items-center ">
        <div className="flex items-center gap-x-2">
          {photo?.map((img) => (
            <div key={img} className="flex items-center gap-x-4">
              <img src={img} alt="img" className="w-8 rounded-full h-8" />
            </div>
          ))}
          {photo?.length >= 3 && (
            <span className="border border-stone-600 rounded-full p-2 font-semibold">
              +{count - 2}
            </span>
          )}
        </div>

        <div className="flex gap-x-2 ml-auto items-center ">
          <img
            src={notificationType(title)}
            alt="img"
            className="border h-6 w-6 object-cover border-secondary500 rounded-full p-1"
          />
          <button
            className="bg-transparent "
            onClick={() => handleOpenCommentModal()}
          >
            <img src="\assets\menu.svg" alt="icon" className="w-4" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={() => setCommentModalVisible(false)}
          className="absolute w-[40vw] right-10 hidden md:block  z-50"
        >
          <div className="  bg-white rounded-tl-[1.5rem] rounded-tr-[1.5rem] w-full  p-6 grid grid-rows-[auto,1fr,auto] overflow-y-auto animate-slideUp">
          
            <div className="mt-6 flex flex-col gap-y-3">
              <button className="flex w-full text-[1rem] items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\trash.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Delete notification
              </button>
              <button className="flex w-full text-[1rem] items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\dislike.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Show less of this notification
              </button>
              <button className="flex text-[1rem] w-full items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\notification-bing.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Turn off receiving notification
              </button>
              <button
                onClick={handleMarkAsRead}
                disabled={isLoading}
                className="flex items-center text-[1rem] w-full gap-x-2 bg-stone-100 p-2 rounded-lg"
              >
                <img
                  src="\assets\checkmark.svg"
                  className="border border-[#F5C662]  p-1 rounded-full"
                />
                Mark notification as read
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="font-medium capitalize ">
        {message}:{" "}
        <span className="text-stone-600 font-normal break-words">
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
            <div className="mt-6 flex flex-col gap-y-3">
              <button className="flex w-full text-[1rem] items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\trash.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Delete notification
              </button>
              <button className="flex w-full text-[1rem] items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\dislike.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Show less of this notification
              </button>
              <button className="flex text-[1rem] w-full items-center gap-x-2 bg-stone-100 p-2 rounded-lg">
                <img
                  src="\assets\notification-bing.svg"
                  className="border border-[#F5C662] p-1 rounded-full"
                />
                Turn off receiving notification
              </button>
              <button
                onClick={handleMarkAsRead}
                disabled={isLoading}
                className="flex items-center text-[1rem] w-full gap-x-2 bg-stone-100 p-2 rounded-lg"
              >
                <img
                  src="\assets\checkmark.svg"
                  className="border border-[#F5C662]  p-1 rounded-full"
                />
                Mark notification as read
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

