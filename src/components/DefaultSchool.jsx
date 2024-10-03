import React from 'react'

export default function DefaultSchool() {
  return (
    <div className=" p-4 bg-white rounded-md">
      <div className="flex gap-x-3 items-center p-4 bg-white">
        <img src="\images\yabatech.png" alt="person" className="rounded-full" />
        <div>
          <h4 className="uppercase mb-1">yaba tech</h4>
          <h4 className="capitalize text-sm mb-0 text-stone-500 ">lagos nigeria</h4>
        </div>
      </div>
      <div>
        <h4 className="capitalize">
          this is{" "}
          <span className="uppercase font-semibold font-heading">
            yaba tech
          </span>
        </h4>
        <p className='font-heading'>
          When writing about what interests you in a job role, it's important to
          focus on several key areas that will not only reflect your enthusiasm
          but also align your interests with the needs and values of the
          organization. Here are some aspects to consider:
        </p>
      </div>
    </div>
  );
}
