/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function SugChangePassword() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();
  const handleClick = function () {
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const validateConfirmPassword = (value) =>
    value === getValues("password") || "Passwords do not match";

  const onSubmit = function (data) {
    console.log(data);
  };
  return (
    <section>
      <article className=" min-h-screen">
        <div className="flex gap-x-2 items-center mb-5">
          <button onClick={handleClick} className="bg-transparent">
            <img src="\assets\arrow-left.svg" alt="icon" />
          </button>
          <h3 className="mb-0 font-semibold capitalize">change password</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-5">
            <PasswordField
              open={open}
              label="enter old password"
              ToggleOpen={() => setOpen(!open)}
              placeholder="password"
              register={register}
            />
            <div>
              <PasswordField1
                open1={open1}
                label="create new password"
                ToggleOpen={() => setOpen1(!open1)}
                placeholder="create password"
                register={register}
                errors={errors}
              />
              <p className="text-[0.8rem] text-stone-400">
                Password should contain at least 8 characters including;
                Capital, small letters, number and special characters
              </p>
            </div>
            <ConfirmPasswordField
              validateConfirmPassword={validateConfirmPassword}
              register={register}
              //   isPending={isPending}
              label="confirm password"
              errors={errors}
              open2={open2}
              ToggleOpen2={() => setOpen2(!open2)}
              placeholder="confirm password"
            />
          </div>
          <Button className="w-full mt-36">create password</Button>
        </form>
      </article>
    </section>
  );
}

export const PasswordField = ({
  label,
  //   isPending,
  placeholder,
  register,
 

  open,
  ToggleOpen,
}) => (
  <div className=" ">
    <label className="capitalize text-stone-500">{label}</label>
    <div className="relative">
      <input
        type={!open ? "password" : "text"}
        id="password"
        // disabled={isPending}
        className="w-full md:p-2 border border-stone-700 p-3 rounded-md"
        placeholder={placeholder}
        {...register("oldPassword")}
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
    </div>
  </div>
);

// ===========

export const PasswordField1 = ({
  label,
  placeholder,
  register,
  errors,
  open1,
  ToggleOpen,
}) => (
  <div className=" ">
    <label className="capitalize text-stone-500">{label}</label>
    <div className="relative">
      <input
        type={!open1 ? "password" : "text"}
        id="password"
        className="w-full md:p-2 border border-stone-700 p-3 rounded-md"
        placeholder={placeholder}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        })}
        autoComplete="current-password"
      />
      <span className="absolute right-3 top-4 cursor-pointer">
        {open1 ? (
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
    {errors.password && (
      <p className="text-red-500 mt-1">{errors.password.message}</p>
    )}
  </div>
);

export const ConfirmPasswordField = ({
  label,
  placeholder,
  register,
  errors,
  open2,
  ToggleOpen2,
  validateConfirmPassword,
}) => (
  <div className=" ">
    <label className="capitalize text-stone-500">{label}</label>
    <div className="relative">
      <input
        type={!open2 ? "password" : "text"}
        id="confirmPassword"
        className="w-full md:p-2 border border-stone-700 p-3 rounded-md"
        placeholder={placeholder}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: validateConfirmPassword,
        })}
        autoComplete="current-password"
      />
      <span className="absolute right-3 top-4 cursor-pointer">
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
    </div>
    {errors.confirmPassword && (
      <p className="text-red-500 mt-1">{errors.confirmPassword.message}</p>
    )}
  </div>
);

// Main Component
