import React, { useState } from "react";
import SugProfileSetting from "./SugProfileSetting";
import { Outlet, useNavigate } from "react-router-dom";

export default function SugProfile() {
  return (
    <main className="w-[95vw] m-auto">
      <Outlet />
    </main>
  );
}
