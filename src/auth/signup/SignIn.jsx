/* eslint-disable react/prop-types */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { signIn, userSignInWithGoogle } from "../../services/contactApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import MiniLoader from "../../ui/MiniLoader";

export default function SignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,

    // setError,
    // reset,
  } = useForm();

  const [open, setOpen] = useState(false);

  const ToggleOpen = () => setOpen(!open);

  const { mutate, isLoading } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate("/home/homePage");
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("notification");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const { mutate: goodleSignin, isLoading: googleLoading } = useMutation({
    mutationFn: userSignInWithGoogle,
    onSuccess: () => {
      navigate("/home/homePage");
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("notification");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  const onSubmit = function (data, e) {
    e.preventDefault();
    mutate(data);
    console.log(data);
  };
  // const handleGoogle = function()
  return (
    <main className="signBg min-h-[100vh] grid place-items-center ">
      <article className="md:bg-white md:px-[6rem] w-[95w] lg:px-[8rem] py-6 rounded-[1.2rem] flex flex-col gap-y-6">
        <div className="flex justify-center">
          <img src="/images/shool-pluglogo.png" alt="img" />
        </div>

        <h3 className="capitalize text-center font-semibold">
          sign in to continue
        </h3>
        <form
          className="flex flex-col  rounded-md p-3 md:w-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="email"
            disabled={isLoading}
            placeholder="enter email or phone number"
            className="border p-3 md:p-2 rounded-md bg-transparent w-full bg-white"
            {...register("email", { required: "this field is required" })}
          />
          <PasswordField
            open={open}
            ToggleOpen={ToggleOpen}
            placeholder="enter your password"
            register={register}
            isLoading={isLoading}
          />
          <Link
            to="/forgotpassword"
            className="text-stone-400 capitalize text-right "
          >
            forgot password
          </Link>
          <div className="md:grid mt-20 md:mt-6 gap-x-5 flex flex-col gap-y-2  md:grid-cols-2">
            <button
              type="button"
              onClick={goodleSignin}
              disabled={googleLoading}
              className="border flex justify-center gap-x-6 border-secondary600 items-center  rounded-md text-secondary600 p-1 capitalize bg-transparent"
            >
              {" "}
              <span>sign in with</span>
              <span>
                <img src="/images/google-icon.png" alt="img" />
              </span>
            </button>
            <button
              disabled={isLoading}
              className="bg-secondary500 p-3 rounded-md font-semibold  text-white capitalize"
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <MiniLoader />{" "}
                </div>
              ) : (
                "  continue to sign in"
              )}
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
            to="/signup"
            className="text-secondary500 capitalize  font-semibold flex justify-center"
          >
            sign up instead
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
  isLoading,
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
        {...register("password")}
        disabled={isLoading}
        autoComplete="current-password"
      />
      <span className="absolute right-3 top-4 cursor-pointer">
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
