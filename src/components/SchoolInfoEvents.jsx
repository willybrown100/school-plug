import React from 'react'
import useGetRegisteredSchools from '../hooks/useGetRegisteredSchools';

export default function SchoolInfoEvents() {
      const { data: schoolPosts } = useGetRegisteredSchools();
      const { state, uniProfilePicture, university } =
        schoolPosts?.pages?.at(0).schoolInfo || {};
  return (
    <div className=" p-4 mb-2 bg-white rounded-lg flex  flex-col gap-y-3">
      <div className="flex gap-x-3 items-center">
        <img
          src={
            uniProfilePicture ? uniProfilePicture : "/images/profile-circle.svg"
          }
          alt="person"
          className="rounded-full object-cover h-14  w-14"
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
        <p className="font-heading">Find all the events in your school here.</p>
      </div>
    </div>
  );
}
