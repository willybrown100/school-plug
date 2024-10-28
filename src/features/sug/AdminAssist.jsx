import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminAssist() {
     const navigate = useNavigate();
     const handleClick = function () {
       navigate(-1);
     };
  return (
    <section className="p-3">
      <div className="flex gap-x-2 items-center mb-5">
        <button onClick={handleClick}>
          <img src="\src\assets\arrow-left.svg" alt="icon" />
        </button>
        <p className="mb-0 font-semibold capitalize">admin assist</p>
      </div>

      <article className="border border-stone-500 rounded-md p-2">
        <div className="flex gap-x-2 items-center">
          <h3 className="mb-0 font-semibold text-stone-600">add admin</h3>
          <img src="\src\assets\circlesmall.svg" alt="icon" />
        </div>
        <p className="text-sm text-stone-400">Add a max of three admins</p>

        <div className="bg-stone-100 flex p-2 flex-col gap-y-1">
          <label className="capitalize text-stone-500">email</label>
          <input
            type="email"
            placeholder="e.g nwankwoemma@gmail.com"
            className="border border-stone-500 p-2 rounded-md"
          />
        </div>

        <div className="capitalize text-secondary600 border border-secondary500 rounded-md p-2 text-center mt-5 font-medium">
          add as admin
        </div>
      </article>

      <div className="flex justify-center my-4">
        <button className="text-center flex justify-center my-4">
          <img src="\src\assets\add-circle.svg" alt="icon" className="" />
        </button>
      </div>
    </section>
  );
}
