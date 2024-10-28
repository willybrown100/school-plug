import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import BlueLoader from '../components/BlueLoader'

export default function LandingPage() {
  return (
    <div className="grid min-h-[100vh] place-items-center text-black">
      <div className="flex flex-col items-center gap-4">
        <Link to="/"></Link>
        <Link to="/signup"> signup</Link>
        <Link to="/signin">signin</Link>
        <Link to="/forgotpassword">forgotpassword</Link>
        <Link to="/sugsignup">sugsignup</Link>
        <Link to="/profilePic">userdummyImage</Link>
        <Link to="/sughome">sugdashboard</Link>
        {/* <Loader/> */}
        <Link to="/home/homePage">internal page</Link>
      </div>
    </div>
  );
}
