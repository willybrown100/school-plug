/* eslint-disable react/prop-types */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavLinks({ item }) {
  // const svgStyle = {
  //   stroke:pathn ===path?"text-secondary600":"black"
  // }
  const { pathname } = useLocation();
  const { name, icon, path } = item;

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
