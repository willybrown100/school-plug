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

import PaymentForm from "./components/PaymentForm";
import CreatePost from "./features/CreatePost";
import CardForm from "./components/CardForm";
import PayBills from "./features/PayBills";
import { Toaster } from "react-hot-toast";
import BillInformation from "./components/BillInformation";
import UsersFeed from "./components/UsersFeed";
import SugSignup from "./auth/signup/SugSignup";
import SugSignin from "./auth/SugSignin";
import SugForgotPassword from "./auth/SugForgotPassword";
import SugAppLayout from "./components/SugAppLayout";
import SugFeed from "./features/sug/SugFeed";
import SugProfile from "./features/sug/SugProfile";
import EditSugProfile from "./components/EditSugProfile";
import SugProfilez from "./features/sug/SugProfilez";
import AdminAssist from "./features/sug/AdminAssist";
import SugAccountSetting from "./features/sug/SugAccountSetting";
import SugChangePassword from "./features/sug/SugChangePassword";
import SugImportedRegNums from "./features/sug/SugImportedRegNums";
import SugSchoolFaculties from "./features/sug/SugSchoolFaculties";

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
            <Route path="sugsignup" element={<SugSignup />} />
            <Route path="sugforgotpassword" element={<SugForgotPassword />} />
            <Route path="sugsignin" element={<SugSignin />} />
            <Route path="post" element={<CreatePost />} />
            <Route path="loader" element={<Loader />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="profilepic" element={<UserProfile />} />
            <Route path="sughome" element={<SugAppLayout />}>
              <Route index element={<Navigate to="sugfeed" />} />
              <Route path="sugfeed" index element={<SugFeed />} />
              <Route path="sugprofile" element={<SugProfile />}>
                <Route index element={<Navigate to="sugprofilez" />} />
                <Route path="sugprofilez" index element={<SugProfilez />} />
                <Route path="sugeditprofile" element={<EditSugProfile />} />
                <Route path="adminassist" element={<AdminAssist />} />
                <Route path="acctsetting" element={<SugAccountSetting />} />
                <Route path="sugfaculties" element={<SugSchoolFaculties />} />
                <Route
                  path="sugchangepassword"
                  element={<SugChangePassword />}
                />
                <Route path="importedregnum" element={<SugImportedRegNums />} />
              </Route>
            </Route>

            <Route path="home" element={<AppLayout />}>
              <Route element={<Navigate to="home/homePage" />} />
              <Route path="homePage" element={<HomePage />}>
                <Route index element={<Navigate to="feed" />} />
                <Route path="feed" element={<UsersFeed />} />
                <Route path="billz" element={<BillInformation />} />
              </Route>
              <Route path="events" element={<Events />} />
              <Route path="material" element={<Materials />} />
              <Route path="trends" element={<Trends />} />
              <Route path="bills" element={<PayBills />} />
              <Route path="payment-form" element={<PaymentForm />} />
              <Route path="card-form" element={<CardForm />} />
            </Route>
          </Routes>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "12px 20px",
                backgroundColour: "white",
                color: "",
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </DateProvider>
  );
}
