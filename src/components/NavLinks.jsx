import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'


export default function NavLinks({item}) {
  // const svgStyle = {
  //   stroke:pathn ===path?"text-secondary600":"black"
  // }
  const { pathname } = useLocation();
  const { name, icon, path } = item;
  const pathn = pathname.split("/").at(2);
  // console.log(pathn, icon);

  return (
    <li className="">
      <NavLink to={path} className="flex items-center flex-col gap-y-2">
        <span className="">{icon}</span>
        <span
          className={`text-black capitalize font-heading font-semibold ${
            pathn === path ? "text-secondary600" : ""
          }`}
        >
          {name}
        </span>
      </NavLink>{" "}
    </li>
  );
}
