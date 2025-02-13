import React, { useState } from 'react'

import SideBar from "../components/SideBar"
import { Link, useNavigate } from 'react-router-dom'
import LandingPageFooter from "../components/LandingPageFooter"


export default function LandingPage() {
  const navigate =useNavigate()
  const [open,setOpen]=useState()
  const handleClick = function(){
setOpen((prev)=>!prev)
  }
  const handleClick2 = () => navigate("/signup");
  return (
    <article className=" ">
      <header className="mb-8  landingpage-header ">
        <div className="p-3 ">
          <nav className="px-6 py-2 bg-[#FAFAFA80] rounded-full md:w-[600px] md:mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex gap-x-2 items-center">
                <img
                  src="/images/smLogo.png"
                  alt="img"
                  className="w-[2.1rem]"
                />
                <h4 className="text-secondary600 mb-0 text-xl font-semibold ">
                  schoolPlug
                </h4>
              </div>
              <button
                className="bg-transparent md:hidden"
                onClick={handleClick}
              >
                <img src="\assets\menu.svg" alt="img" className=" w-6" />
              </button>
              {open && <SideBar />}
              <div className="md:flex gap-x-4 items-center hidden ">
                <Link
                  to="/signin"
                  className="text-black hover:text-black capitalize"
                >
                  login
                </Link>
                <Link
                  to="/signup"
                  className="capitalize hover:bg-secondary500 duration-300 transition-all hover:text-stone-100 bg-secondary600 py-1 tracking-wide px-4 rounded-md text-white"
                >
                  sign up
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="lg:flex lg:justify-between gap-x-2 items-center p-6 ">
          <div className="mt-4 max-lg:flex max-lg:flex-col  max-lg:justify-center items-center">
            <div className='pb-7'>

            <p className="bg-[#FAFAFA80] md:mb-10 px-2 py-1 text-secondary700 font-medium inline  border rounded-full border-stone-50">
              Within school activities
            </p>
            </div>
            <div>
              <h1 className="max-lg:text-center font-semibold text-[#2B70DB] font- md:hidden">
                Campus
              </h1>
              <h1 className="max-lg:text-center text-[#2B70DB] font-semibold md:block hidden">
                Campus activities
              </h1>
              <h1 className="text-[#2B70DB] max-lg:text-center font-semibold md:hidden">
                activities much
              </h1>
              <h1 className="text-[#2B70DB] max-lg:text-center font-semibold hidden md:block">
                much easier
              </h1>
              <h1 className="text-[#2B70DB] max-lg:text-center font-semibold md:hidden">
                easier
              </h1>
            </div>
            <p className="max-lg:text-center  px-3">
              Schoolplug is a platfrom for student to interact with each other
              within their school, make their SUG bill, Faculty and Department
              bills super fast and easy. You can also view school events.
            </p>
            <Link
              to="/signup"
              className="bg-secondary600  hover:bg-secondary500 duration-300 transition-all hover:text-white flex gap-x-2 justify-center items-center w-[250px] p-3 font-medium rounded-md text-center text-white"
              style={{ animation: "bounce 3s linear infinite" }}
            >
              Get started
              <img
                src="\assets\arrowRightwhite.svg"
                alt="arrow"
                className="md:block hidden bg-[#FAFAFA80] p-1 rounded-full"
              />
            </Link>
          </div>

          <div className="mt-3 relative ">
            <img
              src="\images\landingpageeimgsmall.png"
              alt="img"
              className=" absolute md:top-[-4.5rem]  lg:top-[4.5rem]  md:left-3 lg:left-[-2rem] md:h-full z-20"
            />
            <img
              src="\images\landinpageimg.png"
              alt="img"
              className=" w-full md:hidden z-40"
            />
            <img
              src="\images\landingpageimgMd.png"
              alt="img"
              className="hidden md:block m-auto z-40"
            />
          </div>
        </div>
      </header>
      <section className="p-6  md:grid flex md:w-[650px] lg:w-[1200px] m-auto flex-col gap-y-6 md:grid-cols-2 lg:grid-cols-4  md:gap-x-4 md:gap-y-10">
        <div className="bg-[#E6E4FF] py-8 rounded-md  bg-custom-gradient">
          <img src="\images\enjoycampus.png" alt="img" className="m-auto " />
          <div>
            <h4 className="text-center mt-4 font-semibold capitalize">
              Enjoy campus gist
            </h4>
            <p className="text-center text-stone-600">
              What is campus without fun?
            </p>
          </div>
        </div>
        <div className="bg-[#E6E4FF] py-8 rounded-md  bg-custom-gradient">
          <img src="\assets\image1.svg" alt="img" className="m-auto " />
        </div>
        <div className="bg-[#E6E4FF] py-8 rounded-md  bg-custom-gradient">
          <img src="\assets\image2.svg" alt="img" className="m-auto " />
        </div>
        <div className="bg-[#E6E4FF] py-8 rounded-md  bg-custom-gradient">
          <img src="\assets\image3.svg" alt="img" className="m-auto " />
        </div>
      </section>
      <img
        src="\assets\div.divider.svg"
        alt="img"
        className="w-full px-3 py-4  md:hidden"
      />
      <img
        src="\images\div.divider 2.png"
        alt="img"
        className="w-full md:px-14 py-6  md:block hidden"
      />
      <section className="p-3">
        <div className="bg-[#F3F0FF] bg p-3 rounded-lg md:w-[600px] m-auto">
          <img src="\images\babi.png" alt="img" className="m-auto" />
          <h2 className="text-secondary700 font-medium text-center">
            You’ve come this far because you were directed
          </h2>
          <p className="text-[0.95rem] text-center mx-auto text-stone-700">
            You came this far because you were direccted to sign up. Oya no dey
            waste more time, just hit this button to sign up sharperly
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleClick2}
              className="bg-secondary600 px-20 text-center hover:bg-secondary500 duration-300 transition-all text-white rounded-md p-2 font-semibold"
            >
              Get started now
            </button>
          </div>
        </div>
      </section>
      <img
        src="\assets\div.divider.svg"
        alt="img"
        className="w-full px-3 pb-32 py-4 md:hidden"
      />
      <img
        src="\images\div.divider 2.png"
        alt="img"
        className="w-full md:px-14 pt-6 pb-28  md:block hidden"
      />

      <LandingPageFooter />
    </article>
  );
}




