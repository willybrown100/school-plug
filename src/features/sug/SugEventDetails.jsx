
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { timeAgo } from '../../utils/timeStampAgo';
import PageLoader from '../../components/PageLoader';
import usePerEventDetail from '../../hooks/usePerEventDetail';

export default function SugEventDetails() {
  const navigate = useNavigate()

  const [open,setOpen]=useState(false)
  const handleClick = function(){
    setOpen(!open)
  }
  const handleBack = function(){
    navigate(-1)
  }

  const { data, isLoading } = usePerEventDetail()
   const { title, uniProfilePicture, postedByBody,  createdAt,flyer } =
     data?.event || {}
     if (isLoading) return <PageLoader/>
       return (
         <article className=" p-3 bg-stone-50 pb-28">
           <div className="flex gap-x-2 items-center mb-5">
             <button onClick={handleBack} className="bg-transparent">
               <img src="\assets\arrow-left.svg" alt="icon" />
             </button>
             <p className="mb-0 font-semibold capitalize">Events</p>
           </div>
           <div className="flex justify-between items-center relative">
             <div className="flex items-center gap-x-3">
               <img
                 src={uniProfilePicture}
                 alt="img"
                 className="w-14 rounded-full h-14"
               />
               <div>
                 <h5 className="mb-0 font-semibold capitalize">
                   {postedByBody === "sug" ? "sug body" : ""}
                 </h5>
                 <h5 className="mb-0 text-stone-700 text-sm font-light flex gap-x-2">
                   {timeAgo(createdAt)}{" "}
                   <img src="/assets/clock.svg" alt="Time" className="w-4" />
                 </h5>
               </div>
             </div>
             <button className="bg-transparent" onClick={handleClick}>
               <img
                 src="/assets/more.svg"
                 alt="More options"
                 className="self-start cursor-pointer"
               />
             </button>
             {open && (
               <div className="p-2 absolute pr-6 shadow-md bg-white rounded-md bottom-[-2.5rem] right-2">
                 {" "}
                 <div className="bg-stone-100 flex gap-x-3 pr-8 rounded-md items-center p-1">
                   <img
                     src="\assets\trash.svg"
                     alt="trash"
                     className="border border-[#f5c662] p-2 w-[2.2rem] h-[2.2rem] rounded-full"
                   />
                   <button
                     // disabled={isDeleting}
                     // onClick={handleDelete}
                     className="capitalize"
                   >
                     delete this event
                   </button>
                 </div>
               </div>
             )}
           </div>
           <div
             className={`grid gap-x-2 mt-2 ${
               flyer?.length === 2
                 ? "grid-cols-2"
                 : flyer?.length === 1
                 ? "grid-cols-1"
                 : "grid-cols-3"
             }`}
           >
             {flyer?.map((img, index) => (
               <div key={index} className=" ">
                 <img
                   src={img}
                   alt="Post"
                   loading="lazy"
                   className="h-full object-cover w-full rounded-md cursor-pointer"
                 />
               </div>
             ))}
           </div>

           <p className="mt-6 text-stone-600 break-words">{title}</p>
         </article>
       );
}
