import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className="fixed top-20 right-10 shadow-md md:hidden bg-white p-3 rounded-md">
      <div className="flex flex-col gap-y-2">
        <Link
          to="/signup"
          className="bg-secondary600 hover:bg-secondary500 transition-all duration-300 hover:text-white text-center px-5 py-1 capitalize tracking-wide text-white rounded-md"
        >
          sign up
        </Link>
        <Link to="/signin" className="text-center hover:text-black text-black capitalize">
          login
        </Link>
      </div>
    </div>
  );
}
