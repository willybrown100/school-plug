import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { HiOutlineEyeSlash } from 'react-icons/hi2';
import { IoIosEye } from 'react-icons/io';
import { useMutation } from '@tanstack/react-query';
import { forgetPassword, newPassword, verifyPasswordCode } from '../services/contactApi';
import toast from 'react-hot-toast';





const ForgetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCode, setPasswordCode] = useState("");
  const initialStep = searchParams.get("step") || 1;
  const [step, setStep] = useState(Number(initialStep));

  // const userId = localStorage.getItem("userId");
  let userId = localStorage.getItem("userId");

  // Check if it contains extra quotes and clean it up
  userId = userId.replace(/["]+/g, ""); 

  console.log(step, password,confirmPassword); 

  const userEmail = email && localStorage.getItem("email");

  console.log(userEmail, userId);
  const ToggleOpen = () => setOpen(!open);
  const { mutate, isPending } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {
               searchParams.set("step", 2);  
               setSearchParams(searchParams); 
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: passCode, isPending: loading } = useMutation({
    mutationFn: verifyPasswordCode,
    onSuccess: () => {
         searchParams.set("step", 3); 
         setSearchParams(searchParams);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: newPass, isPending: isLoading } = useMutation({
    mutationFn: newPassword,
    onSuccess: () => {
      toast.success("password succesfully reset");
      navigate("/signin")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    mutate({ email });
    localStorage.setItem("email", email);
  };
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    passCode({ code: passwordCode });
  };
  const handleNewPassword = async (e) => {
    e.preventDefault();
    newPass({ userId ,password,confirmPassword});
  };
  const handleResend = async (e) => {
    e.preventDefault();
    mutate({ email,resend:true });
  };

   useEffect(() => {
     // When the component mounts, check if the step is in the URL
     // If so, set the step state accordingly
     const currentStep = searchParams.get("step");
     if (currentStep) {
       setStep(Number(currentStep)); // Ensure step is set to the correct value on reload
     }
   }, [searchParams]);

  return (
    <article className="flex overflow-x-hidden w-full min-h-[100vh] m-auto forgotbg justify-center items-center">
      {step === 1 && (
        <div className="md:w-[700px] flex flex-col  gap-y-9  p-6  md:bg-white rounded-lg md:shadow-md slide-in">
          <div className="flex justify-center">
            <Logo />
          </div>

          <h2 className="text-2xl mb-4 text-center capitalize font-semibold font-fontHeading">
            Enter Email or phone no.
          </h2>
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col gap-y-3 w-full m-auto md:w-[500px]"
          >
            <input
              type="email"
              placeholder="enter Email or phone no"
              className="w-full px-4 md:py-2 py-3 border mt-12 placeholder:capitalize bg-transparent border-stone-400 md:mt-0 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="flex mt-36 md:mt-0 md:flex-row gap-y-2 flex-col items-center gap-x-3">
              <button
                type="submit"
                className=" bg-blue-500 hidden md:block w-full capitalize font-semibold text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Submitting..." : "continue"}
              </button>
              <img
                src="/images/indicator1.png"
                alt="img"
                className="h-[2.2rem]"
              />
              <button
                type="submit"
                className=" bg-blue-500 md:hidden w-full capitalize font-semibold text-white px-4 py-2 rounded"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "continue"}
              </button>
            </div>
          </form>
          <div className="md:flex mt-[5rem] hidden  flex-col justify-center">
            <p className="mr-auto ml-auto text-stone-600 mb-0">
              following our <Link>Terms</Link> and Condition <Link>policy</Link>
              enter the email
            </p>
            <p className="mr-auto text-stone-600 ml-auto  mb-0">
              or phone number used in registration
            </p>
          </div>
          <p className="capitalize  tracking-wide md:hidden">
            following our <Link> Terms </Link> and Condition{" "}
            <Link> policy </Link>
            enter the email or phone number used in registration
          </p>
        </div>
      )}
      {step === 2 && (
        <article className=" md:w-[700px] max-sm:grid max-sm:grid-cols-1 gap-y-4  max-sm:grid-rows-[auto,auto,1fr]  max-sm:h-[100vh] p-6 md:bg-white md:pb-40 rounded-[2.5rem]  md:shadow-md slide-in">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <div>
            <h2 className="text-2xl text-center mb-4">
              verify email or phone no.
            </h2>
            <p className="mb-4 text-center text-stone-600 font-semibold mx-auto">
              A 4-digit code is sent to {userEmail} <br /> Enter code to verify
              its you.
            </p>
          </div>
          <form
            onSubmit={handleCodeSubmit}
            className="md:flex flex-col w-full mt-4 md:mt-0 grid max-sm:grid-rows-[1fr,auto] max-sm:h-[22rem] gap-y-3 m-auto md:w-[500px]"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="enter code"
                value={passwordCode}
                onChange={(e) => setPasswordCode(e.target.value)}
                className="w-full px-4 md:py-2 py-3 bg-transparent placeholder:text-stone-500 capitalize  border-stone-500 border rounded "
              />
              <div className="flex items-center justify-end gap-x-2">
                <span className="text-stone-500">Didn’t receive code.</span>
                <button
                  onClick={handleResend}
                  disabled={isPending}
                  className={` bg-transparent ${
                    isPending ? "text-stone-500" : "text-secondary500"
                  }`}
                >
                  Resend
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 md:flex-row gap-x-3 items-center">
              <button
                disabled={loading}
                className=" bg-blue-500 hidden md:block w-full capitalize font-semibold text-white px-4 py-2 rounded"
              >
                {loading ? "wait..." : "verify now"}
              </button>
              <img
                src="/images/indicator2.png"
                alt="img"
                className="h-[2.2rem]"
              />
              <button
                disabled={loading}
                className=" bg-blue-500 w-full md:hidden capitalize font-semibold text-white px-4 py-2 rounded"
              >
                {loading ? "wait..." : "verify now"}
              </button>
            </div>
          </form>
        </article>
      )}
      {step === 3 && (
        <div className="md:w-[600px] p-6 md:px-12 md:bg-white rounded-[2rem] md:shadow-md slide-in">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div>
            <h2 className="text-2xl mb-4 text-center">create a new Password</h2>
            <p className="text-center mr-auto ml-auto">
              Create a strong password that will be easy to recall. Tips; write
              down and save password in notepad
            </p>
          </div>
          <form onSubmit={handleNewPassword} className="flex flex-col gap-y-6">
            {/* <input
              type="password"
              placeholder="create Password"
              className="w-full px-4 placeholder:capitalize bg-transparent py-2 border rounded mb-4"
              required
            /> */}
            <PasswordField
              password={password}
              setPassword={setPassword}
              open={open}
              ToggleOpen={ToggleOpen}
              placeholder="create password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2  placeholder:capitalize bg-transparent border rounded mb-4"
              required
            />
            <div className="flex mt-4 gap-x-4 items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="  bg-secondary500 w-full capitlize text-white px-4 py-2 rounded"
              >
                {isLoading ? "please wait..." : "create password"}
              </button>
              <img
                src="/images/indicator3.png"
                alt="img"
                className="h-[2.5rem]"
              />
            </div>
          </form>
        </div>
      )}
    </article>
  );
};

export default ForgetPassword;




export const PasswordField = ({
  label,
  placeholder,
  
  error,
  errorMessage,
  open,
  ToggleOpen,
password,
setPassword
}) => (
  <div className="Input-Data ">
    {/* <label className="text-[12px]">{label}</label> */}
    <div className="relative">
      <input
        type={!open ? "password" : "text"}
        id="password"
        className="w-full md:p-2 border border-stone-700 p-3 rounded-md"
        placeholder={placeholder}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
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