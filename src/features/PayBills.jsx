import React, { useState } from 'react';
import { HiArrowLeft } from "react-icons/hi";
import img1 from '../assets/bill.svg'
import img2 from '../assets/teacher.svg'
import img3 from '../assets/book.svg'
import { Link } from 'react-router-dom'
const PayBills = () => {
    const [selectedFee, setSelectedFee] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleFeeChange = (event) => {
        const feeId = event.target.id;
        setSelectedFee(feeId);
        setIsButtonDisabled(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(`Selected fee: ${selectedFee}`);
        // You can make an API call or perform any other action here
    };

    return (
        <div className='font-Inter container mx-auto p-3 '>
            <h3 className='mb-[3rem] mt-[0.6rem] '>
                <Link to='/'>
                    <HiArrowLeft className='inline mr-2 text-black' />
                </Link>
                Pay bills
            </h3>
            <section className='mb-[7rem]'>
                <p className='text-[#0E2750] text-[14px]'>
                    Select a bill you want to pay then proceed to making payment
                </p>
                <div
                    className={`flex items-center justify-between border p-4 mb-4 rounded-lg ${selectedFee === 'fee1' ? 'outline outline-1 outline-blue-500' : ''}`}
                >
                    <div className="flex items-center">
                        <img className='inline mr-4' src={img1} alt="SUG Fee Image" />
                        <label htmlFor="fee2">SUG fee</label>
                    </div>
                    <input
                        type="radio"
                        id="fee1"
                        name="fee"
                        value="fee1"
                        onChange={handleFeeChange}
                        className=""
                    />
                </div>
                <div
                    className={`flex items-center justify-between border p-4 mb-4 rounded-lg ${selectedFee === 'fee2' ? 'outline outline-1 outline-blue-500' : ''}`}
                >
                    <div className="flex items-center">
                        <img className='inline mr-4' src={img2} alt="Departmental Fee Image" />
                        <label htmlFor="fee2">Departmental fee</label>
                    </div>
                    <input
                        type="radio"
                        id="fee2"
                        name="fee"
                        value="fee2"
                        onChange={handleFeeChange}
                        className=""
                    />
                </div>
                <div
                    className={`flex items-center justify-between border p-4 mb-4 rounded-lg ${selectedFee === 'fee3' ? 'outline outline-1 outline-blue-500' : ''}`}
                >
                    <div className="flex items-center">
                        <img className='inline mr-4' src={img3} alt="Departmental Fee Image" />
                        <label htmlFor="fee3">Faculty fee</label>
                    </div>
                    <input
                        type="radio"
                        id="fee3"
                        name="fee"
                        value="fee3"
                        onChange={handleFeeChange}
                        className=""
                    />
                </div>
            </section>
            <button
                onClick={handleSubmit}
                disabled={isButtonDisabled}
                className={isButtonDisabled ? 'bg-[#B8CFF3] text-[#FAFAFA] py-3 px-[70px] rounded w-full font-bold' : 'bg-[#2B70DB] text-white py-3 px-[70px] rounded w-full font-bold'}
            >
                Make payment now
            </button>
        </div>
    );
};

export default PayBills;