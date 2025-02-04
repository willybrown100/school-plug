/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

// import grayCheckIcon from '../assets/gray.svg';

// import greenCheckIcon from '../assets/green.svg';
import { useLocation, Link } from "react-router-dom"; // Import useNavigate
import { HiArrowLeft } from "react-icons/hi";

// import Modals from "./Modals";
import ConfimPaymentModal from "./ConfimPaymentModal";
import useGetUser from "../hooks/useGetUser";
// import { useMutation } from "@tanstack/react-query";
// import MiniLoader from "../ui/MiniLoader"
// import { studentAddCardDetails } from "../services/contactApi";
// import toast from "react-hot-toast";
import Modals from "./Modals";
// import {studentTicketCardDetails} from "../services/contactApi";
import SmallScreenBillModal from "./SmallScreenBillModal";
// import { formatNaira } from "../utils/dateFormat";
import ConfirmEventPaymentModal from "./ConfirmEventPaymentModal";
import { formatNaira } from "../utils/dateFormat";

const PaymentForm = () => {
  const location = useLocation();

  const { data } = useGetUser();
  console.log(data)
  const [isOpen, ] = useState(false);


 

  const [selectedFee, setSelectedFee] = useState({});
  console.log(selectedFee?.selectedFee?.price);




  // const { mutate, isLoading } = useMutation({
  //   mutationFn: studentAddCardDetails,
  //   onSuccess: () => {
  //     setisOpen(true);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });
  // const { mutate: buyTicket, isLoading: isBuying } = useMutation({
  //   mutationFn: studentTicketCardDetails,
  //   onSuccess: () => {
  //     setisOpen(true);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setErrors({});

  //   const isValidCardNumber = /^\d{16}$/.test(cardNumber.replace(/\s+/g, "")); // 16 digits
  //   const isValidCvv = /^\d{3}$/.test(cvv); // 3 digits
  //   const isValidExpiryDate = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate); // MM/YY format
  //   const isValidCardPin = /^\d{4}$/.test(cardPin); // 4 digits

  //   let formErrors = {};
  //   if (!isValidCardNumber)
  //     formErrors.cardNumber = "Please enter a valid 16-digit card number.";
  //   if (!isValidCvv) formErrors.cvv = "Please enter a valid 3-digit CVV.";
  //   if (!isValidExpiryDate)
  //     formErrors.expiryDate = "Please enter a valid expiry date (MM/YY).";
  //   if (!isValidCardPin) formErrors.cardPin = "Please enter a 4-digit PIN.";

  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //     return;
  //   }

  //   const formData = {
  //     bankName,
  //     cardNumber: cardNumber.replace(/\s+/g, ""),
  //     cvv,
  //     expiryDate,

  //     feeType: "sug",
  //     email,
  //   };
  //   const studentCard = {
  //     bankName,
  //     cardNumber: cardNumber.replace(/\s+/g, ""),
  //     cvv,
  //     expiryDate,

  //     email,
  //   };
  //   console.log(formData);
  //   if (selectedFee?.selectedValue) {
  //     mutate(formData);
  //   } else {
  //     buyTicket(studentCard);
  //     console.log(studentCard);
  //   }
  // };

  useEffect(() => {
    // Parse the query string whenever the location changes
    const params = new URLSearchParams(location.search);
    const selectedOption = params.get("option");

    const selectedContent = selectedOption
      ? JSON.parse(decodeURIComponent(selectedOption))
      : null;

    setSelectedFee(selectedContent);
  }, [location.search]);

  // Format card number in groups of 4 digits
  // const handleCardNumberChange = (e) => {
  //   const formattedNumber = e.target.value
  //     .replace(/\D+/g, "")
  //     .slice(0, 16)
  //     .replace(/(\d{4})(?=\d)/g, "$1 ");
  //   setCardNumber(formattedNumber);
  // };
// const handleCardNumberChange = (e) => {
//   const input = e.target.value.replace(/\D+/g, ""); // Remove non-digit characters
//   const isValidLength = input.length <= 19; // Allow up to 19 digits
//   if (!isValidLength) return; // Ignore further input if it exceeds 19 digits

//   const formattedNumber = input
//     .slice(0, 19) // Limit to a maximum of 19 digits
//     .replace(/(\d{4})(?=\d)/g, "$1 "); // Add a space after every 4 digits

//   setCardNumber(formattedNumber);
// };

  // Auto-add slash in MM/YY for expiry date
  // const handleExpiryDateChange = (e) => {
  //   const input = e.target.value.replace(/\D+/g, ""); // Remove non-digits
  //   if (input.length <= 2) {
  //     setExpiryDate(input); // MM
  //   } else if (input.length <= 4) {
  //     setExpiryDate(`${input.slice(0, 2)}/${input.slice(2, 4)}`); // MM/YY
  //   }
  // };
  const amount = selectedFee?.amount !== undefined
      ? selectedFee.amount
      : selectedFee?.selectedFee?.price !== undefined
      ? selectedFee?.selectedFee?.price
      : null; // Explicitly set null if no valid value is found
console.log(amount)

  return (
    <article className="max-md:bg-white bg-stone-50 p-4 rounded-lg pt-[8rem] min-h-screen  w-full max-sm:pt-[7.5rem] md:pt-[10.8rem] lg:pt-[5.4rem] shadow-md mx-auto  pb-[5rem]">
      <img
        src="\assets\progressbarsvg.svg"
        alt="img"
        className="mb-6 hidden md:block  m-auto lg:hidden md:px-2"
      />
      <h3 className="mb-[2rem] font-semibold mt-[0.6rem] md:hidden  ">
        <Link to="/home/bills">
          <HiArrowLeft className="inline mr-2 text-black" />
        </Link>
        Pay bills
      </h3>
      <img
        src="\images\progressbar2.png"
        alt="img"
        className="mb-6 md:hidden w-full"
      />
      <div
        className={`max-w-[1250px]   md:w-[90vw]  ${
          selectedFee?.selectedFee
            ? "md:grid grid-cols-[1fr]"
            : "md:grid grid-cols-[auto,1fr]"
        }  gap-x-4 md:px-2 m-auto `}
      >
        {selectedFee?.selectedValue && (
          <div className="md:flex hidden bg-whit flex-col mb-4 gap-y-6 ">
            <div className="flex items-center border px-3 p-3 mt-2 w-full rounded-lg outline outline-1 outline-blue-500">
              <img
                src={selectedFee.image}
                alt={selectedFee.selectedValue}
                className="inline mr-4  "
              />
              <div className="flex flex-col mr-3">
                <h3 className="text-[14px] mb-0">
                  {selectedFee.selectedValue}
                </h3>
              </div>
              <input
                type="radio"
                name="selectedFee"
                id="selectedFee"
                checked={true}
                readOnly
                className="ml-auto"
              />{" "}
            </div>
            <input
              type="text"
              value={selectedFee.amount}
              placeholder="enter amount"
              className="w-full p-2 border border-stone-600 rounded-md"
              disabled
            />
            <OpenModal
              selectedFee={selectedFee}
              setSelectedFee={setSelectedFee}
            />
          </div>
        )}
        <form>
          {selectedFee?.selectedFee && (
            <h2 className="text-[16px] font-semibold text-secondary600 mb-6">
              Event ticket purschase
            </h2>
          )}
          <h2 className="text-[16px] mb-6 font-semibold">paying from wallet</h2>

          <div className="border border-secondary500 mb-8 items-center rounded-lg p-3 flex justify-between">
            <div>
              <p className="mb-0 text-[1rem] tracking-wide">Wallet Bal.</p>
              <h4 className="mb-0 font-semibold">0.00</h4>
            </div>
            <Link
              to="/home/virtualacct"
              className="bg-secondary600 p-3 text-white flex px-6 rounded-full gap-x-2 items-center"
            >
              <p className="mb-0 text-[0.8rem] text-white font-semibold capitalize">
                add funds
              </p>
              <img
                src="\images\solar_card-send-outline.png "
                alt=""
                className="font-semibold"
              />
            </Link>
          </div>
          <div className="border border-stone-400 md:hidden mb-6 w-full"></div>
          {selectedFee?.selectedValue && (
            <div className="flex flex-col md:hidden  gap-y-6 ">
              <p className="mb-0 capitalize font-semibold">bill type</p>
              <div className="flex items-center border px-3 p-3  w-full rounded-lg outline outline-1 outline-blue-500">
                <img
                  src={selectedFee.image}
                  alt={selectedFee.selectedValue}
                  className="inline mr-4  "
                />
                <div className="flex flex-col mr-3">
                  <h3 className="text-[14px] mb-0">
                    {selectedFee.selectedValue}
                  </h3>
                </div>
                <input
                  type="radio"
                  name="selectedFee"
                  id="selectedFee"
                  checked={true}
                  readOnly
                  className="ml-auto"
                />{" "}
              </div>
              <input
                type="text"
                value={formatNaira(selectedFee?.amount)}
                placeholder="enter amount"
                className="w-full p-2 border border-stone-600 rounded-md"
                disabled
              />
              <OpenModal
                selectedFee={selectedFee}
                setSelectedFee={setSelectedFee}
              />
            </div>
          )}

          {/* Continue Button */}
          <div className="md:flex lg:hidden md:justify-end md:mt-6"></div>
        </form>
        {isOpen && selectedFee?.amount && (
          <ConfimPaymentModal
            selectedFee={selectedFee}
            selectedAmount={selectedFee.amount}
            feeType={selectedFee.selectedValue}
          />
        )}
        {isOpen && selectedFee?.selectedFee?.price && (
          <ConfirmEventPaymentModal selectedFee={selectedFee} />
        )}
      </div>
      <div className="bg-secondary600 hidden p-4 lg:flex absolute bottom-0 right-0 left-0 justify-center  ">
        <p className="text-white capitalize mb-0 font-heading font-semibold">
          all copyright reserved @schoolplug
        </p>
      </div>
    </article>
  );
};

export default PaymentForm;
function OpenModal({ selectedFee, setSelectedFee }) {
  return (
    <Modals>
      <Modals.Open opens="bill">
        <button
          type="button"
          className=" rounded-md capitalize bg-secondary600 p-2 text-white"
        >
          switch bill type
        </button>
      </Modals.Open>
      <Modals.Window name="bill">
        <SmallScreenBillModal
          selectedFee={selectedFee}
          setSelectedFee={setSelectedFee}
        />
      </Modals.Window>
    </Modals>
  );
}
