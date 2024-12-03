import  { useEffect, useRef } from 'react';
import React, {  useState } from 'react'
import NavLinks from './NavLinks';
import { Link, useLocation } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';


export default function Footer() {

  //  
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0); // Use useRef to persist the value across renders

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop < lastScrollTop.current) {
        // Scrolling up
        setIsVisible(true);
      } else {
        // Scrolling down
        setIsVisible(false);
      }

      lastScrollTop.current = scrollTop; // Update the ref value
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // No need to include lastScrollTop in dependencies since it's a ref


  const { pathname } = useLocation();


  const links = [
    {
      name: (
        <span
          className={`${
            pathname === "/home/homePage/feed" ||
            pathname === "/home/homePage/billz"
              ? "text-secondary600"
              : "text-black"
          }`}
        >
          home
        </span>
      ),
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.66536 11H7.33203C6.7787 11 6.33203 11.4467 6.33203 12V14.3333H9.66536V12C9.66536 11.4467 9.2187 11 8.66536 11Z"
            stroke="#51526C"
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            className={`${
              pathname === "/home/homePage/feed" ||
              pathname === "/home/homePage/billz"
                ? "home"
                : "black"
            }`}
          />
          <path
            d="M6.71416 1.87998L2.09416 5.57998C1.57416 5.99331 1.24083 6.86665 1.35416 7.51998L2.24083 12.8266C2.40083 13.7733 3.30749 14.54 4.26749 14.54H11.7342C12.6875 14.54 13.6008 13.7666 13.7608 12.8266L14.6475 7.51998C14.7542 6.86665 14.4208 5.99331 13.9075 5.57998L9.28749 1.88665C8.57416 1.31331 7.42083 1.31331 6.71416 1.87998Z"
            stroke="#51526C"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/home/homePage/feed" ||
              pathname === "/home/homePage/billz"
                ? "home"
                : "black"
            }`}
          />
        </svg>
      ),
      path: "/home/homePage/feed",
    },

    {
      name: (
        <span
          className={`lg:hidden ${
            pathname === "/home/bills" ||
            pathname === "/home/payment-form" ||
            pathname === "/home/card-form"
              ? "text-secondary600"
              : "black"
          }`}
        >
          pay bills
        </span>
      ),
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="lg:hidden"
        >
          <rect width="24" height="24" fill="white" />
          <path
            d="M3.66992 2.5V14.47C3.66992 15.45 4.12992 16.38 4.91992 16.97L10.1299 20.87C11.2399 21.7 12.7699 21.7 13.8799 20.87L19.0899 16.97C19.8799 16.38 20.3399 15.45 20.3399 14.47V2.5H3.66992Z"
            stroke="#565656"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            className={`${
              pathname === "/home/bills" || pathname === "/home/payment-form"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M2 2.5H22"
            stroke="#565656"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            className={`${
              pathname === "/home/bills" ||
              pathname === "/home/payment-form" ||
              pathname === "/home/card-form"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M8 8H16"
            stroke="#565656"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/home/bills" ||
              pathname === "/home/payment-form" ||
              pathname === "/home/card-form"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M8 13H16"
            stroke="#565656"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/home/bills" ||
              pathname === "/home/payment-form" ||
              pathname === "/home/card-form"
                ? "pz"
                : "black"
            } `}
          />
        </svg>
      ),
      path: "/home/bills",
    },

    {
      name: "events",
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <rect
            width="24"
            height="24"
            transform="translate(0.5)"
            fill="white"
          />
          <path
            d="M8.5 2V5"
            stroke="#565656"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M16.5 2V5"
            stroke="#565656"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M4 9.09009H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M21.5 8.5V17C21.5 20 20 22 16.5 22H8.5C5 22 3.5 20 3.5 17V8.5C3.5 5.5 5 3.5 8.5 3.5H16.5C20 3.5 21.5 5.5 21.5 8.5Z"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M16.1947 13.7H16.2037"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M16.1947 16.7H16.2037"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M12.4955 13.7H12.5045"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M12.4955 16.7H12.5045"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M8.79431 13.7H8.80329"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
          <path
            d="M8.79431 16.7H8.80329"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/events" ? "pz" : "black"}`}
          />
        </svg>
      ),
      path: "/home/events",
    },
    // {
    //   name: "materials",
    //   icon: (
    //     <svg
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
    //         stroke="#565656"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className={`${pathname === "/home/materials" ? "pz" : "black"}`}
    //       />
    //       <path
    //         d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z"
    //         stroke="#565656"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className={`${pathname === "/home/materials" ? "pz" : "black"}`}
    //       />
    //       <path
    //         d="M12.6396 8.53003L17.4896 9.76003"
    //         stroke="#292D32"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className={`${pathname === "/home/materials" ? "pz" : "black"}`}
    //       />
    //       <path
    //         d="M11.6602 12.3999L14.5602 13.1399"
    //         stroke="#292D32"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className={`${pathname === "/home/materials" ? "pz" : "black"}`}
    //       />
    //     </svg>
    //   ),

    //   path: "/home/material",
    // },
    {
      name: "trends",
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="24"
            height="24"
            transform="translate(0.5)"
            fill="white"
          />
          <path
            d="M17 9.5L12.8 13.7L11.2 11.3L8 14.5"
            stroke="#565656"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/trends" ? "pz" : "black"}`}
          />
          <path
            d="M15 9.5H17V11.5"
            stroke="#565656"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/trends" ? "pz" : "black"}`}
          />
          <path
            d="M9.5 22H15.5C20.5 22 22.5 20 22.5 15V9C22.5 4 20.5 2 15.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22Z"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathname === "/home/trends" ? "pz" : "black"}`}
          />
        </svg>
      ),
      path: "/home/trends",
    },
  ];
  const [isOpen, setOpen] = useState(false);
  const handleClick = function () {
    setOpen((isOpen) => !isOpen);
  };
  const handleClose = function () {
    setOpen(false);
  };
  return (
    <div className=" ">
      {/* Bottom navigation */}
      <div
        className={` p-2 fixed bottom-0 w-full transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } bg-white shadow-md md:hidden `}
      >
        <ul className="flex justify-between items-center gap-x-2">
          {links.map((item, i) => (
            <NavLinks item={item} key={i} />
          ))}
        </ul>

        {/* Post button with the highest z-index */}
        {isOpen ? (
          <p></p>
        ) : (
          <>
            {(pathname === "/home/homePage/feed" ||
              pathname === "/home/trends") && (
              <button
                onClick={handleClick}
                className={`bg-secondary600 ${
                  isVisible ? "scale-100" : "scale-0"
                } rounded-full transition-all duration-300 p-3 absolute top-[-5rem] right-[7%] z-[9999]`}
              >
                <GoPlus className="text-3xl text-white" />
              </button>
            )}
          </>
        )}
      </div>

      {isOpen && (
        <div className="relative" onClick={handleClose}>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[2] pointer-events-auto"
            style={{ height: "100vh", width: "100vw" }}
          >
            <div className="flex flex-col  gap-y-4 absolute right-[7%] bottom-[7rem] items-center ">
              <div className="flex items-center gap-x-2">
                <span className="text-white font-heading capitalize">
                  events
                </span>
                <button className=" p-[0.65rem] rounded-full bg-[#dce7f9]">
                  <img src="\images\calendar.svg" alt="img" />
                </button>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-white font-heading capitalize">post</span>
                <Link
                  to="/post"
                  className=" bg-secondary600 p-3  transition-all duration-300  rounded-full "
                >
                  <GoPlus className={`text-3xl text-white`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}








