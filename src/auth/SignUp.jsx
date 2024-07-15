import React, { useState } from 'react'
import Logo from '../components/Logo';
import { IoIosEye } from 'react-icons/io';
import { HiOutlineEyeSlash } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function SignUp() {
    const {handleSubmit,register}=useForm()
       const [open, setOpen] = useState(false);
       const [open2, setOpen2] = useState(false);
       const ToggleOpen = () => setOpen(!open);
       const ToggleOpen2 = () => setOpen2(!open2);
       const onSubmit =function(data){
        console.log(data)
       }
  return (
    <main className="signupBg grid place-items-center p-4">
      <article className="md:bg-white md:px-[6rem] w-[95w] lg:px-[8rem] py-5 rounded-[1.2rem] flex flex-col gap-y-6">
        <div className="flex justify-center">
          <img src="/images/shool-pluglogo.png" alt="img" />
        </div>

        <h3 className="capitalize font-fontHeading mb-0 text-center font-semibold">
          Nice to have you, Sign up
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4 rounded-md p-3 md:w-[500px]">
          <input
            type="text"
            id="text"
            placeholder="full name (as used in your student iD)"
            className="border p-3 md:p-2 rounded-md w-full placeholder:capitalize"
            {...register("text")}
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="border p-3 md:p-2 rounded-md w-full placeholder:capitalize"
            {...register("email")}
          />
          <input
            type="number"
            id="number"
            placeholder="phone number"
            className="border p-3 md:p-2 rounded-md w-full placeholder:capitalize"
            {...register("number")}
          />
          <PasswordField
            open={open}
            ToggleOpen={ToggleOpen}
            placeholder="create password"
            register={register}
            />
          <ConfirmPasswordField
            register={register}
            open2={open2}
            ToggleOpen2={ToggleOpen2}
            placeholder="confirm password"
          />
          <div className="flex items-center gap-1 capitalize">
            <input type="radio" id="terms" {...register("terms")} />
            <div>
              agree to our <Link>terms</Link> and <Link>policies</Link>{" "}
            </div>
          </div>
          <div className="md:grid mt-20 md:mt-6 gap-x-5 flex flex-col gap-y-2  md:grid-cols-2">
            <button className="border flex p-1 justify-center gap-x-6 border-secondary600 items-center  rounded-md text-secondary600 capitalize bg-transparent">
              {" "}
              <span>sign in with</span>
              <span>
                <img src="/images/google-icon.png" alt="img" />
              </span>
            </button>
            <button className="bg-secondary500 p-3 rounded-md font-semibold  text-white capitalize">
              {" "}
              sign up
            </button>
          </div>
        </form>
        <div>
          <div className="flex gap-x-6">
            <div className="h-6 mt-2">
              <img src="/images/Rectangle 1.png" alt="img" />
            </div>
            <h5 className="mb-0 font-semibold">or</h5>
            <div className="h-6 mt-2">
              <img src="/images/Rectangle 2.png" alt="img" />
            </div>
          </div>
          <Link
            to="/signin"
            className="text-secondary500 capitalize font-semibold flex justify-center"
          >
            sign in instead
          </Link>
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
    
  <div className="Input-Data ">
    <label className="text-[12px]">{label}</label>
    <div className="relative">
      <input
        type={!open ? "password" : "text"}
        id='password'
        className="w-full md:p-2 border p-3 rounded-md"
        placeholder={placeholder}
        {...register("password")}
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
const ConfirmPasswordField = ({
  label,
  placeholder,
  register,
  error,
  errorMessage,
  open2,
  ToggleOpen2,
}) => (
  <div className="Input-Data ">
    <label className="text-[12px]">{label}</label>
    <div className="relative">
      <input
        type={!open2 ? "password" : "text"}
        id="confirmPassword"
        className="w-full md:p-2 border p-3 rounded-md"
        placeholder={placeholder}
        {...register("confirmPassword")}
        autoComplete="current-password"
      />
      <span className="absolute right-3 top-2 cursor-pointer">
        {open2 ? (
          <IoIosEye
            className="cursor-pointer text-stone-500 w-[2rem] h-[2rem] pb-[.8rem]"
            onClick={ToggleOpen2}
          />
        ) : (
          <HiOutlineEyeSlash
            className="cursor-pointer w-[2rem] text-stone-500 h-[2rem] pb-[.8rem]"
            onClick={ToggleOpen2}
          />
        )}
      </span>
      {error && <span className="text-white">{errorMessage}</span>}
    </div>
  </div>
);