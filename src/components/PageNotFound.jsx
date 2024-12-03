import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate= useNavigate()
    const handleClick = function(){
        navigate(-1)
    }
  return (
    <article className="min-h-screen max-lg:grid px-3 max-lg:place-items-center ">
      <div className="flex flex-col items-center lg:hidden">
        <img src="\images\404.png" alt="404" className="md:w-[17rem]" />
        <h4 className="text-secondary500 font-semibold">404 error</h4>
        <h2 className="font-semibold">Page not found</h2>
        <p className="text-stone-700 text-center">
          Sorry, the page you are looking for does not exist. Here are some
          helpful links:
        </p>
        <div className=" flex flex-col gap-y-2 items-center md:grid grid-cols-2 gap-x-2 w-full">
          <Link
            to="/"
            className="bg-secondary600 flex-1 p-2 text-center hover:text-slate-300 rounded-lg w-full text-white capitalize"
          >
            take me home
          </Link>
          <button
            onClick={handleClick}
            className="flex gap-x-2 items-center text-center justify-center p-2 rounded-lg w-full capitalize mt-2 border border-stone-300"
          >
            <img src="\assets\Icon (25).svg" />
            go back
          </button>
        </div>
      </div>


      <div className="hidden lg:flex justify-between items-center">
        <div className=" flex flex-col gap-y-2">
          <h4 className="text-secondary500 font-semibold">404 error</h4>
          <h2 className="font-semibold">Page not found</h2>
          <p className="text-stone-700 ">
            Sorry, the page you are looking for does not exist. Here are some
            helpful links:
          </p>
          <div className='flex items-center gap-x-2'>

          <Link
            to="/"
            className="bg-secondary600  p-2 text-center hover:text-slate-300 rounded-lg  text-white capitalize"
            >
            take me home
          </Link>
          <button
            onClick={handleClick}
            className="flex gap-x-2 items-center text-center justify-center p-2 rounded-lg  capitalize  border border-stone-300"
            >
            <img src="\assets\Icon (25).svg" />
            go back
          </button>
              </div>
        </div>     
          <img src="\images\404.png" alt="img" className=''/>
      </div>
    </article>
  );
}
