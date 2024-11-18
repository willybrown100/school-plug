import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SugNotification() {
  const navigate = useNavigate()
  const handleClick = function(){
    navigate(-1)
  }
  const [active,setActive]=useState(null)
  const handleClickBtn = function(name){
setActive(name);
  }
  console.log(active)
  const btns = [{ name: "all" }, { name: "mentions" }, { name: "   new post" }];
  return (
    <div className="px-3 ">
      <div className="flex items-center gap-x-3">
        <button onClick={handleClick}>
          <img src="/assets/arrow-left.svg" alt="img" />
        </button>
        <h3 className="mb-0 font-semibold">notification</h3>
      </div>

      <ul className="flex gap-x-4 mt-4">
        {btns.map((btn) => (
          <li key={btn.name}>
            <button
              onClick={() => handleClickBtn(btn.name)}
              className={`capitalize ${
                active === btn.name
                  ? " border-secondary600 text-secondary600"
                  : "border-stone-700"
              } bg-transparent border  rounded-full px-4 py-[0.1rem]`}
            >
              {btn.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

        // <button className="capitalize border border-stone-700 rounded-full px-3 py-[0.1rem]">
        //   all
        // </button>
        // <button className="capitalize border border-stone-700 rounded-full px-3 py-[0.1rem]">
        //   mentions
        // </button>
        // <button className="capitalize border border-stone-700 rounded-full px-3 py-[0.1rem]">
        //   new post
        // </button>