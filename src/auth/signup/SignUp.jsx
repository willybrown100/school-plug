/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react";


import { IoIosEye } from "react-icons/io";
import {
  HiChevronDown,
 
  HiOutlineCalendar,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import CustomDatePicker, { CustomDatePicker2 } from "./DatePicker";
import Button from "../../ui/Button";
import signUp, {
  EducationalSignUp,
  signInWithGoogle,
} from "../../services/contactApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MiniLoader from "../../ui/MiniLoader";
import { DateContext } from "../../DateContext";
import  { convertDateToDDMMYYYY } from "../../utils/dateFormat";

import useUser from "../../hooks/useUser";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";


export default function SignUp() {
  const queryClient = useQueryClient();
  const {  userId } = useUser();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    // reset,
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  // Synchronize `showSignup` with the URL on the first render and subsequent updates
  const [showSignup, setShowSignup] = useState(
    () => searchParams.get("value") !== "false"
  );

  const password = watch("password");
  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return true; 
  };
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("response",data)
      searchParams.set("value", "false"); 
      setSearchParams(searchParams);
      setShowSignup(false);
    },
 
    onError: () => {

      setShowSignup(true);
 
    },
  });

  const { mutate: googleSignUp, isLoading: loading } = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: () => {
      searchParams.set("value", "false");
      setSearchParams(searchParams);
      setShowSignup(false);
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      setShowSignup(true);
      toast.error(error.message);
    },
  });
  // const onSubmit = (data, e) => {
  //   e.preventDefault();
  //   const user = { ...data, agreedToTerms: data.agreedToTerms === "on" };
  //   mutate(user);
  // };
const onSubmit = async (data, e) => {
  e.preventDefault();
  const user = { ...data, agreedToTerms: data.agreedToTerms === "on" };

  try {
    const result = await mutateAsync(user);
    console.log("✅ Success:", result);
  
  } catch (error) {
    
    console.log("❌ Error object:", error); 
      if(error.isRegistered===false){
      searchParams.set("value", "false"); 
      setSearchParams(searchParams);
      setShowSignup(false);
    }else if(error.isRegistered===true){
        toast.error(error.message);
    }
  }
};

  useEffect(() => {
    // Only set the default value if `value` is not present in the URL
    if (!searchParams.has("value")) {
      searchParams.set("value", "true"); // Default to true if parameter does not exist
      setSearchParams(searchParams);
    } else {
      // Synchronize showSignup state with the value in the URL
      const showSignupParam = searchParams.get("value") !== "false";
      setShowSignup(showSignupParam);
    }
  }, [searchParams, setSearchParams]);

  return (
    <main className="signupBg min-h-[100vh] grid place-items-center p-4">
      <article className="md:bg-white md:px-[6rem] w-[95w] lg:px-[8rem] py-5 rounded-[1.2rem] flex flex-col gap-y-6">
        {showSignup && (
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex justify-center">
              <img src="/images/schoolplug.svg" alt="img" />
            </Link>
       
            <h3 className="capitalize font-fontHeading mb-0 text-center font-semibold">
              Nice to have you, Sign up
            </h3>
          </div>
        )}
        <div className="rounded-md md:w-[500px]">
          {showSignup ? (
            <form
              className="flex flex-col p-3 gap-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <input
                  type="name"
                  id="text"
                  placeholder="full name (as used in your student ID)"
                  className="border p-3 md:p-2 rounded-md border-stone-700 w-full placeholder:capitalize"
                  required
                  {...register("fullName")}
                  disabled={isLoading}
                />
                {errors?.fullName?.message && (
                  <p className="text-red-500 text-sm capitalize">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <input
                type="email"
                id="email"
                disabled={isLoading}
                placeholder="email"
                className="border p-3 md:p-2 rounded-md border-stone-700 w-full placeholder:capitalize"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                required
              />
              <div>
                <input
                  type="text"
                  disabled={isLoading}
                  id="phone_number"
                  placeholder="phone number"
                  required
                  className="border p-3 md:p-2 rounded-md border-stone-700 w-full placeholder:capitalize"
                  {...register("phoneNumber", {
                    required: "this field is required",
                    pattern: {
                      value: /^\d{11}$/,
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 capitalize">
                    Not a valid phone number
                  </p>
                )}
              </div>
              <PasswordField
                errors
                isPending={isLoading}
                open={open}
                ToggleOpen={() => setOpen(!open)}
                placeholder="create password"
                register={register}
              />
              <ConfirmPasswordField
                validateConfirmPassword={validateConfirmPassword}
                register={register}
                isPending={isLoading}
                open2={open2}
                ToggleOpen2={() => setOpen2(!open2)}
                placeholder="confirm password"
              />
              <div className="flex items-center gap-1 capitalize">
                <input
                  type="radio"
                  id="terms"
                  {...register("agreedToTerms")}
                  required
                />
                <div>
                  agree to our <Link>terms</Link> and <Link>policies</Link>
                </div>
              </div>
              <div className="md:grid mt-20 md:mt-6 gap-x-5 flex flex-col gap-y-2 md:grid-cols-2">
                <button
                  disabled={loading}
                  onClick={googleSignUp}
                  className="border flex p-1 justify-center gap-x-6 border-secondary600 items-center rounded-md text-secondary600 capitalize bg-transparent"
                >
                  <span>{loading ? "please wait.." : "sign up with"}</span>
                  <span>
                    <img src="/images/google-icon.png" alt="img" />
                  </span>
                </button>
                <button className="bg-secondary500 p-3 rounded-md font-semibold text-white capitalize">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <MiniLoader />{" "}
                    </div>
                  ) : (
                    "sign up"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <StudentInfo
              register={register}
              handleSubmit={handleSubmit}
              userId={userId}
            />
          )}
        </div>
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

export const PasswordField = ({
  label,
  isPending,
  placeholder,
  register,
 
  open,
  ToggleOpen,
}) => (
  <div className="Input-Data ">
    <label className="text-[12px]">{label}</label>
    <div className="relative">
      <input
        type={!open ? "password" : "text"}
        id="password"
        disabled={isPending}
        className="w-full md:p-2 border border-stone-700 p-3 rounded-md"
        placeholder={placeholder}
        {...register("password")}
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

export const ConfirmPasswordField = ({
  isPending,
  label,
  placeholder,
  register,
  error,
  errorMessage,
  open2,
  ToggleOpen2,
  validateConfirmPassword,
}) => (
  <div className="Input-Data ">
    <label className="text-[12px]">{label}</label>
    <div className="relative">
      <input
        disabled={isPending}
        type={!open2 ? "password" : "text"}
        id="confirmPassword"
        className="w-full md:p-2 border border-stone-700 p-3 rounded-md"
        placeholder={placeholder}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: validateConfirmPassword, // Custom validation function
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
      {error && <span className="text-white">{errorMessage}</span>}
    </div>
  </div>
);

function StudentInfo({ userId }) {
  const navigate = useNavigate();
  const { selectedDate, selectedDate2 } = useContext(DateContext);
  const [university, setUniversity] = useState("Yaba Tech");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
console.log(university)
  const { mutate: education, isLoading } = useMutation({
    mutationFn: EducationalSignUp,
    onSuccess: () => {
      navigate("/profilepic");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
 

  const handleSubmit = function (e) {
    e.preventDefault();
    const stundentInfo = {
      userId,
      university,
      department,
      level,
      faculty,
      yearOfAdmission: convertDateToDDMMYYYY(selectedDate),
      yearOfGraduation: convertDateToDDMMYYYY(selectedDate2),
    };
    console.log(stundentInfo);
    education(stundentInfo);
  };

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex flex-col items-center gap-2">
        <Link to="/">
          <img src="/images/schoolplug.svg" alt="img" />
        </Link>
        <h3 className="font-fontHeading font-semibold text-center">
          student info
        </h3>
      </div>
      <form className="flex flex-col p-3 gap-y-4" onSubmit={handleSubmit}>
        <select
          required
    
               value={university}
          className=" border border-stone-700 h-10 p-2 rounded-md"
            onChange={(e) => setUniversity(e.target.value)}
         
        >
                <option value="Select school" >
    Select school
  </option>
          <option className="capitalize" value="Yaba Tech">
            Yaba Tech
          </option>
          <option value="Unilag">Unilag</option>
          <option value="UI">UI</option>
          <option value="UNIPORT">UNIPORT</option>
          <option value="Lasu">Lasu</option>
          <option value="Unilorin">UNILORIN</option>
          <option value="OAU">OAU</option>
          <option value="UNIBEN">UNIBEN</option>
          <option value="FUTO">FUTO</option>
          <option value="UNN">UNN</option>
   
          <option value="ABU">ABU</option>
          <option value="UNIOSUN">UNIOSUN</option>
          
          <option value="DELSU">DELSU</option>
        </select>
       
 <select
          required
           value={faculty}
          className=" border h-10  border-stone-700 p-2 rounded-md"
          onChange={(e) => setFaculty(e.target.value)}
        >
          <option value="" disabled >
    Select faculty
  </option>
         <option value="Arts">Arts</option>
<option value="Science">Science</option>
<option value="Social Sciences">Social Sciences</option>
<option value="Education">Education</option>
<option value="Engineering">Engineering</option>
<option value="Law">Law</option>
<option value="Medicine">Medicine</option>
<option value="Pharmacy">Pharmacy</option>
<option value="Agriculture">Agriculture</option>

<option value="Environmental Sciences">Environmental Sciences</option>
<option value="Management Sciences">Management Sciences</option>
<option value="Dentistry">Dentistry</option>
<option value="Basic Medical Sciences">Basic Medical Sciences</option>
<option value="Veterinary Medicine">Veterinary Medicine</option>
<option value="Communication / Media Studies">Communication / Media Studies</option>

        </select>
        <input
          type="text"
          value={department}
          placeholder="department (input only department name)"
          id="department"
          className="w-full placeholder:capitalize md:p-2 border border-stone-700 p-2 rounded-md"
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="level"
          id="level"
          required
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full placeholder:capitalize md:p-2 border border-stone-700 p-2 rounded-md"
        />
 

        <div className="grid grid-cols-[auto,1fr,auto] items-center relative  rounded-md border-stone-700 border">
            <HiOutlineCalendar className=" text-lg text-stone-600 ml-2" />
          <div className=" grid items-center gap-x-1">
            <CustomDatePicker placeholder="year of Admission" />
          </div>
          <HiChevronDown className="absolute right-2 top-3 text-lg font-semibold" />
        </div>

        <div className="grid grid-cols-[auto,1fr,auto] items-center relative  rounded-md border-stone-700 border">
            <HiOutlineCalendar className=" text-lg text-stone-600 ml-2" />
          <div className=" grid items-center gap-x-1">
            <CustomDatePicker2 placeholder="year of graduation" />
          </div>
          <HiChevronDown className="absolute right-2 top-3 text-lg font-semibold" />
        </div>

        <Button className="mt-16 md:mt-2">
          {isLoading ? "creating account..." : "create an account"}
        </Button>
        {isLoading && <Loader />}
      </form>
    </div>
  );
}
