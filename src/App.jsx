import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { lazy, Suspense,  } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SignIn from "./auth/signup/SignIn";
import ForgotPassword from "../src/auth/signup/ForgotPassword";
import SignUp from "./auth/signup/SignUp";

import Loader from "./components/Loader";

import UserProfile from "./auth/signup/UserProfile";
import AppLayout from "./components/AppLayout";
// import HomePage from "./features/HomePage";
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
import UsersFeed from "./components/UsersFeed";
import SugSignup from "./auth/sugSignupAndSignin/SugSignup";
import SugSignin from "./auth/sugSignupAndSignin/SugSignin";
import SugForgotPassword from "./auth/sugSignupAndSignin/SugForgotPassword";
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
import SugCreatePost from "./features/sug/SugCreatePost";
import SugPaybills from "./features/sug/SugPaybills";

import SugNotification from "./features/sug/SugNotification";

import SugTrends from "./features/sug/SugTrends";
import Notification from "./features/Notification";
import PageNotFound from "./components/PageNotFound";
import PaymentReceipt from "./features/PaymentReceipt";
import SugViewBills from "./features/sug/SugViewBills";
import DepartmentalSignin from "./auth/departmentalSignupAndSignin/DepartmentalSignin";
import DepartmentalSignUp from "./auth/departmentalSignupAndSignin/DepartmentalSignUp";
import DepartmentalApplayout from "./components/DepartmentalApplayout";
import DeptHome from "./features/departmental/DeptHome";
import DeptEvent from "./features/departmental/DeptEvent";
import SugEvents from "./features/sug/SugEvents";
import SugEvent from "./features/sug/SugEvent";
import SugEventDetails from "./features/sug/SugEventDetails";
import SudentEventDetails from "./features/SudentEventDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLoader from "./components/PageLoader";
import EventPaymentReceipt from "./features/EventPaymentReceipt";



const HomePage = lazy(() => import("./features/HomePage"));

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
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="signin" element={<SignIn />} />
                <Route
                  path="departmentalsignin"
                  element={<DepartmentalSignin />}
                />
                <Route
                  path="departmentalsignup"
                  element={<DepartmentalSignUp />}
                />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="sugsignup" element={<SugSignup />} />
                <Route
                  path="sugforgotpassword"
                  element={<SugForgotPassword />}
                />
                <Route path="sugsignin" element={<SugSignin />} />
                <Route path="post" element={<CreatePost />} />
                <Route path="sugevent" element={<SugEvents />} />
                <Route path="sugpost" element={<SugCreatePost />} />
                <Route path="loader" element={<Loader />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
                <Route path="profilepic" element={<UserProfile />} />
                <Route path="sughome" element={<SugAppLayout />}>
                  <Route index element={<Navigate to="sugfeed" />} />
                  <Route path="sugfeed" index element={<SugFeed />} />
                  <Route path="sugpaybills" element={<SugPaybills />} />
                  <Route path="sugviewbills" element={<SugViewBills />} />
                  <Route path="sugnotification" element={<SugNotification />} />
                  <Route path="sugtrends" element={<SugTrends />} />
                  <Route path="sugevents" element={<SugEvent />} />
                  <Route path="sugevents/:id" element={<SugEventDetails />} />
                  <Route path="sugprofile" element={<SugProfile />}>
                    <Route index element={<Navigate to="sugprofilez" />} />
                    <Route path="sugprofilez" index element={<SugProfilez />} />
                    <Route path="sugeditprofile" element={<EditSugProfile />} />
                    <Route path="adminassist" element={<AdminAssist />} />
                    <Route path="acctsetting" element={<SugAccountSetting />} />
                    <Route
                      path="sugfaculties"
                      element={<SugSchoolFaculties />}
                    />
                    <Route
                      path="sugchangepassword"
                      element={<SugChangePassword />}
                    />
                    <Route
                      path="importedregnum"
                      element={<SugImportedRegNums />}
                    />
                  </Route>
                </Route>

                <Route
                  path="home"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route element={<Navigate to="home/homePage" />} />
                  <Route path="homePage" element={<HomePage />}>
                    <Route index element={<Navigate to="feed" />} />
                    <Route path="feed" element={<UsersFeed />} />
                  </Route>
                  <Route path="events" element={<Events />} />
                  <Route path="events/:id" element={<SudentEventDetails />} />

                  <Route path="material" element={<Materials />} />
                  <Route path="notifications" element={<Notification />} />
                  <Route path="trends" element={<Trends />} />
                  <Route path="bills" element={<PayBills />} />
                  <Route path="receipt" element={<PaymentReceipt />} />
                  <Route
                    path="eventreceipt"
                    element={<EventPaymentReceipt />}
                  />
                  <Route path="payment-form" element={<PaymentForm />} />
                  <Route path="card-form" element={<CardForm />} />
                </Route>

                <Route
                  path="departmentalhome"
                  element={<DepartmentalApplayout />}
                >
                  <Route index element={<Navigate to="depthome" />} />
                  <Route path="depthome" element={<DeptHome />} />
                  <Route path="deptevent" element={<DeptEvent />} />
                </Route>
              </Routes>
              <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                  success: { duration: 3000, icon: null },
                  error: { duration: 5000 },
                  style: {
                    fontSize: "13px",
                    maxWidth: "500px",
                    padding: "7px 15px",
                    backgroundColor: "#2161c3",
                    color: "white",
                    borderRadius: "1rem",
                  },
                }}
              />
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </DateProvider>
 
  );
}
