import React from 'react'
import useGetRegisteredSchools from '../hooks/useGetRegisteredSchools';
import EventPerPost from "../components/EventPerPost"
export default function Events() {

   const { data: schoolPosts } = useGetRegisteredSchools();
   const { state, uniProfilePicture, university } =
     schoolPosts?.pages?.at(0).schoolInfo || {};

     const events = [
       {
         postownerimg: "/images/blackman2.png",
         faculty: "art",
         text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
         image: ["/images/blackman2.png", "/images/blackman2.png"],
       },
       {
         postownerimg: "/images/blackman2.png",
         faculty: "art",
         text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
         image: ["/images/blackman2.png", "/images/blackman2.png"],
         eventfee: 1200,
       },
       {
         postownerimg: "/images/blackman2.png",
         faculty: "art",
         text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
         image: ["/images/blackman2.png", "/images/blackman2.png"],
         eventfee: 1200,
       },
     ];
  return (
    <article className="min-h-screen max-sm:pt-[7.5rem] md:pt-[9.8rem] lg:pt-[5.4rem]  pb-[8rem]">
      <div className=" p-4 mb-2 bg-white rounded-lg flex flex-col gap-y-3">
        <div className="flex gap-x-3 items-center">
          <img
            src={
              uniProfilePicture
                ? uniProfilePicture
                : "/images/profile-circle.svg"
            }
            alt="person"
            className="rounded-full w-[5rem] h-[5rem]"
          />
          <div>
            <h4 className="uppercase mb-1">{university}</h4>
            <h4 className="capitalize text-sm mb-0 text-stone-500 ">
              {state} nigeria
            </h4>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-secondary600 font-semibold ">
            events in {university}
          </h4>
          <p className="font-heading">
            Find all the events in your school here.
          </p>
        </div>
      </div>

      <ul>
        {events.map((item) => (
          <EventPerPost key={item.text} item={item}/>
        ))}
      </ul>
    </article>
  );
}
