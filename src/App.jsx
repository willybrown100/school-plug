import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SignIn from "./auth/SignIn";
import ForgotPassword from "./auth/ForgotPassword";
import SignUp from "./auth/signup/SignUp";
import Logo from "./components/Logo";
import Loader from "./components/Loader";

import UserProfile from "./auth/UserProfile";
import AppLayout from "./components/AppLayout";
import HomePage from "./features/HomePage";
import { DateProvider } from "./DateContext";
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
    <DateProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Logo />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="loader" element={<Loader />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="profilepic" element={<UserProfile />} />
            <Route path="applayout" element={<AppLayout />}>
              <Route index element={<Navigate to="home" />} />
              <Route path="home" index element={<HomePage  />} />
              <Route path="events" index element={<HomePage  />} />
              <Route path="material" index element={<HomePage  />} />
              <Route path="trends" index element={<HomePage  />} />
              <Route path="bills" index element={<HomePage  />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DateProvider>
  );
}
