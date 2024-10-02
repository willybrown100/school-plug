
// import React, { useContext, useState } from "react";
// // import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
// import Select from "react-select"
// // import { DateContext, DateProvider } from "../../DateContext";
// import DatePicker from "react-datepicker";





// const CustomHeader = ({ date, changeYear, changeMonth }) => {
//   const years = Array.from({ length: 100 }, (_, i) => i + 1920);
//   const months = Array.from({ length: 12 }, (_, i) =>
//     new Date(0, i).toLocaleString("default", { month: "long" })
//   );

// const options = Array.from(years,item=>({value:item,label:item}))


//   return (
//     <div className="custom-header">
//       <Select
//         value={date.getFullYear()}
//         // styles={}
//         options={options}
//         className="text-black"
//         onChange={({ target: { value } }) => changeYear(value)}
//       />

//       <select
//         value={date.getMonth()}
//         onChange={({ target: { value } }) => changeMonth(value)}
//       >
//         {months.map((month, index) => (
//           <option key={index} value={index}>
//             {month}
//           </option>
//         ))}
//       </select>
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




import React, { useContext, useState } from "react";
import {components} from "react-select"
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiChevronDown } from "react-icons/hi2";
import { DateContext } from "../../DateContext";
import { formatDate } from "../../utils/dateFormat";

// Example options for react-select
const monthOptions = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
];

const yearOptions = Array.from({ length: 101 }, (_, i) => {
  const year = new Date().getFullYear() - 50 + i;
  return { value: year, label: year.toString() };
});

const CustomHeader = ({ date, changeMonth, changeYear }) => {
  const handleMonthChange = (selectedOption) => {
    changeMonth(selectedOption.value);
  };

  const handleYearChange = (selectedOption) => {
    changeYear(selectedOption.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <Select
        defaultValue={{
          value: date.getFullYear(),
          label: date.getFullYear().toString(),
        }}
        options={yearOptions}
        onChange={handleYearChange}
        styles={customStyles}
        components={{DropdownIndicator}}
        />
      <Select
        defaultValue={monthOptions[date.getMonth()]}
        options={monthOptions}
        onChange={handleMonthChange}
        styles={customStyles}
        components={{DropdownIndicator}}
      />
    </div>
  );
};

const CustomDatePicker = ({placeholder }) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const { selectedDate, setSelectedDate } = useContext(DateContext);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date)
  };

  return (
    <>
      <DatePicker
        value={formatDate(selectedDate) || null}
        placeholderText={placeholder}
        onChange={handleDateChange}
        required
        // {icon}
        className=" w-full outline-none bg-transparent  placeholder:capitalize placeholder:pl-6 relative  p-[7px]  rounded-md"
        renderCustomHeader={({
          date,
          changeMonth,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CustomHeader
            date={date}
            changeMonth={changeMonth}
            changeYear={changeYear}
          />
        )}
      />
    </>
  );
};

export default CustomDatePicker;


export const CustomDatePicker2 = ({placeholder }) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const { selectedDate2, setSelectedDate2 } = useContext(DateContext);

  const handleDateChange = (date) => {
    setSelectedDate2(date);
    console.log(date)
  };

  return (
    <>
      <DatePicker
        value={formatDate(selectedDate2) || null}
        placeholderText={placeholder}
        onChange={handleDateChange}
        // {icon}
        className=" w-full bg-transparent outline-none placeholder:capitalize placeholder:pl-6 relative p-[7px]  "
        renderCustomHeader={({
          date,
          changeMonth,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CustomHeader
            date={date}
            changeMonth={changeMonth}
            changeYear={changeYear}
          />
        )}
      />
    </>
  );
};





const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div
        style={{
          transform: props.selectProps.menuIsOpen
            ? "rotate(180deg)"
            : "rotate(0deg)",
        }}
      >
        <HiChevronDown className="text-secondary700 text-lg font-semibold" />
      </div>
    </components.DropdownIndicator>
  );
};


// Custom styles for react-select
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#fff",
    border: "none",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "#fff",
    borderRadius: "7px",
    marginTop: 0,
    borderColor: 0,
    // border:"none",
    border: state.isSelected ? "red" : "none",
    // width: "60px",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
    border: state.isSelected ? "red" : "none",
    border: "none",
    maxHeight: "190px",
    overflow: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
      ? "#e9ecef"
      : "#fff",
    color: state.isSelected ? "#fff" : "#000",
    padding: "10px 20px",

    "&:hover": {
      backgroundColor: state.isSelected ? "#0056b3" : "#e9ecef",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    // color: "#6c757d",
  }),
  singleValue: (provided) => ({
    ...provided,
    // color: "#495057",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    // color: '#495057',
    padding: 0,
    border: "none",
  }),
};



