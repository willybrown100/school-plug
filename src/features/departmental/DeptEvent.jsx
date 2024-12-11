import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules"; 

export default function DeptEvent() {
    const navigate = useNavigate()
    const handleClick = function(){
navigate(-1)
    }

    const events = [
      {
        text: "willlslslllllllwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        images: ["/images/blackman2.png"],
        likesCount: "1k",
        commentsCount: 100,
      },
    //   {
    //     text: "willlslslllllllwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    //     images: ["/images/blackman2.png"],
    //     likesCount: "1k",
    //     commentsCount: 100,
    //   },
    ];
  return (
    <article className="min-h-screen  px-3 py-4 pb-[8rem]">
      <div className="flex gap-x-2 items-center mb-5">
        <button onClick={handleClick} className="bg-transparent">
          <img src="\assets\arrow-left.svg" alt="icon" />
        </button>
        <p className="mb-0 font-semibold capitalize">events</p>
      </div>

      <div>
        {events?.length >= 1 && (
          <article className=" pb-2 z-[-1]">
        <h4>events i posted</h4>
            <Swiper
              modules={[Pagination]}
              spaceBetween={6}
              slidesPerView={events.length >= 3 ? 2.1 : events.length}
              navigation={false}
              pagination={false}
            >
              {events.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="border bg-white border-stone-300 p-1 overflow-hidden rounded-md h-[42vh] grid grid-rows-[auto,auto,1fr,auto]">
                    <p className="mb-0 text-stone-700">post:</p>
                    <p className="  break-words max-full text-sm ">
                      { item?.text?.slice(0, 18)}
                      {item?.text?.length > 18 && (
                        <span
                         
                          className="text-stone-600 cursor-pointer ml-1"
                        >
                          ...
                        </span>
                      )}
                    </p>
                    <img
                      src={item.images[0]}
                      alt={item.type}
                      className="w-full h-full"
                      loading="lazy"
                    />
                    <div className="flex justify-between mt-2">
                      <div className="flex gap-x-1 items-center">
                        <img src="\assets\like2.svg" />
                        <p className="mb-0 text-sm">{item.likesCount}</p>
                      </div>
                      <div className="flex gap-x-1 items-center">
                        <img src="\assets\message-3.svg" />
                        <p className="mb-0 text-sm">{item.commentsCount}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
        )}
      </div>
    </article>
  );
}
