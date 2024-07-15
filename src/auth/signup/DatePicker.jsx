import React from 'react'

// export default function DatePicker() {
//   return (
//     <div>DatePicker</div>
//   )
// }


import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="custom-datepicker">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        calendarClassName="bg-white border border-gray-300 rounded-md shadow-lg"
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        showFourColumnMonthYearPicker
      />
    </div>
  );
};

export default CustomDatePicker;