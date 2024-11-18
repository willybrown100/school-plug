import React from "react";

import { Outlet } from "react-router-dom";

export default function SugProfile() {
  return (
    <main className="w-[95vw] m-auto">
      <Outlet />
    </main>
  );
}
