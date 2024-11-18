/* eslint-disable react/prop-types */
import React from "react";

export default function DefaultSchool({ data }) {
  const { schoolInfo } = data;
  const { aboutUniversity, state, university, uniProfilePicture } =
    schoolInfo || {};
  return (
    <div className=" p-4 bg-white rounded-md mb-3">
      <div className="flex gap-x-3 items-center mb-4 bg-white">
        <img
          src={uniProfilePicture}
          loading="lazy "
          alt="person"
          className="h-14 w-14 object-cover rounded-full"
        />
        <div>
          <h4 className="uppercase mb-1">{university}</h4>
          <h4 className="capitalize text-sm mb-0 text-stone-500 ">
            {state}, nigeria
          </h4>
        </div>
      </div>
      <div>
        <h4 className="capitalize">
          this is{" "}
          <span className="uppercase font-semibold font-heading">
            {university}
          </span>
        </h4>
       
        <p className="font-heading break-words text-wrap md:w-[27rem] lg:w-[22rem] xl:w-full  text-sm sm:text-base text-gray-700 ">
          {aboutUniversity}
        </p>
      </div>
    </div>
  );
}
