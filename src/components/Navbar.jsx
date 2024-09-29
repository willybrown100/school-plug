import React from "react";
import { HiHome, HiMagnifyingGlass } from "react-icons/hi2";
import { NavLink, useLocation } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useEffect,useState } from "react";


export default function Navbar() {
  const { pathname } = useLocation();
 
  const pathn = pathname.split("/").at(2);
  console.log(pathn);
  const links = [
    {
      name: "home",
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
            stroke-width="1.2"
            stroke-miterlimit="10"
            stroke-linejoin="round"
            className={`${pathn === "feed" ? "home" : "black"}`}
          />
          <path
            d="M6.71416 1.87998L2.09416 5.57998C1.57416 5.99331 1.24083 6.86665 1.35416 7.51998L2.24083 12.8266C2.40083 13.7733 3.30749 14.54 4.26749 14.54H11.7342C12.6875 14.54 13.6008 13.7666 13.7608 12.8266L14.6475 7.51998C14.7542 6.86665 14.4208 5.99331 13.9075 5.57998L9.28749 1.88665C8.57416 1.31331 7.42083 1.31331 6.71416 1.87998Z"
            stroke="#51526C"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "feed" ? "home" : "black"}`}
          />
        </svg>
      ),
      path: "feed",
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
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M16.5 2V5"
            stroke="#565656"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M4 9.09009H21"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M21.5 8.5V17C21.5 20 20 22 16.5 22H8.5C5 22 3.5 20 3.5 17V8.5C3.5 5.5 5 3.5 8.5 3.5H16.5C20 3.5 21.5 5.5 21.5 8.5Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M16.1947 13.7H16.2037"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M16.1947 16.7H16.2037"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M12.4955 13.7H12.5045"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M12.4955 16.7H12.5045"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M8.79431 13.7H8.80329"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
          <path
            d="M8.79431 16.7H8.80329"
            stroke="#292D32"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "events" ? "pz" : "black"}`}
          />
        </svg>
      ),
      path: "events",
    },
    {
      name: "materials",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.6602 10.44L20.6802 14.62C19.8402 18.23 18.1802 19.69 15.0602 19.39C14.5602 19.35 14.0202 19.26 13.4402 19.12L11.7602 18.72C7.59018 17.73 6.30018 15.67 7.28018 11.49L8.26018 7.30001C8.46018 6.45001 8.70018 5.71001 9.00018 5.10001C10.1702 2.68001 12.1602 2.03001 15.5002 2.82001L17.1702 3.21001C21.3602 4.19001 22.6402 6.26001 21.6602 10.44Z"
            stroke="#565656"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "materials" ? "pz" : "black"}`}
          />
          <path
            d="M15.0603 19.3901C14.4403 19.8101 13.6603 20.1601 12.7103 20.4701L11.1303 20.9901C7.16034 22.2701 5.07034 21.2001 3.78034 17.2301L2.50034 13.2801C1.22034 9.3101 2.28034 7.2101 6.25034 5.9301L7.83034 5.4101C8.24034 5.2801 8.63034 5.1701 9.00034 5.1001C8.70034 5.7101 8.46034 6.4501 8.26034 7.3001L7.28034 11.4901C6.30034 15.6701 7.59034 17.7301 11.7603 18.7201L13.4403 19.1201C14.0203 19.2601 14.5603 19.3501 15.0603 19.3901Z"
            stroke="#565656"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "materials" ? "pz" : "black"}`}
          />
          <path
            d="M12.6396 8.53003L17.4896 9.76003"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "materials" ? "pz" : "black"}`}
          />
          <path
            d="M11.6602 12.3999L14.5602 13.1399"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "materials" ? "pz" : "black"}`}
          />
        </svg>
      ),

      path: "material",
    },
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "trends" ? "pz" : "black"}`}
          />
          <path
            d="M15 9.5H17V11.5"
            stroke="#565656"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "trends" ? "pz" : "black"}`}
          />
          <path
            d="M9.5 22H15.5C20.5 22 22.5 20 22.5 15V9C22.5 4 20.5 2 15.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22Z"
            stroke="#292D32"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "trends" ? "pz" : "black"}`}
          />
        </svg>
      ),
      path: "trends",
    },
    {
      name: <span className="lg:hidden">pay bills</span>,
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
            stroke-width="1.5"
            stroke-miterlimit="10"
            className={`${pathn === "bills" ? "pz" : "black"}`}
          />
          <path
            d="M2 2.5H22"
            stroke="#565656"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            className={`${pathn === "bills" ? "pz" : "black"}`}
          />
          <path
            d="M8 8H16"
            stroke="#565656"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "bills" ? "pz" : "black"}`}
          />
          <path
            d="M8 13H16"
            stroke="#565656"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`${pathn === "bills" ? "pz" : "black"} `}
          />
        </svg>
      ),
      path: "bills",
    },
  ];
     const className = "max-w-[1170px]   w-[90vw]  m-auto";

       

  return (
    <nav
      className={`bg-white p-2 w-full `}
    >
      <article
        className={`${className}  max-lg:flex max-xl:flex-col max-lg:gap-y-2 `}
      >
        <div className="flex justify-between gap-x-6  items-center">
          <img
            src="\images\dashboaderLogo.png"
            alt="img"
            className="md:hidden"
          />
          <img
            src="\images\smLogo.png"
            alt="img"
            className="hidden lg:hidden md:block"
          />
          <form className=" hidden md:block lg:hidden px-16 w-full  relative">
            <input
              type="text"
              placeholder="Search"
              className=" bg-stone-100 rounded-md w-full p-3 placeholder:pl-4 placeholder:capitalize"
            />
            <button>
              <HiMagnifyingGlass className="text-xl absolute top-3 left-16" />
            </button>
          </form>
          <div className=" hidden md:flex lg:hidden gap-2 items-center">
            <img
              src="\images\notification-bing.png"
              alt="img"
              className=" rounded-full p-2 border border-secondary400"
            />
            <img
              src="\images\messenger.png"
              alt="img"
              className="border border-secondary400 rounded-full p-2"
            />
          </div>
          <button>
            <HiMagnifyingGlass className="text-2xl md:hidden" />
          </button>
        </div>

        <ul className="hidden md:flex items-center lg:hidden justify-between">
          {links.map((item) => (
            <NavLinks item={item} />
          ))}
        </ul>

        <div className="md:hidden flex items-center gap-x-1 justify-between">
          <img
            src="\images\black-man-with-happy-expression 1.png"
            alt="img"
            className="w-[3.5rem]  h-[3.5rem] rounded-full mb-0"
          />

          <div className="flex gap-x-2 mt-2 items-center">
            <img
              src="\images\notification-bing.png"
              alt="img"
              className=" rounded-full p-2 border border-secondary400"
            />
            <img
              src="\images\messenger.png"
              alt="img"
              className="border border-secondary400 rounded-full p-2"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <ul className="hidden lg:flex items-center gap-x-6 ">
            {links.map((item) => (
              <NavLinks item={item} />
            ))}
          </ul>

          <img
            src="\images\smLogo.png"
            alt="img"
            className="hidden  lg:block"
          />
          <div className="flex items-center gap-x-5">
            <form className=" hidden lg:block w-full relative">
              <input
                type="text"
                placeholder="Search"
                className=" bg-stone-100 rounded-md w-full p-3 placeholder:pl-4 placeholder:capitalize"
              />
              <HiMagnifyingGlass className="text-xl absolute top-3 left-1" />
            </form>
            <div className="lg:flex gap-2 hidden items-center">
              <img
                src="\images\notification-bing.png"
                alt="img"
                className=" rounded-full p-2 border border-secondary400"
              />
              <img
                src="\images\messenger.png"
                alt="img"
                className="border border-secondary400 rounded-full p-2"
              />
            </div>
          </div>
        </div>
      </article>
    </nav>
  );
}








// export default Navbar;

// import { useLocation } from "react-router-dom";

// const svgArray = [
//   { id: 1, name: "circle" },
//   { id: 2, name: "square" },
//   { id: 3, name: "triangle" },
// ];

// const getSvgClass = (pathname, svgId) => {
//   // Example condition: style SVGs differently on the home page vs. other pages
//   return pathname === "/" ? "path-home" : "path-other";
// };

// const renderSVG = (svg, svgClass) => {
//   switch (svg.name) {
//     case "circle":
//       return (
//         <svg width="100" height="100">
//           <circle cx="50" cy="50" r="40" className={svgClass} />
//         </svg>
//       );
//     case "square":
//       return (
//         <svg width="100" height="100">
//           <rect x="10" y="10" width="80" height="80" className={svgClass} />
//         </svg>
//       );
//     case "triangle":
//       return (
//         <svg width="100" height="100">
//           <polygon points="50,15 90,85 10,85" className={svgClass} />
//         </svg>
//       );
//     default:
//       return null;
//   }
// };

// function HomePage() {
//   const location = useLocation();
//   return (
//     <div>
//       <h1>Home Page</h1>
//       {svgArray.map((svg) => (
//         <span key={svg.id}>
//           {renderSVG(svg, getSvgClass(location.pathname, svg.id))}
//         </span>
//       ))}
//     </div>
//   );
// }

// function OtherPage() {
//   const location = useLocation();
//   return (
//     <div>
//       <h1>Other Page</h1>
//       {svgArray.map((svg) => (
//         <span key={svg.id}>
//           {renderSVG(svg, getSvgClass(location.pathname, svg.id))}
//         </span>
//       ))}
//     </div>
//   );
// }

// export { HomePage, OtherPage };