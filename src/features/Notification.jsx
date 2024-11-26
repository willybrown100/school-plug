import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Notification() {
  const navigate = useNavigate()
  const handleClick = function () {
    navigate(-1);
  };
  return (
    <div className="bg-white min-h-screen pt-2 px-3">
      <div className="flex gap-x-2 items-center mb-5">
        <button onClick={handleClick} className="bg-transparent">
          <img src="\assets\arrow-left.svg" alt="icon" />
        </button>
        <p className="mb-0 font-semibold capitalize">notification</p>
      </div>
    </div>
  );
}
