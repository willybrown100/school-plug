import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

import SugNavlinks from "../../components/SugNavlinks";

export default function SugFooter() {
  const { pathname } = useLocation();

  const pathn = pathname.split("/").at(2);


  const links = [
    {
      name: (
        <span
          className={`${
            pathname === "/sughome/sugfeed" ||
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
              pathname === "/sughome/sugfeed" ||
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
              pathname === "/sughome/sugfeed" ||
              pathname === "/home/homePage/billz"
                ? "home"
                : "black"
            }`}
          />
        </svg>
      ),
      path: "/sughome/sugfeed",
    },

    {
      name: <span className="lg:hidden"> bills</span>,
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
              pathname === "/sughome/sugpaybills" ? "pz" : "black"
            }`}
          />
          <path
            d="M2 2.5H22"
            stroke="#565656"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            className={`${
              pathname === "/sughome/sugpaybills" ? "pz" : "black"
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
              pathname === "/sughome/sugpaybills" ? "pz" : "black"
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
              pathname === "/sughome/sugpaybills" ? "pz" : "black"
            } `}
          />
        </svg>
      ),
      path: "/sughome/sugpaybills",
    },
    {
      name: (
        <span className={`lg:hidden ${pathn === "sugevents" ?"text-secondary600":""}`}>events </span>
      ),
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
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M16.5 2V5"
            stroke="#565656"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M4 9.09009H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M21.5 8.5V17C21.5 20 20 22 16.5 22H8.5C5 22 3.5 20 3.5 17V8.5C3.5 5.5 5 3.5 8.5 3.5H16.5C20 3.5 21.5 5.5 21.5 8.5Z"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M16.1947 13.7H16.2037"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M16.1947 16.7H16.2037"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M12.4955 13.7H12.5045"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M12.4955 16.7H12.5045"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M8.79431 13.7H8.80329"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
          <path
            d="M8.79431 16.7H8.80329"
            stroke="#292D32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${
              pathname === "/sughome/sugevents"
                ? "pz"
                : pathn === "sugevents"
                ? "pz"
                : "black"
            }`}
          />
        </svg>
      ),
      path: "/sughome/sugevents",
    },
    {
      name: (
        <span
          className={`lg:hidden ${
            pathn === "sugprofile" ? "text-secondary600" : ""
          }`}
        >
          profile{" "}
        </span>
      ),
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.58 8.58003V15.42C21.58 16.54 20.98 17.58 20.01 18.15L14.07 21.58C13.1 22.14 11.9 22.14 10.92 21.58L4.98 18.15C4.01 17.59 3.41 16.55 3.41 15.42V8.58003C3.41 7.46003 4.01 6.41999 4.98 5.84999L10.92 2.42C11.89 1.86 13.09 1.86 14.07 2.42L20.01 5.84999C20.98 6.41999 21.58 7.45003 21.58 8.58003Z"
            stroke="#565656"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathn === "sugprofile" ? "pz" : "black"} `}
          />
          <path
            d="M12.5 10.9998C13.7868 10.9998 14.83 9.95662 14.83 8.6698C14.83 7.38298 13.7868 6.33984 12.5 6.33984C11.2132 6.33984 10.17 7.38298 10.17 8.6698C10.17 9.95662 11.2132 10.9998 12.5 10.9998Z"
            stroke="#565656"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathn === "sugprofile" ? "pz" : "black"} `}
          />
          <path
            d="M16.5 16.6603C16.5 14.8603 14.71 13.4004 12.5 13.4004C10.29 13.4004 8.5 14.8603 8.5 16.6603"
            stroke="#565656"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${pathn === "sugprofile" ? "pz" : "black"} `}
          />
        </svg>
      ),
      path: "/sughome/sugprofile",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
  
      if (scrollTop < lastScrollTop) {
        // Scrolling up
        setIsVisible(true);
      } else {
        // Scrolling down
        setIsVisible(false);
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isOpen, setOpen] = useState(false);
  const handleClick = function () {
    setOpen((isOpen) => !isOpen);
  };
  const handleClose = function () {
    setOpen(false);
  };

  return (
    <>
      {pathname !== "/sughome/sugviewbills" && (
        <div className=" ">
          {/* Bottom navigation */}
          <div
            className={` p-2 shadow-xl fixed bottom-0 w-full transform transition-transform duration-300 ease-in-out ${
              isVisible ? "translate-y-0" : "translate-y-full"
            } bg-white shadow-md md:hidden `}
          >
            <ul className="flex justify-between items-center gap-x-2">
              {links.map((item) => (
                <SugNavlinks item={item} key={item.path} />
              ))}
            </ul>

            {/* Post button with the highest z-index */}
            {isOpen ? (
              <p></p>
            ) : (
              <>
                {pathname === "/sughome/sugfeed" && (
                  <button
                    onClick={handleClick}
                    className={`bg-secondary600 ${
                      isVisible ? "scale-1" : "scale-0"
                    } rounded-full transition-all duration-300 p-3 absolute top-[-5rem] right-[7%] z-[9999]`}
                  >
                    <GoPlus className={`text-3xl text-white`} />
                  </button>
                )}
              </>
            )}
          </div>
          {/* Overlay should cover the entire screen */}
          {isOpen && (
            <div className="relative" onClick={handleClose}>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[2] pointer-events-auto"
                style={{ height: "100vh", width: "100vw" }}
              >
                <div className="flex flex-col  gap-y-4 absolute right-[7%] bottom-[7rem] items-center ">
                  <Link to="/sugevent" className="flex items-center gap-x-2">
                    <button className="text-white bg-transparent font-heading capitalize">
                      events
                    </button>
                    <button className=" p-[0.65rem] rounded-full bg-[#dce7f9]">
                      <img src="\images\calendar.svg" alt="img" />
                    </button>
                  </Link>
                  <div className="flex items-center gap-x-2">
                    <span className="text-white font-heading capitalize">
                      post
                    </span>
                    <Link
                      to="/sugpost"
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
      )}
    </>
  );
}
