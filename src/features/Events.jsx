import React from 'react'

import EventPerPost from "../components/EventPerPost"
import UserDetails from '../components/UserDetails';
import Bills from '../components/Bills';

import BlueMiniLoader from '../ui/BlueMiniLoader';
import SchoolInfoEvents from '../components/SchoolInfoEvents';
import useGetEventsStudents from '../hooks/useGetEventsStudents';
export default function Events() {
const { data, isLoading } = useGetEventsStudents();

const events = data?.events;



    
  return (
    <article className="min-h-screen max-sm:pt-[7.5rem] md:pt-[9.8rem] lg:pt-[5.4rem]  pb-[8rem]">
      <div className="md:w-[90vw] mx-auto flex justify-center lg:grid-cols-[16rem,25rem,20rem] xl:grid-cols-[16rem,1fr,auto] md:grid grid-cols-[16rem,28rem]  gap-x-3">
        <UserDetails />
        <div className="w-full">
         <SchoolInfoEvents/>

          {isLoading ? (
            <div className='flex justify-center'>
              <BlueMiniLoader />
            </div>
          ) : (
            <ul className="mt-6">
              {events?.map((item) => (
                <EventPerPost item={item} key={item._id} />
              ))}
            </ul>
          )}
        </div>

        <Bills />
      </div>
    </article>
  );
}
