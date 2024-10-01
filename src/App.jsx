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
import LandingPage from "./pages/LandingPage";
import Materials from "./features/Materials";
import Trends from "./features/Trends";
import Events from "./features/Events";
import PayBills from "./features/PayBills";
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
            <Route path="/" element={<LandingPage />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="loader" element={<Loader />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="profilepic" element={<UserProfile />} />
            <Route path="home" element={<AppLayout />}>
              <Route index element={<Navigate to="feed" />} />
              <Route path="feed" index element={<HomePage />} />
              <Route path="events" element={<Events />} />
              <Route path="material" element={<Materials />} />
              <Route path="trends" element={<Trends />} />
              <Route path="bills" element={<PayBills />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DateProvider>
  );
}
