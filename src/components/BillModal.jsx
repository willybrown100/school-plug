import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Button from '../ui/Button';
import { ModalContext } from './Modals';

export default function BillModal() {
  const modalRef = useRef()
  const { close } = useContext(ModalContext);
  const [searchParams,setSearchParams]=useSearchParams("")
  
  const [active,setActive]=useState(null)
  const [selectedOption, setSelectedOption] = useState( "");

  console.log(searchParams);
  console.log(selectedOption);
   const handleClick = function (i) {
     setActive(i);
   };
     const handleChange = function (e) {
      const newOption = e.target.value
       setSelectedOption(newOption);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("option", newOption); // Set the new option
      setSearchParams(newSearchParams); 
     };
   const payment = [
     {
       name: "sug fee",
       Element: (
         <input
           type="radio"
           onChange={handleChange}
           value="sugFee"
           checked={selectedOption === "sugFee"}
         />
       ),
     },
     {
       name: "departmental fee",
       Element: (
         <input
           type="radio"
           onChange={handleChange}
           value="departmentalfee"
           checked={selectedOption === "departmentalfee"}
         />
       ),
     },
     {
       name: "faculty fee",
       Element: (
         <input
           type="radio"
           onChange={handleChange}
           value="facultyFee"
           checked={selectedOption === "facultyFee"}
         />
       ),
     },
   ];

 
     const handleClose = function (e) {
      console.log(e,modalRef.current) 
       if (modalRef.current && !modalRef.current.contains(e.target)) {
         close();
       }
     };
     
 

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm grid place-items-center"
      onClick={handleClose}
    >
      <div ref={modalRef} className="  bg-white p-[3rem] rounded-md">
        <h4 className="font-semibold font-heading capitalize">
          switch bill type
        </h4>
        <p className="text-sm">
          Select a bill you want to pay then proceed to making payment.
        </p>

        <ul className="flex flex-col gap-y-3">
          {payment.map((item, i) => (
            <li
              key={i}
              className={`${
                active === i
                  ? "border border-secondary500"
                  : "border border-stone-600"
              } flex p-3 justify-between gap-x-5 items-center rounded-lg`}
            >
              <span
                className={`${
                  active === i ? " text-secondary600" : ""
                } capitalize`}
              >
                {item.name}
              </span>
              <div onClick={() => handleClick(i)}>{item.Element}</div>
            </li>
          ))}
          <Button className="w-full text-center font-semibold font-heading">
            continue
          </Button>
        </ul>
      </div>
    </div>
  );
}
