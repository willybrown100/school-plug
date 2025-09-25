/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import MiniLoader from "../../ui/MiniLoader";
import toast from "react-hot-toast";
import { sugSignIn } from "../../services/sugApis";

export default function SugSignin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,

    register,

    // reset,
  } = useForm();
  const { mutate, isLoading } = useMutation({
    mutationFn: sugSignIn,
    onSuccess: () => {
      navigate("/sughome");
      queryClient.invalidateQueries("sug");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit = function (data) {
    console.log(data);
    mutate(data);
  };
  return (
    <div className="sugsignin">
      <div className="p-3 py-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" min-h-screen grid grid-rows-[auto,1fr,auto]"
        >
          <div className="flex flex-col gap-y-10 items-center">
            <Link to="/" className="flex justify-center">
              <img src="/images/schoolplug.svg" alt="img" />
            </Link>
            <h3 className="capitalize font-heading font-medium">
              sign in to continue
            </h3>
          </div>
          <div>
            <div className="bg-white flex shadow-md p-3 rounded-md flex-col gap-y-4">
              <input
                type="email"
                placeholder="email"
                className="p-2 border w-full border-stone-400 rounded-md"
                {...register("email")}
                required
                disabled={isLoading}
              />
              <PasswordField
                open={open}
                ToggleOpen={() => setOpen(!open)}
                register={register}
                placeholder="password"
                isPending={isLoading}
              />
              <Link
                to="/sugforgotpassword"
                className="text-right text-stone-400 mb-0"
              >
                Forget password?
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <Button className="capitalize  w-full ">
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <MiniLoader />
                </div>
              ) : (
                "sign in"
              )}
            </Button>
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
                to="/sugsignup"
                className="text-secondary500 capitalize font-semibold flex justify-center"
              >
                sign up instead
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export const PasswordField = ({
  isPending,
  placeholder,
  register,

  open,
  ToggleOpen,
}) => (
  <div className="Input-Data ">
    <div className="relative">
      <input
        type={!open ? "password" : "text"}
        id="password"
        disabled={isPending}
        className="w-full md:p-2 border outline-none border-stone-400 p-2 rounded-md"
        placeholder={placeholder}
        {...register("password")}
        autoComplete="current-password"
      />
      <span className="absolute right-3 top-3 cursor-pointer">
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
    </div>
  </div>
);
