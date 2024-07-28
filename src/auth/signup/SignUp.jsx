
import React, {  useState } from "react";
import Logo from "../../components/Logo";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { IoIosEye } from "react-icons/io";
import { HiChevronDown, HiChevronUp, HiOutlineCalendar, HiOutlineEyeSlash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import CustomDatePicker from "./DatePicker";
import Button from "../../ui/Button";
import signUp from "../../services/contactApi";
import { useMutation } from "@tanstack/react-query";



export default function SignUp() {
  const { handleSubmit, register,formState:{errors},setError ,reset} = useForm();
  const [showsignUp,setShowSignup]=useState(true)
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const ToggleOpen = () => setOpen(!open);
  const ToggleOpen2 = () => setOpen2(!open2);

const {mutate,isPending} = useMutation({
  mutationFn: signUp,
  onSuccess:()=>{
    console.log("first signup sucessful")
    // reset()
    setShowSignup(false)

  }
});
  const onSubmit = function (data) {
    const user = { ...data, agree_to_terms: data.agree_to_terms ==="on"};
    mutate(user);
    console.log(user);
  };
  return (
    <main className="signupBg grid place-items-center p-4">
      <article className="md:bg-white md:px-[6rem] w-[95w] lg:px-[8rem] py-5 rounded-[1.2rem] flex flex-col gap-y-6">
        <div className="flex justify-center">
          <img src="/images/shool-pluglogo.png" alt="img" />
        </div>

        {showsignUp && (
          <h3 className="capitalize font-fontHeading mb-0 text-center font-semibold">
            Nice to have you, Sign up
          </h3>
        )}
        <div className=" rounded-md   md:w-[500px]">
          {showsignUp ? (
            <form
              className="flex flex-col p-3 gap-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="name"
                id="text"
                placeholder="full name (as used in your student iD)"
                className="border p-3 md:p-2 rounded-md border-stone-700 w-full placeholder:capitalize"
                {...register("full_name")}
              />
              <input
                type="email"
                id="email"
                placeholder="email"
                className="border p-3 md:p-2 rounded-md border-stone-700 w-full placeholder:capitalize"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              <input
                type="text"
                id="phone_number"
                placeholder="phone number"
                className="border p-3 md:p-2 rounded-md border-stone-700 w-full placeholder:capitalize"
                {...register("phone_number", {
                  required: "this field is required",
                  pattern:{
                    value:/^\d{11}$/
                  }
                })}
              />
              {errors.phone_number && <p className="text-red-500 capitalize ">not a valid phone number </p>}
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
                <input
                  type="radio"
                  id="terms"
                  {...register("agree_to_terms")}
                />
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
                <button
            
                  className="bg-secondary500 p-3 rounded-md font-semibold  text-white capitalize"
                >
                  {" "}
                  {isPending ? "signing up.." : "sign up"}
                </button>
              </div>
            </form>
          ) : (
            <StudentInfo register={register} />
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
        id="password"
        className="w-full md:p-2 border border-stone-700 p-3 rounded-md"
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
export const ConfirmPasswordField = ({
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
        className="w-full md:p-2 border border-stone-700 p-3 rounded-md"
        placeholder={placeholder}
        {...register("confirm_password")}
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

function StudentInfo({register}) {
  return (
    <div className="flex w-full flex-col gap-y-4">
      <h3 className="font-fontHeading font-semibold text-center">
        student info
      </h3>
      <form className="flex flex-col p-3 gap-y-4">
        <input
          type="text"
          placeholder="university of study"
          className="w-full md:p-2 border p-3 border-stone-700 rounded-md"
          {...register("university_of_study")}
          id="university"
        />
        <input
          type="text"
          placeholder="course"
          id="course"
          className="w-full  md:p-2 border border-stone-700 p-3 rounded-md"
          {...register("course")}
        />

        <input
          type="text"
          placeholder="department"
          id="department"
          className="w-full  md:p-2 border border-stone-700 p-3 rounded-md"
          {...register("department")}
        />
        <input
          type="text"
          placeholder="level"
          id="level"
          className="w-full  md:p-2 border border-stone-700 p-3 rounded-md"
          {...register("level")}
        />
        <div className="grid grid-cols-1 relative">
          <CustomDatePicker placeholder={`year of admission`} />
          <HiOutlineCalendar className="absolute top-2 left-2 text-lg text-stone-600" />
          <HiChevronDown className="absolute right-2 top-3 text-lg font-semibold" />
        </div>
        <div className="grid grid-cols-1 relative">
          <CustomDatePicker placeholder="year of graduation" />
          <HiOutlineCalendar className="absolute top-2 left-2 text-lg text-stone-600" />
          <HiChevronDown className="absolute right-2 top-3 text-lg font-semibold" />
        </div>

        <Button className="mt-16 md:mt-2">create an account</Button>
      </form>
    </div>
  );
}
