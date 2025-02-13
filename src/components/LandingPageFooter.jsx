import React from 'react'
import {  useNavigate } from 'react-router-dom';

export default function LandingPageFooter() {
  const navigate = useNavigate()
  const handleClick = function(){
navigate("/signup")
  }
  return (
    <footer className="py-3 px-4 bg-stone-50 divide-y border-t-[0.5rem] border-t-secondary700 divide-stone-500">
      <div className="flex flex-col mb-6 gap-y-2 ">
        <div className="flex gap-x-2 my-10  items-center md:justify-center md:pt-4">
          <img src="/images/smLogo.png" alt="img" />
          <h4 className="text-secondary700  text-xl mb-0 capitalize font-semibold">
            schoolPlug
          </h4>
        </div>
        <h2 className=" md:text-center text-secondary700  font-semibold">
          Let’s get started on something great
        </h2>
        <p className="md:mx-auto md:text-lg">
          Join your fellow students and enjoy the seamless service they do.
        </p>
        <button
          onClick={handleClick}
          className="bg-secondary600 hover:bg-secondary500 duration-300 transition-all mb-14 font-medium md:w-[400px] mx-auto w-full p-2 py-3 rounded-md text-center text-white"
        >
          Sign up
        </button>
      </div>
      <div className="md:flex justify-between items-center">
        <div className="flex gap-x-3 pt-5 text-[1rem] items-center">
          <p className="capitalize text-stone-500">terms</p>
          <p className="capitalize text-stone-500">privacy</p>
          <p className="capitalize text-stone-500">cookies</p>
        </div>
        <p className="text-stone-500 capitalize mb-0 text-[1rem]">
          © schoolplug, all right reserved
        </p>
      </div>
    </footer>
  );
}
