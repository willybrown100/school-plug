// FeeSwitchModal.js
import React from 'react';

const FeeSwitchModal = ({ isOpen, onClose, onSwitch, currentFee }) => {
    const fees = {
        'SUG fee': { name: 'SUG fee', amount: 'N1000' },
        'Departmental fee': { name: 'Departmental fee', amount: 'N1000' },
        'Faculty fee': { name: 'Faculty fee', amount: 'N1000' },
    };

    const handleFeeSelect = (fee) => {
        onSwitch(fee);
        onClose(); // Close the modal after switching
    };

    if (!isOpen) return null; // Don't render if modal is not open

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">Switch Fee</h2>
                <div>
                    {Object.values(fees).map((fee, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border-b">
                            <div>
                                <p>{fee.name}</p>
                                <p className="font-bold">{fee.amount}</p>
                            </div>
                            <button onClick={() => handleFeeSelect(fee)} className="text-blue-500">
                                Switch
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="mt-4 bg-gray-300 py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default FeeSwitchModal;
