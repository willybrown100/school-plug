import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules"; 

import SugPerEvent from './SugPerEvent';
import BlueMiniLoader from '../../ui/BlueMiniLoader';
import useGetEvents from '../../hooks/useGetEvents';
import useGetParticularAdminEvent from '../../hooks/useGetParticularAdminEvent';
import PageLoader from '../../components/PageLoader';
export default function SugEvent() {
 
  const navigate = useNavigate()
  const handleClick = function(){
navigate("/sughome")
  }

  const events = [
    {
      text: "willlslslllllllwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      images: ["/images/blackman2.png"],
      likesCount: "1k",
      commentsCount: 100,
    },
      {
        text: "willlslslllllllwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        images: ["/images/blackman2.png"],
        likesCount: "1k",
        commentsCount: 100,
      },
  ];
const {data,isLoading}=useGetEvents()
const { data:adminEvent, } = useGetParticularAdminEvent();

//  isLoading: isGetting;
  const event =data?.events
  console.log( adminEvent);
  if(isLoading)return <PageLoader/>
  return (
    <article className="p-3 mt-10 bg-stone-50 pb-[12rem]">
      <div className="flex gap-x-2 items-center mb-5">
        <button onClick={handleClick} className="bg-transparent">
          <img src="\assets\arrow-left.svg" alt="icon" />
        </button>
        <p className="mb-0 font-semibold capitalize">events</p>
      </div>

      <div>
        <h4>events i posted</h4>
        {adminEvent?.events?.length >= 1 && (
          <article className=" pb-2 z-[-1]">
            <Swiper
              modules={[Pagination]}
              spaceBetween={6}
              slidesPerView={events.length >= 3 ? 2.1 : events.length}
              navigation={false}
              pagination={false}
            >
              {adminEvent?.events?.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="border bg-white border-stone-300 p-1 overflow-hidden rounded-md h-[40vh] grid grid-rows-[auto,auto,1fr]">
                    <p className="mb-0 text-stone-700">post:</p>
                    <p className="  break-words max-full text-sm ">
                      {item?.title?.slice(0, 18)}
                      {item?.title?.length > 18 && (
                        <span className="text-stone-600 cursor-pointer ml-1">
                          ...
                        </span>
                      )}
                    </p>
                    <img
                      src={
                        item.flyer[0]
                          ? item.flyer[0]
                          : "/images/event dummy image.webp"
                      }
                      alt={item.type}
                      className="w-full object-cover h-[10rem]"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <BlueMiniLoader />
        </div>
      ) : (
        <ul className="flex flex-col gap-y-2">
          {event?.map((item) => (
            <SugPerEvent key={item._id} item={item} />
          ))}
        </ul>
      )}
    </article>
  );
}
