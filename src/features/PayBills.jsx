import React, { useState } from 'react';
import { HiArrowLeft } from "react-icons/hi";
import img1 from "../../public/assets/bill.svg";
import img2 from "../../public/assets/teacher.svg";

import img3 from '../../public/assets/book.svg';

import { Link} from 'react-router-dom';



const PayBills = () => {
  const [active,setActive]=useState(null)
    const [selectedFee, setSelectedFee] = useState("");
  
    const [selectedContent, setSelectedContent] = useState("");

    console.log(selectedContent);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
 

 
 const handleChange = function (e) {
 const selectedValue = e.target.value

     const selectedPayment = payment.find(
       (item) => item.Element.props.value === selectedValue
     );
     if(selectedPayment){
      setSelectedFee(selectedValue);
    
      setSelectedContent({ selectedValue ,image:selectedPayment.image});
     }
console.log(selectedPayment)

   setIsButtonDisabled(false);
 };
 const queryString = encodeURIComponent(JSON.stringify(selectedContent));
    const payment = [
      {
        image: img1,
        name: "sug fee",
        Element: (
          <input
            type="radio"
            onChange={handleChange}
            value="sugFee"
            checked={selectedFee === "sugFee"}
          />
        ),
      },
      {
        image: img2,
        name: "departmental fee",
        Element: (
          <input
            type="radio"
            disabled
            onChange={handleChange}
            value="departmentalfee"
            checked={selectedFee === "departmentalfee"}
          />
        ),
      },
      {
        image: img3,
        name: "faculty fee",
        Element: (
          <input
            type="radio"
            disabled
            onChange={handleChange}
            value="facultyFee"
            checked={selectedFee === "facultyFee"}
          />
        ),
      },
    ];



   

      const handleClick = function (i) {
        setActive(i);
      };

    return (
      <article className="min-h-screen w-full lg:hidden max-sm:pt-[7.5rem] md:pt-[9.8rem] lg:pt-[5.4rem] bg-stone-50  pb-[6rem]">
        <div className="font-Inter container   mx-auto p-3 w-full ">
          <h3 className="mb-[3rem] md:hidden font-semibold mt-[0.6rem] ">
            <Link to="/">
              <HiArrowLeft className="inline mr-2 text-black" />
            </Link>
            Pay bills
          </h3>
          <section className="mb-[3rem] md:bg-white p-2">
            <p className="text-[#0E2750] max-sm:text-[14px] md:text-[1.1rem]">
              Select a bill you want to pay then proceed to making payment
            </p>
            <ul className="flex flex-col gap-y-3">
              {payment.map((item, i) => (
                <li
                  key={i}
                  className={`${
                    active === i
                      ? "border border-secondary500"
                      : "max-md:border max-md:border-stone-600"
                  } flex p-3  gap-x-5 items-center rounded-lg`}
                >
                  <img src={item.image} alt="i" />
                  {/* <div className='flex justify-between items-center'> */}

                  <span
                    className={`${
                      active === i ? " text-secondary600" : ""
                    } capitalize`}
                  >
                    {item.name}
                  </span>
                  <div className="ml-auto " onClick={() => handleClick(i)}>
                    {item.Element}
                  </div>
                  {/* </div> */}
                </li>
              ))}
            </ul>
          </section>
          <div className="md:flex md:justify-end">
            {/* <Link
            to={`/home/payment-form?option=${queryString}`}
            disabled={isButtonDisabled}
            className={
              isButtonDisabled
              ? "bg-[#B8CFF3] text-[#FAFAFA] max-md:grid grid-cols-1 hover:text-stone-100 text-center py-3 px-[70px] rounded  font-bold"
              : "bg-[#2B70DB] text-white py-3 grid text-center grid-cols-1 hover:text-stone-100 px-[70px] rounded  font-bold"
            }
            >
            Make payment now
          </Link> */}
            <Link
              to={
                isButtonDisabled
                  ? "#"
                  : `/home/payment-form?option=${queryString}`
              }
              onClick={(e) => {
                if (isButtonDisabled) {
                  e.preventDefault();
                }
              }}
              className={
                isButtonDisabled
                  ? "bg-[#B8CFF3] text-[#FAFAFA] grid grid-cols-1 hover:text-stone-100 text-center py-3 rounded font-bold cursor-not-allowed"
                  : "bg-[#2B70DB] text-white py-3 grid text-center grid-cols-1 hover:text-stone-100 rounded font-bold"
              }
              aria-disabled={isButtonDisabled}
            >
              Make payment now
            </Link>
          </div>
        </div>
      </article>
    );
};

export default PayBills;
