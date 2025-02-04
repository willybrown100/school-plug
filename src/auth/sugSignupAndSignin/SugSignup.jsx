/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { IoIosEye } from "react-icons/io";
import { useForm } from "react-hook-form";
import Modals from "../../components/Modals";
import FileImportModal from "../../components/FileImportModal";
import { schoolInfo } from "../../services/contactApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import MiniLoader from "../../ui/MiniLoader";

import { DateContext } from "../../DateContext";
import useSug from "../../hooks/useSug";
import Loader from "../../components/Loader";
import useSchool from "../../hooks/useSchool";
import BlueLoader from "../../components/BlueLoader";
import {
  getFaculties,
  schoolFacultyandReg,
  sugSignUp,
} from "../../services/sugApis";

export default function SugSignup() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialStep = searchParams.get("steps") || 1;
  const [steps, setSteps] = useState(Number(initialStep));

  const { mutate, isLoading } = useMutation({
    mutationFn: sugSignUp,
    onSuccess: () => {
      searchParams.set("steps", 2);
      setSearchParams(searchParams);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    handleSubmit,
    watch,
    register,
 
    // reset,
  } = useForm();

  const password = watch("password");
  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return true; // Validation passed
  };
  const onSubmit = function (data, e) {
    e.preventDefault();
    const user = {
      ...data,
      agreedToTerms: data.agreedToTerms === "on",
    };
    mutate(user);
    console.log(user);
  };

  useEffect(() => {
    // When the component mounts, check if the step is in the URL
    // If so, set the step state accordingly
    const currentStep = searchParams.get("steps");
    if (currentStep) {
      setSteps(Number(currentStep)); // Ensure step is set to the correct value on reload
    }
  }, [searchParams]);
  return (
    <article className="sugsignup  grid items-center">
      {steps === 1 && (
        <div className="p-3">
          <div className="flex flex-col gap-y-10 items-center">
            <Link to="/" className="flex justify-center">
              <img src="\images\shool-pluglogo.png" alt="img" />
            </Link>
            <h3 className="capitalize font-heading font-medium">
              create account
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
            <div className="bg-white rounded-md  p-2 flex flex-col gap-y-5 ">
              <input
                type="text"
                placeholder="SUG full name"
                required
                disabled={isLoading}
                className="border w-full border-stone-400 rounded-md p-2 placeholder:capitalize  px-2 outline-none"
                {...register("sugFullName")}
              />
              <input
                type="email"
                placeholder="email"
                required
                disabled={isLoading}
                className="border w-full placeholder:capitalize border-stone-400 rounded-md p-2  px-2 outline-none"
                {...register("email")}
              />
              <input
                type="text"
                placeholder="phone number"
                required
                disabled={isLoading}
                className="border w-full border-stone-400 placeholder:capitalize  rounded-md p-2 px-2 outline-none"
                {...register("phoneNumber")}
              />
              <PasswordField
                open={open}
                ToggleOpen={() => setOpen(!open)}
                register={register}
                isPending={isLoading}
                placeholder="create password"
              />
              <ConfirmPasswordField
                open2={open2}
                isPending={isLoading}
                placeholder="confirm password"
                ToggleOpen2={() => setOpen2(!open2)}
                register={register}
                validateConfirmPassword={validateConfirmPassword}
              />
              <div className="flex items-center gap-x-2">
                <input type="radio" {...register("agreedToTerms")} required />
                <p className="mb-0 font-medium font-heading">
                  Agree to our <Link>terms</Link> and <Link>policies</Link>
                </p>
              </div>
            </div>
            <Button
              disable={isLoading}
              className="w-full p-3 text-center mt-10"
            >
              {" "}
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <MiniLoader />
                </div>
              ) : (
                "Signup"
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
                to="/sugsignin"
                className="text-secondary500 capitalize font-semibold flex justify-center"
              >
                sign in instead
              </Link>
            </div>
          </form>
        </div>
      )}
      {steps === 2 && (
        <SchoolInfo
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
      {steps === 3 && <SchoolFaculty />}
    </article>
  );
}

function SchoolInfo({ searchParams, setSearchParams }) {
  const imageRef = useRef();
  const [university, setUniversity] = useState("Yaba Tech");
  const [state, setState] = useState("");
  const [aboutUniversity, setAboutUniversity] = useState("");
  const [uniProfilePicture, setUniProfilePicture] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { authUserData, userId } = useSug();
  console.log(userId, authUserData);
  // console.log(uniProfilePhoto, userId);

  const { mutate, isLoading } = useMutation({
    mutationFn: schoolInfo,
    onSuccess: () => {
      searchParams.set("steps", 3);
      setSearchParams(searchParams);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const disable =
    !university ||
    !state ||
    !aboutUniversity ||
    !uniProfilePicture ||
    !imagePreview;
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUniProfilePicture(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = function (e) {
    e.preventDefault();
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  const handleSubmit = function (e) {
    e.preventDefault();
    const schInfo = {
      userId,
      university,
      state,
      aboutUniversity,
      uniProfilePicture,
    };
    console.log(schInfo);
    mutate({ userId, university, state, aboutUniversity, uniProfilePicture });
  };
  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-10 items-center">
        <Link to="/" className="flex justify-center">
          <img src="\images\shool-pluglogo.png" alt="img" />
        </Link>
        <h3 className="capitalize font-heading font-medium">school info</h3>
      </div>
      <form className="" onSubmit={handleSubmit}>
        <div className="  flex flex-col gap-y-4 bg-white p-3">
          {/* <input
            type="text"
            placeholder="School Name"
            value={university}
            required
            onChange={(e) => setUniversity(e.target.value)}
            className="border border-stone-400 placeholder:text-[0.9rem]  rounded-md  p-2 w-full"
          /> */}
          <select
            required
            value={university}
            className=" border border-stone-700 p-2 rounded-md"
            onChange={(e) => setUniversity(e.target.value)}
          >
            <option className="capitalize" value="Yaba Tech">
              Yaba Tech
            </option>
            <option value="Unilag">Unilag</option>
          </select>
          <input
            type="text"
            placeholder="state (pls input only state name)"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
            className="border border-stone-400 placeholder:text-[0.9rem]  rounded-md  p-2 w-full"
          />
          <textarea
            placeholder="About University"
            value={aboutUniversity}
            required
            onChange={(e) => setAboutUniversity(e.target.value)}
            className="border border-stone-400 rounded-md h-[8rem] p-2 w-full"
          />

          {imagePreview ? (
            <div className="flex gap-x-2 items-center">
              <img
                src={imagePreview}
                alt="img"
                className="w-8 h-8 rounded-full"
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={handleClick}
                className="border-2 text-secondary600 capitalize font-semibold font-heading border-secondary600 p-2 rounded-md w-full"
              >
                change photo
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleClick}
              className="text-left bg-transparent border rounded-md p-2 text-stone-500 capitalize border-stone-400"
            >
              university profile photo
            </button>
          )}
          <input
            type="file"
            accept="image"
            className="hidden"
            ref={imageRef}
            onChange={handleImageChange}
          />
        </div>

        <button
          disabled={disable}
          type="submit"
          className={`w-full mt-20 ${
            disable ? "bg-secondary400" : "bg-secondary600"
          }  p-2 capitalize font-semibold tracking-wide rounded-md text-white`}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <MiniLoader />
            </div>
          ) : (
            "continue"
          )}
        </button>
      </form>
    </div>
  );
}

function SchoolFaculty() {
  const queryClient = useQueryClient();
  const [facultyName, setFacultyName] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const { selectedFile } = useContext(DateContext);
  console.log(selectedFile, facultyName, selectedFaculties);
  const dis = facultyName.length === 0 || !selectedFile;
  const { id } = useSchool();
  console.log(id);
  const navigate = useNavigate();
  const numOfSelected = facultyName.length;
  const { data = [], isLoading } = useQuery({
    queryFn: () => getFaculties(id),
    queryKey: ["schoolId"],
  });

  console.log(data);
  const { mutate, isLoading: schoolLoading } = useMutation({
    mutationFn: schoolFacultyandReg,
    onSuccess: () => {
      toast.success("registration successful");
      navigate("/sughome");
      queryClient.invalidateQueries("sug");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFacultyChange = (faculty, id) => {
    // Check if the faculty is already selected
    if (facultyName.includes(faculty)) {
      // Remove the faculty from the array
      setFacultyName(facultyName.filter((selected) => selected !== faculty));
      setSelectedFaculties(
        selectedFaculties.filter((selectedId) => selectedId !== id)
      );
    } else {
      // Add the faculty to the array
      setFacultyName([...facultyName, faculty]);
      setSelectedFaculties([...selectedFaculties, id]);
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    console.log({
      schoolInfoId: id,
      facultyName,
      file: selectedFile,
      selectedFaculties,
    });
    mutate({
      schoolInfoId: id,
      facultyName,
      file: selectedFile,
      selectedFaculties,
    });
  };

  return (
    <div className="p-3">
      <div className="flex flex-col gap-y-10 items-center">
        <Link to="/" className="flex justify-center">
          <img src="\images\shool-pluglogo.png" alt="img" />
        </Link>
        <h3 className="capitalize font-heading font-medium">school info</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-md p-2 shadow-md">
          <div className="flex justify-between items-center ">
            <div>
              <h3 className="mb-1 text-stone-600">faculty/school/college</h3>
              <p className="text-sm  text-stone-400">Select all that applies</p>
            </div>
            <p className="border border-secondary400 rounded-full mb-0 p-1">
              {" "}
              <span className="border-2 border-green-600 w-7 h-7 rounded-full flex justify-center items-center">
                {numOfSelected}
              </span>
            </p>
          </div>
          <div className="flex flex-col  gap-y-3 overflow-y-auto h-[40vh]">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <BlueLoader />
              </div>
            ) : (
              data?.map((item) => (
                <div key={item.facultyName} className="relative p-2">
                  <div className="border  border-stone-400  rounded-md p-2">
                    <input
                      type="checkbox"
                      className="absolute z-30 left-[0rem] top-4.5 w-4 h-4"
                      value={item.facultyName}
                      onChange={() =>
                        handleFacultyChange(item.facultyName, item._id)
                      }
                    />
                    <p className="mb-0 capitalize pl-2 font-heading font-medium">
                      {item.facultyName}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-10 bg-white shadow-md p-4 rounded-md">
          <h3>Import Student Reg No.</h3>
          <span className="text-sm terxt">Import all student Reg No.</span>
          <div className="relative p-2">
            <div className="border  border-stone-400  rounded-md p-2">
              <input
                type="checkbox"
                className="absolute z-30 left-[0rem] top-4.5 w-4 h-4"
              />
              <OpenModal />
            </div>
          </div>
        </div>
        <button
          disabled={schoolLoading}
          className={`${
            dis ? "bg-secondary400" : "bg-secondary600"
          } text-white rounded-md font-heading font-semibold tracking-wide capitalize p-2 w-full mt-10`}
        >
          create school account
        </button>
        {schoolLoading && <Loader />}
      </form>
    </div>
  );
}

function OpenModal() {
  const { selectedFile, fileName } = useContext(DateContext);
  console.log(selectedFile);
  const handleClick = function (e) {
    e.preventDefault();
  };
  return (
    <Modals>
      <Modals.Open opens="UserModal">
        <button
          type="button"
          onClick={handleClick}
          className="mb-0 capitalize bg-transparent pl-2 font-heading font-medium"
        >
          {fileName
            ? `${fileName}   (Click to import) `
            : "0 Reg No. imported (Click to import)"}
        </button>
      </Modals.Open>
      <Modals.Window name="UserModal">
        <FileImportModal />
      </Modals.Window>
    </Modals>
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
        className="w-full md:p-2 border placeholder:capitalize outline-none border-stone-400 p-2 rounded-md"
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
        className="w-full md:p-2 border outline-none placeholder:capitalize border-stone-400 p-2 rounded-md"
        placeholder={placeholder}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: validateConfirmPassword, // Custom validation function
        })}
        autoComplete="current-password"
      />
      <span className="absolute right-3 top-3 cursor-pointer">
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






