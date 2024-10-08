import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

export default function LandingPage() {
  return (
    <div className='grid min-h-[100vh] place-items-center text-black'>
        <div className='flex items-center gap-4'>

        <Link to="/"></Link>
        <Link to="/signup"> signup</Link>
        <Link to="/signin">signin</Link>
        <Link to="/forgotpassword">forgotpassword</Link>
        <Link to="/profilePic">userdummyImage</Link>

        <Link to="/home/homePage">internal page</Link>
        </div>
        
    </div>
  )
}
