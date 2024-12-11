/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import grayCheckIcon from "../../public/assets/gray.svg";
// import grayCheckIcon from '../assets/gray.svg';
import greenCheckIcon from "../../public/assets/green.svg";
// import greenCheckIcon from '../assets/green.svg';
import { useLocation, Link } from "react-router-dom"; // Import useNavigate
import { HiArrowLeft } from "react-icons/hi";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// import Modals from "./Modals";
import ConfimPaymentModal from "./ConfimPaymentModal";
import useGetUser from "../hooks/useGetUser";
import { useMutation } from "@tanstack/react-query";
import MiniLoader from "../ui/MiniLoader"
import { studentAddCardDetails } from "../services/contactApi";
import toast from "react-hot-toast";
import Modals from "./Modals";
import SmallScreenBillModal from "./SmallScreenBillModal";
import { formatNaira } from "../utils/dateFormat";

const PaymentForm = () => {
  const location = useLocation();

    const { data } = useGetUser();
    const [isOpen,setisOpen]=useState(false)
    const email = data?.user?.email
 
  
  const [bankName, setBankName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardPin, setCardPin] = useState("");
 
  const [showPin, setShowPin] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({}); 
const [selectedFee, setSelectedFee] = useState({});
console.log(selectedFee);
  const isBankNameFilled = bankName.length > 0;
  const isCardNumberFilled = cardNumber.length > 0;
  const isCvvFilled = cvv.length === 3; // Limit to exactly 3 digits
  const isExpiryDateFilled = expiryDate.length === 5; // Format MM/YY
  const isCardPinFilled = cardPin.length === 4; // 4-digit PIN

  useEffect(() => {
    setIsButtonDisabled(
      !(
        isBankNameFilled &&
        isCardNumberFilled &&
        isCvvFilled &&
        isExpiryDateFilled &&
        isCardPinFilled
      )
    );
  }, [
    bankName,
    cardNumber,
    cvv,
    expiryDate,
    cardPin,
    isCardNumberFilled,
    isBankNameFilled,
  ]);

    const { mutate, isLoading } = useMutation({
      mutationFn: studentAddCardDetails,
      onSuccess: () => {
      setisOpen(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    const isValidCardNumber = /^\d{16}$/.test(cardNumber.replace(/\s+/g, "")); // 16 digits
    const isValidCvv = /^\d{3}$/.test(cvv); // 3 digits
    const isValidExpiryDate = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate); // MM/YY format
    const isValidCardPin = /^\d{4}$/.test(cardPin); // 4 digits

    let formErrors = {};
    if (!isValidCardNumber)
      formErrors.cardNumber = "Please enter a valid 16-digit card number.";
    if (!isValidCvv) formErrors.cvv = "Please enter a valid 3-digit CVV.";
    if (!isValidExpiryDate)
      formErrors.expiryDate = "Please enter a valid expiry date (MM/YY).";
    if (!isValidCardPin) formErrors.cardPin = "Please enter a 4-digit PIN.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = {
      bankName,
      cardNumber: cardNumber.replace(/\s+/g, ""), 
      cvv,
      expiryDate,
 
      feeType:"sug",
      email
    };

    console.log(formData);
mutate(formData)
  };

  
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
  const handleCardNumberChange = (e) => {
    const formattedNumber = e.target.value
      .replace(/\D+/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedNumber);
  };

  // Auto-add slash in MM/YY for expiry date
  const handleExpiryDateChange = (e) => {
    const input = e.target.value.replace(/\D+/g, ""); // Remove non-digits
    if (input.length <= 2) {
      setExpiryDate(input); // MM
    } else if (input.length <= 4) {
      setExpiryDate(`${input.slice(0, 2)}/${input.slice(2, 4)}`); // MM/YY
    }
  };

  return (
    <article className="max-md:bg-white bg-stone-50 p-4 rounded-lg pt-[8rem] min-h-screen  w-full max-sm:pt-[7.5rem] md:pt-[10.8rem] lg:pt-[5.4rem] shadow-md mx-auto  pb-[5rem]">
      <img
        src="\assets\progressbarsvg.svg"
        alt="img"
        className="mb-6 hidden md:block w-[90vw] m-auto lg:hidden md:px-2"
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
        className="mb-6 md:hidden"
      />
      <div className="max-w-[1250px]   md:w-[90vw]   md:grid grid-cols-[auto,1fr] gap-x-4 md:px-2 m-auto ">
        {selectedFee?.selectedValue ? (
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
        ) : (
          <p>No fee selected</p>
        )}
        <form onSubmit={handleSubmit}>
          <h2 className="text-[16px] mb-6">Add debit card</h2>
          {/* Bank Name Input */}
          <div className="lg:grid lg:grid-cols-2 gap-x-2 bg-white p-2 rounded-lg">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={isBankNameFilled ? greenCheckIcon : grayCheckIcon}
                  alt="Checkmark"
                  className="w-6 h-6"
                />
                <label htmlFor="bankName" className="font-bold text-[16px]">
                  1. Bank name
                </label>
              </div>
              <input
                type="text"
                id="bankName"
                className="border border-gray-300 p-3 rounded-lg w-full mb-4"
                placeholder="Enter bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            {/* Card Number Input */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={isCardNumberFilled ? greenCheckIcon : grayCheckIcon}
                  alt="Checkmark"
                  className="w-6 h-6"
                />
                <label htmlFor="cardNumber" className="font-bold text-[16px]">
                  2. Card number
                </label>
              </div>
              <input
                type="text"
                id="cardNumber"
                className="border border-gray-300 p-3 rounded-lg w-full mb-1"
                placeholder="#### #### #### ####"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
            </div>
          </div>
          {/* CVV Input */}
          <div className="lg:grid lg:grid-cols-2 gap-x-2 bg-white p-2 rounded-lg mt-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={isCvvFilled ? greenCheckIcon : grayCheckIcon}
                  alt="Checkmark"
                  className="w-6 h-6"
                />
                <label htmlFor="cvv" className="font-bold text-[16px]">
                  3. CVV
                </label>
              </div>
              <input
                type="number"
                id="cvv"
                className="border border-gray-300 p-3 rounded-lg w-full mb-1"
                placeholder="Enter 3-digit CVV"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv}</p>
              )}

              {/* Expiry Date */}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={isExpiryDateFilled ? greenCheckIcon : grayCheckIcon}
                  alt="Checkmark"
                  className="w-6 h-6"
                />
                <label htmlFor="expiryDate" className="font-bold text-[16px]">
                  4. Expiry date (MM/YY)
                </label>
              </div>
              <input
                type="text"
                id="expiryDate"
                className="border border-gray-300 p-3 rounded-lg w-full mb-1"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                maxLength="5" // Limit to MM/YY format
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">{errors.expiryDate}</p>
              )}
            </div>
          </div>
          {/* Card Pin with visibility toggle */}
          <div className="lg:grid lg:grid-cols-2 gap-x-2 bg-white p-2 rounded-lg mt-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={isCardPinFilled ? greenCheckIcon : grayCheckIcon}
                  alt="Checkmark"
                  className="w-6 h-6"
                />
                <label htmlFor="cardPin" className="font-bold text-[16px]">
                  5. Card PIN
                </label>
              </div>
              <div className="relative mb-1">
                <input
                  type={showPin ? "text" : "password"} // Toggle between text and password
                  id="cardPin"
                  className="border border-gray-300 p-3 rounded-lg w-full"
                  placeholder="Enter your card PIN"
                  maxLength="4"
                  value={cardPin}
                  onChange={(e) => setCardPin(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPin ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
              {errors.cardPin && (
                <p className="text-red-500 text-sm">{errors.cardPin}</p>
              )}
            </div>

            <div className="lg:flex hidden mb-3 justify-end items-end">
              <button
                disabled={isButtonDisabled}
                className={
                  isButtonDisabled
                    ? "bg-[#B8CFF3]  text-[#FAFAFA]  py-3 px-[70px] rounded  font-bold"
                    : "bg-[#2B70DB]  text-white py-3 px-[70px] rounded  font-bold"
                }
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <MiniLoader />
                  </div>
                ) : !isButtonDisabled ? (
                  <span className="capitalize">
                    pay {formatNaira(selectedFee.amount)} now
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
          {/* Selected Fee Section */}
          {selectedFee?.selectedValue ? (
            <div className="flex flex-col md:hidden mb-4 gap-y-6 ">
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
          ) : (
            <p>No fee selected</p>
          )}

          {/* Continue Button */}
          <div className="md:flex lg:hidden md:justify-end md:mt-6">
            <button
              disabled={isButtonDisabled}
              className={
                isButtonDisabled
                  ? "bg-[#B8CFF3] md:w-[70%] text-[#FAFAFA]  py-3 px-[70px] rounded w-full font-bold"
                  : "bg-[#2B70DB] md:w-[70%] text-white py-3 px-[70px] rounded w-full font-bold"
              }
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <MiniLoader />
                </div>
              ) : !isButtonDisabled ? (
                <span className="capitalize">
                  pay {formatNaira(selectedFee.amount)} now
                </span>
              ) : (
                "Continue"
              )}
            </button>
          </div>
          {isOpen && (
            <ConfimPaymentModal
              selectedAmount={selectedFee.amount}
              feeType={selectedFee.selectedValue}
            />
          )}
        </form>
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
