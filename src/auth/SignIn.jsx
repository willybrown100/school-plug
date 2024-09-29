import React, { useState } from 'react'
import { HiOutlineEyeSlash } from 'react-icons/hi2';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function SignIn() {
      const [toggle, setToggle] = useState(false);
      const [open, setOpen] = useState(false);

      const ToggleOpen = () => setOpen(!open);
        const handleToggle = () => setToggle(!toggle);
  
  return (
    <main className="signBg min-h-[100vh] grid place-items-center ">
      <article className="md:bg-white md:px-[6rem] w-[95w] lg:px-[8rem] py-6 rounded-[1.2rem] flex flex-col gap-y-6">
<div className='flex justify-center'>
  <img src='/images/shool-pluglogo.png' alt='img'/>
</div>

        <h3 className='capitalize text-center font-semibold'>sign in to continue</h3>
        <form className="flex flex-col  rounded-md p-3 md:w-[500px]">
          <input
            type="email"
            placeholder="enter email or phone number"
            className="border p-3 md:p-2 rounded-md bg-transparent w-full"
          />
          <PasswordField
            open={open}
            ToggleOpen={ToggleOpen}
            placeholder="enter your password"
          />
          <Link
            to="/forgotpassword"
            className="text-stone-400 capitalize text-right "
          >
            forgot password
          </Link>
          <div className="md:grid mt-20 md:mt-6 gap-x-5 flex flex-col gap-y-2  md:grid-cols-2">
            <button className="border flex justify-center gap-x-6 border-secondary600 items-center  rounded-md text-secondary600 capitalize bg-transparent">
              {" "}
              <span>sign in with</span>
              <span>
                <img src="/images/google-icon.png" alt="img" />
              </span>
            </button>
            <button className="bg-secondary500 p-2 rounded-md font-semibold  text-white capitalize">
            
              continue to signin
            </button>
          </div>
        </form>
        <div>
        <div className="flex gap-x-6">
          <div className='h-6 mt-2'>
          <img src="/images/Rectangle 1.png" alt="img" />
          </div>
          <h5 className='mb-0 font-semibold'>or</h5>
          <div className='h-6 mt-2'>
          <img src="/images/Rectangle 2.png" alt="img" />
          </div>
        </div>
        <Link to="/signup" className='text-secondary500 capitalize  font-semibold flex justify-center'>sign up instead</Link>
        </div>
      </article>
    </main>
  );
}
const PasswordField = ({
  label,
  placeholder,
  register,
  error,
  errorMessage,
  open,
  ToggleOpen,
}) => (
  <div className="Input-Data mt-[1rem]">
    <label className="text-[12px]">{label}</label>
    <div className="relative">
      <input
        type={!open ? "password" : "text"}
        className="w-full md:p-2 border bg-white p-3 rounded-md"
        placeholder={placeholder}
        {...register}
        autoComplete="current-password"
      />
      <span className="absolute right-3 top-2 cursor-pointer">
        {open ? (
          <IoIosEye
            className="cursor-pointer text-stone-500 w-[2rem] h-[2rem] pb-[.8rem]"
            onClick={ToggleOpen}
          />
        ) : (
          <HiOutlineEyeSlash
            className="cursor-pointer w-[2rem] text-stone-500 h-[2rem] pb-[.8rem]"
            onClick={ToggleOpen}
          />
        )}
      </span>
      {error && <span className="text-white">{errorMessage}</span>}
    </div>
  </div>
);