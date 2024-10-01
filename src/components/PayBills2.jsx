import React, { useState } from 'react';

const PayBills2 = () => {
    const [selectedFee, setSelectedFee] = useState('SUG fee');

    const handleFeeChange = (event) => {
        setSelectedFee(event.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Student Information</h2>
                {/* First Name */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">1. First name</label>
                    <input
                        type="text"
                        placeholder="enter your first name"
                        className="w-full border p-2 rounded-lg"
                    />
                </div>
                {/* Last Name */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">2. Last name</label>
                    <input
                        type="text"
                        placeholder="enter your last name"
                        className="w-full border p-2 rounded-lg"
                    />
                </div>
                {/* Department */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">3. Department</label>
                    <input
                        type="text"
                        placeholder="enter your department"
                        className="w-full border p-2 rounded-lg"
                    />
                </div>
                {/* Registration Number */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">4. Reg No.</label>
                    <input
                        type="text"
                        placeholder="enter your reg no."
                        className="w-full border p-2 rounded-lg"
                    />
                </div>
                {/* Academic Level */}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">5. Academic level</label>
                    <select className="w-full border p-2 rounded-lg">
                        <option>Select level</option>
                        <option>100 Level</option>
                        <option>200 Level</option>
                        <option>300 Level</option>
                        <option>400 Level</option>
                    </select>
                </div>
            </div>

            {/* Bill Type Section */}
            <div className="bg-white p-4 border rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-2">Bill type</h3>
                <div className="flex justify-between items-center p-4 border rounded-lg mb-2">
                    <div className="flex items-center">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="bill type icon"
                            className="inline mr-4"
                        />
                        <div className="flex flex-col">
                            <label>SUG fee</label>
                            <p className="text-gray-500">₦1,000</p>
                        </div>
                    </div>
                    <input
                        type="radio"
                        id="fee1"
                        name="fee"
                        value="SUG fee"
                        checked={selectedFee === 'SUG fee'}
                        onChange={handleFeeChange}
                        className="ml-4"
                    />
                </div>

                {/* Button for Switching Bill Type */}
                <button className="bg-blue-500 text-white p-2 rounded-lg">
                    Switch bill type
                </button>
            </div>
        </div>
    );
};

export default PayBills2;
