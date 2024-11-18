import React from 'react'

export default function PageLoader() {
  return (
    <div className=" grid place-items-center h-[100vh]">
      {/* <div className="loaderContainer w-[25rem] flex"> */}
      <div className="load relative  h-[6rem] md:h-[8rem] ">
        <img
          src="/images/loader1.png"
          alt="img"
          className="p-4 h-[6rem] md:h-[8rem]"
        />
      </div>

      {/* </div> */}
    </div>
  );
}
