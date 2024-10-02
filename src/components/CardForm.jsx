import React, { useState, useEffect } from 'react';
import grayCheckIcon from '../assets/gray.svg'; // Gray checkmark icon
import greenCheckIcon from '../assets/green.svg'; // Green checkmark icon
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { HiArrowLeft } from "react-icons/hi";

const PaymentForm = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const { selectedFee } = location.state || {}; // Fetch the selected fee from location state

    const [bankName, setBankName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardPin, setCardPin] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button disabled by default

    // Check if inputs are filled
    const isBankNameFilled = bankName.length > 0;
    const isCardNumberFilled = cardNumber.length > 0;
    const isCvvFilled = cvv.length > 0;
    const isExpiryDateFilled = expiryDate.length > 0;
    const isCardPinFilled = cardPin.length > 0;

    // Effect to enable/disable button based on form validity
    useEffect(() => {
        setIsButtonDisabled(!(isBankNameFilled && isCardNumberFilled && isCvvFilled && isExpiryDateFilled && isCardPinFilled));
    }, [bankName, cardNumber, cvv, expiryDate, cardPin]);

    // Form submission handler
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Validate inputs
        const isValidCardNumber = /^\d+$/.test(cardNumber);
        const isValidCvv = /^\d{3,4}$/.test(cvv); // 3 or 4 digits for CVV
        const isValidExpiryDate = /^\d{4}$/.test(expiryDate); // 4 digits for MMYY
        const isValidCardPin = /^\d{4}$/.test(cardPin); // 4 digits for card pin

        if (!isValidCardNumber || !isValidCvv || !isValidExpiryDate || !isValidCardPin) {
            alert("Please enter valid numeric values for all fields.");
            return; // Prevent form submission if validation fails
        }

        // Create an object with the form data
        const formData = {
            bankName,
            cardNumber,
            cvv,
            expiryDate,
            cardPin,
            selectedFee // Include selected fee if needed
        };

        // Process the form data (e.g., send to API)
        console.log("Form submitted:", formData);

        // Navigate to another page
        navigate('/home/card-form'); // Navigate to a success page or another route
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
            <h3 className='mb-[3rem] mt-[0.6rem] '>
                <Link to='/home/bills'>
                    <HiArrowLeft className='inline mr-2 text-black' />
                </Link>
                Pay bills
            </h3>
            <h2 className="text-[16px] mb-6">Add debit card</h2>

            <form onSubmit={handleSubmit}> {/* Add onSubmit to the form */}
                {/* Bank Name Input */}
                <div className="flex items-center space-x-2 mb-4">
                    <img
                        src={isBankNameFilled ? greenCheckIcon : grayCheckIcon}
                        alt="Checkmark"
                        className="w-6 h-6"
                    />
                    <label htmlFor="bankName" className="font-bold text-[16px]">
                        1. Bank name
                    </label>
                </div>
                <input
                    type="text"
                    id="bankName"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4"
                    placeholder="Enter bank name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                />

                {/* Card Number Input*/}
                <div className="flex items-center space-x-2 mb-4">
                    <img
                        src={isCardNumberFilled ? greenCheckIcon : grayCheckIcon}
                        alt="Checkmark"
                        className="w-6 h-6"
                    />
                    <label htmlFor="cardNumber" className="font-bold text-[16px]">
                        2. Card number
                    </label>
                </div>
                <input
                    type="number" // Change type to text to allow leading zeros
                    id="cardNumber"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4"
                    placeholder="Enter your card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />

                {/* CVV Input  */}
                <div className="flex items-center space-x-2 mb-4">
                    <img
                        src={isCvvFilled ? greenCheckIcon : grayCheckIcon}
                        alt="Checkmark"
                        className="w-6 h-6"
                    />
                    <label htmlFor="cvv" className="font-bold text-[16px]">
                        3. CVV
                    </label>
                </div>
                <input
                    type="number" // Change type to text to allow leading zeros
                    id="cvv"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />

                {/* Expiry Date */}
                <div className="flex items-center space-x-2 mb-4">
                    <img
                        src={isExpiryDateFilled ? greenCheckIcon : grayCheckIcon}
                        alt="Checkmark"
                        className="w-6 h-6"
                    />
                    <label htmlFor="expiryDate" className="font-bold text-[16px]">
                        4. Expiry date
                    </label>
                </div>
                <input
                    type="number" // Change type to text to allow leading zeros
                    id="expiryDate"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4"
                    placeholder="MMYY" // Example: 0726 for July 2026
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                />

                {/* Card Pin */}
                <div className="flex items-center space-x-2 mb-4">
                    <img
                        src={isCardPinFilled ? greenCheckIcon : grayCheckIcon}
                        alt="Checkmark"
                        className="w-6 h-6"
                    />
                    <label htmlFor="cardPin" className="font-bold text-[16px]">
                        5. Card pin
                    </label>
                </div>
                <input
                    type="number" // Masked input for security
                    id="cardPin"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-4"
                    placeholder="Enter your card pin"
                    value={cardPin}
                    onChange={(e) => setCardPin(e.target.value)}
                />

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
