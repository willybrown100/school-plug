import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className="fixed top-20 right-10 shadow-md bg-white p-3 rounded-md">
      <div className="flex flex-col gap-y-2">
        <Link
          to="/signup"
          className="bg-secondary600 text-center px-5 py-1 capitalize tracking-wide text-white rounded-md"
        >
          sign up
        </Link>
        <Link to="/signin" className="text-center text-black capitalize">
          login
        </Link>
      </div>
    </div>
  );
}
