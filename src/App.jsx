import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./auth/SignIn";
import ForgotPassword from "./auth/ForgotPassword";
import SignUp from "./auth/signup/SignUp";
import Logo from "./components/Logo";
import Loader from "./components/Loader";

import UserProfile from "./auth/UserProfile";
;
// import { DateProvider } from "./DateContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
export default function App() {
  return (
    // <DateProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Logo />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="loader" element={<Loader />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="Profilepic" element={< UserProfile />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    // </DateProvider>
  );
}
