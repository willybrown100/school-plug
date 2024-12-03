/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import grayCheckIcon from "../../public/assets/gray.svg";
// import grayCheckIcon from '../assets/gray.svg';
import greenCheckIcon from "../../public/assets/green.svg";
// import greenCheckIcon from '../assets/green.svg';
import { useLocation, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { HiArrowLeft } from "react-icons/hi";

import Modals from "./Modals";
import SmallScreenBillModal from "./SmallScreenBillModal";
import useGetUser from "../hooks/useGetUser";
import { useMutation } from "@tanstack/react-query";
import { studentPaymentDetails } from "../services/contactApi";
import MiniLoader from "../ui/MiniLoader";
import toast from "react-hot-toast";

const levels = ["Select Level", "Year 1", "Year 2", "Year 3", "Year 4"]; // Include default option

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {data}=useGetUser()

 const email=data?.user?.email
 
  
const [amount,setAmount]=useState("")
  
const [selectedFee, setSelectedFee] = useState({});

  useEffect(() => {
    // Parse the query string whenever the location changes
    const params = new URLSearchParams(location.search);
    const selectedOption = params.get("option");
    const selectedContent = selectedOption
      ? JSON.parse(decodeURIComponent(selectedOption))
      : null;
    setSelectedFee(selectedContent);
  }, [location.search]);


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [regNo, setRegNo] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(levels[0]); // Default to "Choose Level"
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button disabled by default

  // Check if inputs are filled
  const isFirstNameFilled = firstName.length > 0;
  const isLastNameFilled = lastName.length > 0;
  const isDepartmentFilled = department.length > 0;
  const isRegNoFilled = regNo.length > 0;
  const isLevelSelected = selectedLevel !== "Choose Level"; // Check if a valid level is selected


  useEffect(() => {
    setIsButtonDisabled(
      !(
        isFirstNameFilled &&
        isLastNameFilled &&
        isDepartmentFilled &&
        isRegNoFilled &&
        isLevelSelected
      )
    );
  }, [firstName, lastName, department, regNo, selectedLevel]);
 const queryString = encodeURIComponent(JSON.stringify({...selectedFee,amount}));
 console.log(queryString)
  const { mutate, isLoading } = useMutation({
    mutationFn: studentPaymentDetails,
    onSuccess: () => {
      navigate(`/home/card-form?option=${queryString}`);
     
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      department,
      regNo,
      academicLevel: selectedLevel,
      email,
      feeType: selectedFee?.selectedValue,
    };

mutate(formData);
    console.log("Form submitted:", formData);
  };


  return (
    <div className="bg-white p-4 rounded-lg pt-[8rem] shadow-md mx-auto container md:w-1/2 pb-[5rem]">
      <h3 className="mb-[2rem] font-semibold mt-[0.6rem] ">
        <Link to="/home/bills">
          <HiArrowLeft className="inline mr-2 text-black" />
        </Link>
        Pay bills
      </h3>
      <img src="\images\progresbar.png" alt="img" className="mb-6" />
      <h2 className="text-[16px] mb-6">Student Information</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2 mb-4">
          <img
            src={isFirstNameFilled ? greenCheckIcon : grayCheckIcon}
            alt="Checkmark"
            className="w-6 h-6"
          />
          <label htmlFor="firstName" className="font-bold text-[16px]">
            1. First name
          </label>
        </div>
        <input
          type="text"
          id="firstName"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {/* Last Name Input*/}
        <div className="flex items-center space-x-2 mb-4">
          <img
            src={isLastNameFilled ? greenCheckIcon : grayCheckIcon}
            alt="Checkmark"
            className="w-6 h-6"
          />
          <label htmlFor="lastName" className="font-bold text-[16px]">
            2. Last name
          </label>
        </div>
        <input
          type="text"
          id="lastName"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 "
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {/* Department Input  */}
        <div className="flex items-center space-x-2 mb-4">
          <img
            src={isDepartmentFilled ? greenCheckIcon : grayCheckIcon}
            alt="Checkmark"
            className="w-6 h-6"
          />
          <label htmlFor="department" className="font-bold text-[16px]">
            3. Department
          </label>
        </div>
        <input
          type="text"
          id="department"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4"
          placeholder="Enter your department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        {/* Registration Number */}
        <div className="flex items-center space-x-2 mb-4">
          <img
            src={isRegNoFilled ? greenCheckIcon : grayCheckIcon}
            alt="Checkmark"
            className="w-6 h-6"
          />
          <label htmlFor="regNo" className="font-bold text-[16px]">
            4. Registration Number
          </label>
        </div>
        <input
          type="text"
          id="regNo"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4"
          placeholder="Enter your registration number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />
        {/* Level Selection */}
        <div className="flex items-center space-x-2 mb-4">
          <img
            src={isLevelSelected ? greenCheckIcon : grayCheckIcon}
            alt="Checkmark"
            className="w-6 h-6"
          />
          <label htmlFor="level" className="font-bold text-[16px]">
            5. Academic Level
          </label>
        </div>
        <select
          id="level"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          {levels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
        {/* Selected Fee Section */}
        {selectedFee?.selectedValue ? (
          <div className="flex flex-col mb-4 gap-y-6 ">
            <div className="flex items-center border px-3 p-3 mt-2 w-full rounded-lg outline outline-1 outline-blue-500">
              <img
                src={selectedFee.image}
                alt={selectedFee.selectedValue}
                className="inline mr-4  "
              />
              <div className="flex flex-col mr-3">
                <h3 className="text-[14px] mb-0">
                  {selectedFee.selectedValue}
                </h3>
              </div>
              <input
                type="radio"
                name="selectedFee"
                id="selectedFee"
                checked={true}
                readOnly
                className="ml-auto"
              />{" "}
            </div>
            <input
              type="text"
              value={amount}
              placeholder="enter amount"
              className="w-full p-2 border border-stone-600 rounded-md"
              onChange={(e) => setAmount(e.target.value)}
            />
            <OpenModal selectedFee={selectedFee} setSelectedFee={setSelectedFee} />
          </div>
        ) : (
          <p>No fee selected</p>
        )}

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={
            isButtonDisabled
              ? "bg-[#B8CFF3] text-[#FAFAFA] py-3 px-[70px] mt-10 rounded w-full font-bold"
              : "bg-secondary600 text-white py-3 px-[70px] mt-10 rounded w-full font-bold"
          }
        >
          {isLoading ? (
            <div className="flex justify-center">
              <MiniLoader />
            </div>
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;

function OpenModal({ selectedFee, setSelectedFee }) {
  return (
    <Modals>
      <Modals.Open opens="bill">
        <button
          type="button"
          className=" rounded-md capitalize bg-secondary600 p-2 text-white"
        >
          switch bill type
        </button>
      </Modals.Open>
      <Modals.Window name="bill">
        <SmallScreenBillModal
          selectedFee={selectedFee}
          setSelectedFee={setSelectedFee}
        />
      </Modals.Window>
    </Modals>
  );
}
