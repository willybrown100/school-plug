import React from "react";
import { Outlet } from "react-router-dom";
import SugNavbar from "./SugNavbar";

import SugFooter from "../features/sug/SugFooter";

export default function SugAppLayout() {
  return (
    <div className="  ">
      <SugNavbar />
      <main className=" min-h-screen">
        <Outlet />
      </main>
      <SugFooter />
    </div>
  );
}
