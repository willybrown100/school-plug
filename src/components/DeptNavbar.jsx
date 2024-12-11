import React from 'react'
import { useLocation } from 'react-router-dom';

export default function DeptNavbar() {
    const {pathname}=useLocation()
      const className = "max-w-[1250px]   w-[90vw]  m-auto";
  return (
    <>
      {pathname === "/departmentalhome/depthome" && (
        <nav className="bg-white p-2 z-[1] fixed top-0 left-0 w-full">
          <article
            className={`${className} max-lg:flex max-xl:flex-col max-lg:gap-y-2`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <img
                  src="\images\black-man-with-happy-expression 1.png"
                  alt="img"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="mb-0">yaba tech</h4>
                  <h4 className="mb-0">Dep. Political Science</h4>
                </div>
              </div>
              <div>
                <img
                  src="/images/notification-bing.png"
                  alt="img"
                  className="rounded-full p-2 border border-secondary400"
                />
              </div>
            </div>
          </article>
        </nav>
      )}
    </>
  );
}
