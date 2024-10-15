import React, { useState, useEffect } from 'react';
import grayCheckIcon from '../assets/gray.svg'; // Gray checkmark icon
import greenCheckIcon from '../assets/green.svg'; // Green checkmark icon
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { HiArrowLeft } from "react-icons/hi";

const levels = ['Choose Year', 'Year 1', 'Year 2', 'Year 3', 'Year 4']; // Include default option

const PaymentForm = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const { selectedFee } = location.state || {};
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [regNo, setRegNo] = useState('');
    const [selectedLevel, setSelectedLevel] = useState(levels[0]); // Default to "Choose Level"
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button disabled by default

    // Check if inputs are filled
    const isFirstNameFilled = firstName.length > 0;
    const isLastNameFilled = lastName.length > 0;
    const isDepartmentFilled = department.length > 0;
    const isRegNoFilled = regNo.length > 0;
    const isLevelSelected = selectedLevel !== 'Choose Level'; // Check if a valid level is selected

    // Effect to enable/disable button based on form validity
    useEffect(() => {
        setIsButtonDisabled(!(isFirstNameFilled && isLastNameFilled && isDepartmentFilled && isRegNoFilled && isLevelSelected));
    }, [firstName, lastName, department, regNo, selectedLevel]);

    // Form submission handler
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Create an object with the form data
        const formData = {
            firstName,
            lastName,
            department,
            regNo,
            selectedLevel,
            selectedFee // Include selected fee if needed
        };

        // Process the form data (e.g., send to API)
        console.log("Form submitted:", formData);

        // Optional: Clear the form or navigate to another page
        // setFirstName('');
        // setLastName('');
        // setDepartment('');
        // setRegNo('');
        // setSelectedLevel(levels[0]); // Reset to "Choose Level"
        navigate('/home/card-form'); // Navigate to a success page or another route
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mx-auto container md:w-1/2 pb-[5rem]">
            <h3 className='mb-[3rem] mt-[0.6rem] '>
                <Link to='/home/bills'>
                    <HiArrowLeft className='inline mr-2 text-black' />
                </Link>
                Pay bills
            </h3>
            <h2 className="text-[16px] mb-6">Student Information</h2>

            <form onSubmit={handleSubmit}> {/* Add onSubmit to the form */}
                {/* First Name Input */}
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
                        <option key={index} value={level}>{level}</option>
                    ))}
                </select>

                {/* Selected Fee Section */}
                {selectedFee ? (
                    <div className="flex items-center border px-3 pt-2 mb-4 rounded-lg outline outline-1 outline-blue-500 w-[65%]">
                        <img src={selectedFee.image} alt={selectedFee.name} className='inline mr-4 pb-4 ' />
                        <div className='flex flex-col mt-1 mr-3'>
                            <h3 className="text-[14px]">{selectedFee.name}</h3>
                            <p className="font-bold">{selectedFee.amount}</p>
                        </div>
                        <input type="radio" name="selectedFee" id="selectedFee" checked={true} readOnly /> {/* Set checked to true */}
                    </div>
                ) : (
                    <p>No fee selected</p>
                )}

                {/* Continue Button */}
                <button
                    type="submit" // Set button type to submit
                    disabled={isButtonDisabled}
                    className={isButtonDisabled ? 'bg-[#B8CFF3] text-[#FAFAFA] py-3 px-[70px] rounded w-full font-bold' : 'bg-[#2B70DB] text-white py-3 px-[70px] rounded w-full font-bold'}>
                    Continue
                </button>
            </form>

        </div>
    );
};

export default PaymentForm;
