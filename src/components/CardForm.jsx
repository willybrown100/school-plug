import React, { useState, useEffect } from 'react';
import grayCheckIcon from '../../public/assets/gray.svg';
// import grayCheckIcon from '../assets/gray.svg';
import greenCheckIcon from '../../public/assets/green.svg';
// import greenCheckIcon from '../assets/green.svg';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { HiArrowLeft } from "react-icons/hi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const PaymentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedFee } = location.state || {};

    const [bankName, setBankName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cardPin, setCardPin] = useState('');
    const [showPin, setShowPin] = useState(false); // Toggle for PIN visibility
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({}); // For validation errors

    const isBankNameFilled = bankName.length > 0;
    const isCardNumberFilled = cardNumber.length > 0;
    const isCvvFilled = cvv.length === 3; // Limit to exactly 3 digits
    const isExpiryDateFilled = expiryDate.length === 5; // Format MM/YY
    const isCardPinFilled = cardPin.length === 4; // 4-digit PIN

    useEffect(() => {
        setIsButtonDisabled(!(isBankNameFilled && isCardNumberFilled && isCvvFilled && isExpiryDateFilled && isCardPinFilled));
    }, [bankName, cardNumber, cvv, expiryDate, cardPin]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        const isValidCardNumber = /^\d{16}$/.test(cardNumber.replace(/\s+/g, '')); // 16 digits
        const isValidCvv = /^\d{3}$/.test(cvv); // 3 digits
        const isValidExpiryDate = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate); // MM/YY format
        const isValidCardPin = /^\d{4}$/.test(cardPin); // 4 digits

        let formErrors = {};
        if (!isValidCardNumber) formErrors.cardNumber = "Please enter a valid 16-digit card number.";
        if (!isValidCvv) formErrors.cvv = "Please enter a valid 3-digit CVV.";
        if (!isValidExpiryDate) formErrors.expiryDate = "Please enter a valid expiry date (MM/YY).";
        if (!isValidCardPin) formErrors.cardPin = "Please enter a 4-digit PIN.";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = {
            bankName,
            cardNumber: cardNumber.replace(/\s+/g, ''), // Remove spaces before submission
            cvv,
            expiryDate,
            cardPin,
            selectedFee
        };

        console.log("Form submitted:", formData);

        navigate('/home/card-form');
    };

    // Format card number in groups of 4 digits
    const handleCardNumberChange = (e) => {
        const formattedNumber = e.target.value.replace(/\D+/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(formattedNumber);
    };

    // Auto-add slash in MM/YY for expiry date
    const handleExpiryDateChange = (e) => {
        const input = e.target.value.replace(/\D+/g, ''); // Remove non-digits
        if (input.length <= 2) {
            setExpiryDate(input); // MM
        } else if (input.length <= 4) {
            setExpiryDate(`${input.slice(0, 2)}/${input.slice(2, 4)}`); // MM/YY
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mx-auto md:w-1/2 pb-[5rem]">
            <h3 className='mb-[3rem] mt-[0.6rem] '>
                <Link to='/home/bills'>
                    <HiArrowLeft className='inline mr-2 text-black' />
                </Link>
                Pay bills
            </h3>
            <h2 className="text-[16px] mb-6">Add debit card</h2>

            <form onSubmit={handleSubmit}>
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

                {/* Card Number Input */}
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
                    type="text"
                    id="cardNumber"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-1"
                    placeholder="#### #### #### ####"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

                {/* CVV Input */}
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
                    type="number"
                    id="cvv"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-1"
                    placeholder="Enter 3-digit CVV"
                    maxLength="3"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

                {/* Expiry Date */}
                <div className="flex items-center space-x-2 mb-4">
                    <img
                        src={isExpiryDateFilled ? greenCheckIcon : grayCheckIcon}
                        alt="Checkmark"
                        className="w-6 h-6"
                    />
                    <label htmlFor="expiryDate" className="font-bold text-[16px]">
                        4. Expiry date (MM/YY)
                    </label>
                </div>
                <input
                    type="text"
                    id="expiryDate"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-1"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    maxLength="5" // Limit to MM/YY format
                />
                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}

                {/* Card Pin with visibility toggle */}
                <div className="flex items-center space-x-2 mb-4">
                    <img
                        src={isCardPinFilled ? greenCheckIcon : grayCheckIcon}
                        alt="Checkmark"
                        className="w-6 h-6"
                    />
                    <label htmlFor="cardPin" className="font-bold text-[16px]">
                        5. Card PIN
                    </label>
                </div>
                <div className="relative mb-1">
                    <input
                        type={showPin ? "text" : "password"} // Toggle between text and password
                        id="cardPin"
                        className="border border-gray-300 p-3 rounded-lg w-full"
                        placeholder="Enter your card PIN"
                        maxLength="4"
                        value={cardPin}
                        onChange={(e) => setCardPin(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                        {showPin ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </button>
                </div>
                {errors.cardPin && <p className="text-red-500 text-sm">{errors.cardPin}</p>}

                {/* Selected Fee Section */}
                {selectedFee ? (
                    <div className="flex items-center border px-3 pt-2 mb-4 rounded-lg outline outline-1 outline-blue-500 w-[65%]">
                        <img src={selectedFee.image} alt={selectedFee.name} className='inline mr-4 pb-4 ' />
                        <div className='flex flex-col mt-1 mr-3'>
                            <h3 className="text-[14px]">{selectedFee.name}</h3>
                            <p className="font-bold">{selectedFee.amount}</p>
                        </div>
                        <input type="radio" name="selectedFee" id="selectedFee" checked={true} readOnly />
                    </div>
                ) : (
                    <p>No fee selected</p>
                )}

                {/* Continue Button */}
                <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={isButtonDisabled ? 'bg-[#B8CFF3] text-[#FAFAFA] py-3 px-[70px] rounded w-full font-bold' : 'bg-[#2B70DB] text-white py-3 px-[70px] rounded w-full font-bold'}>
                    Continue
                </button>
            </form>

        </div>
    );
};

export default PaymentForm;
