import React from 'react'
import SchoolInfoEvents from '../components/SchoolInfoEvents';
import Bills from '../components/Bills';
import UserDetails from '../components/UserDetails';
import usePerEventDetail from '../hooks/usePerEventDetail';
import BlueMiniLoader from '../ui/BlueMiniLoader';
import { timeAgo } from '../utils/timeStampAgo';

export default function SudentEventDetails() {
const { data,isLoading } = usePerEventDetail()
 const { title, uniProfilePicture, postedByBody, createdAt, flyer } =
   data?.event || {};
console.log(data)
  return (
    <article className="min-h-screen max-sm:pt-[7.5rem] md:pt-[9.8rem] lg:pt-[5.4rem]  pb-[8rem]">
      <div className="md:w-[90vw] mx-auto flex justify-center lg:grid-cols-[16rem,25rem,20rem] xl:grid-cols-[16rem,1fr,auto] md:grid grid-cols-[16rem,28rem]  gap-x-3">
        <UserDetails />
        <div className="w-full">
          <SchoolInfoEvents />

          {isLoading ? (
            <div className="flex justify-center">
              <BlueMiniLoader />
            </div>
          ) : (
            <article className=" p-3 bg-stone-50 pb-28">
           
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
          )}
        </div>

        <Bills />
      </div>
    </article>
  );
}
