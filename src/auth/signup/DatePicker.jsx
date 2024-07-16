





// const CustomHeader = ({
//   date,
//   changeYear,
//   changeMonth,
//   decreaseMonth,
//   increaseMonth,
//   prevMonthButtonDisabled,
//   nextMonthButtonDisabled,
// }) => {
//   const years = Array.from({ length: 100 }, (_, i) => i + 1920);
//   const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' }));

//   return (
//     <div className="custom-header">
//       <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
//         {"<"}
//       </button>
//       <select value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
//         {years.map((year) => (
//           <option key={year} value={year}>
//             {year}
//           </option>
//         ))}
//       </select>
//       <select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(value)}>
//         {months.map((month, index) => (
//           <option key={index} value={index}>
//             {month}
//           </option>
//         ))}
//       </select>
//       <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
//         {">"}
//       </button>
//     </div>
//   );
// };

// const CustomDatePicker = () => {
//   const [startDate, setStartDate] = useState(new Date());

//   return (
//     <DatePicker
//       selected={startDate}
//       onChange={(date) => setStartDate(date)}
//       renderCustomHeader={(props) => <CustomHeader {...props} />}
//       className="custom-date-picker"
//     />
//   );
// };

// export default CustomDatePicker;



import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CustomHeader = ({ date, changeYear, changeMonth }) => {
  const years = Array.from({ length: 100 }, (_, i) => i + 1970);
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "short" })
  );

  return (
    <div className="custom-header">
      <select
        className="text-black border-transparent  bg-white font-semibold text-lg"
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        className="monthSelect bg-secondary400 text-[0.5rem]"
        value={date.getMonth()}
        onChange={({ target: { value } }) => changeMonth(value)}
      >
        {months.map((month, index) => (
          <option key={index} value={index} className="text-black">
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      renderCustomHeader={(props) => <CustomHeader {...props} />}
      className="custom-date-picker w-full  md:p-2 border border-stone-700 p-3 rounded-md"
    />
  );
};

export default CustomDatePicker;


