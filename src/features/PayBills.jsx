import React, { useState } from 'react';
import { HiArrowLeft } from "react-icons/hi";
import img1 from '../assets/bill.svg';
import img2 from '../assets/teacher.svg';
import img3 from '../assets/book.svg';
import { Link, useNavigate } from 'react-router-dom';

const PayBills = () => {
    const [selectedFee, setSelectedFee] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    const fees = {
        'SUG fee': { name: 'SUG fee', image: img1, amount: 'N1000' },
        'Departmental fee': { name: 'Departmental fee', image: img2, amount: 'N1000' },
        'Faculty fee': { name: 'Faculty fee', image: img3, amount: 'N1000' },
    };

    const handleFeeChange = (event) => {
        const feeId = event.target.value;
        setSelectedFee(fees[feeId]);
        setIsButtonDisabled(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/home/payment-form', { state: { selectedFee } });
    };

    return (
        <div className='font-Inter container mx-auto p-3 md:w-1/2 h-[90vh] pb-[5rem]'>
            <h3 className='mb-[3rem] mt-[0.6rem] '>
                <Link to='/'>
                    <HiArrowLeft className='inline mr-2 text-black' />
                </Link>
                Pay bills
            </h3>
            <section className='mb-[3rem]'>
                <p className='text-[#0E2750] text-[14px]'>
                    Select a bill you want to pay then proceed to making payment
                </p>
                {Object.keys(fees).map((feeKey, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between border px-3 mb-4 rounded-lg ${selectedFee?.name === fees[feeKey].name ? 'outline outline-1 outline-blue-500' : ''}`}
                    >
                        <div className="flex items-center">
                            <img className='inline mr-4 ' src={fees[feeKey].image} alt={`${fees[feeKey].name} Image`} />
                            <div className='flex flex-col mt-3'>
                                <label htmlFor={`fee${index}`}>{fees[feeKey].name}</label>
                                <p className='font-bold'>{fees[feeKey].amount}</p>
                            </div>
                        </div>
                        <input
                            type="radio"
                            id={`fee${index}`}
                            name="fee"
                            value={feeKey}
                            onChange={handleFeeChange}
                        />
                    </div>
                ))}
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
