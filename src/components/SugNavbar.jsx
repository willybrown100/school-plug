import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useGetSugUser from '../hooks/useGetSugUser'








export default function SugNavbar() {
  const { data } = useGetSugUser();
  const navigate = useNavigate()
  const sugImg = data?.data?.uniProfilePicture;
  const uni = data?.data?.university;
  const { fullName } = data?.data?.user || {};

  useEffect(() => {
    if (data?.message === "Invalid Token") {
      navigate("/sugsignin");
    }
  }, [data.message, navigate]);

  const { pathname } = useLocation();
  const pathn = pathname.split("/").at(2)

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
  
        // Show navbar if scrolling up and hide it if scrolling down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true); // Scrolling up
        } else {
          setIsVisible(false); // Scrolling down
        }
  
        // Update the last scroll position
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);



const excludedRoutes = ["/sughome/sugevents/:id"];
const shouldHideNavbar = excludedRoutes.some((route) => {
  if (route.includes(":id")) {
    // Handle dynamic route matching
    const baseRoute = route.split("/:id")[0];
    return pathname.startsWith(baseRoute) && pathname !== baseRoute;
  }
  return pathname === route;
});
  return (
    <>
      {pathn !== "sugprofile" &&
        pathname !== "/sughome/sugnotification" &&
        pathname !== "/sughome/sugpaybills" &&
        pathname !== "/sughome/sugtrends" &&
        pathname !== "/sughome/sugviewbills" &&
        !shouldHideNavbar &&
        (
          <nav
            className={`py-4 px-3 bg-white z-[1] fixed top-0 left-0 w-full transition-transform duration-300 ${
              isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex items-center justify-between gap-x-2">
              <div className="flex gap-x-4 items-center">
                <img
                  src={sugImg ? sugImg : "/images/profile-circle.svg"}
                  alt={fullName}
                  className="rounded-full w-14 h-14"
                />
                <div className="flex flex-col gap-y-1">
                  <p className="mb-0 capitalize font-heading">admin,</p>
                  <h3 className="mb-0 capitalize font-semibold font-heading">
                    {uni}
                  </h3>
                </div>
              </div>
              <Link to="/sughome/sugnotification">
                <img
                  src="/images/notification-bing.png"
                  alt="Notification"
                  loading="lazy"
                  className="rounded-full p-2 border border-secondary400"
                />
              </Link>
            </div>
          </nav>
        )}
    </>
  );
}


