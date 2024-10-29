import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

export default function SugNavlinks({ item }) {
  const { pathname } = useLocation();
  const { name, icon, path } = item;
  const pathn = pathname.split("/").at(2);
  const pathna = pathname.split("/").at(3);
  // console.log(pathn, icon);

  return (
    <li className="">
      <NavLink to={path} className="flex items-center flex-col gap-y-2">
        <span className="">{icon}</span>
        <div
          className={`text-black capitalize font-heading font-semibold ${
            pathname === path ? "text-secondary600" : ""
          }`}
        >
          {name}
        </div>
      </NavLink>{" "}
    </li>
  );
}