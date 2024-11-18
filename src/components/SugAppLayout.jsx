import React from "react";
import { Outlet } from "react-router-dom";
import SugNavbar from "./SugNavbar";

import SugFooter from "../features/sug/SugFooter";

export default function SugAppLayout() {
  return (
    <div className="  ">
      <SugNavbar />
      <main className="bg-white py-4 min-h-screen">
        <Outlet />
      </main>
      <SugFooter />
    </div>
  );
}
