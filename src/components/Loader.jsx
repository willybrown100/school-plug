import React from 'react'



export default function Loader() {
  return (
    <div className=" grid place-items-center h-[100vh]">
      {/* <div className="loaderContainer w-[25rem] flex"> */}
      <div className="load relative  h-[8rem]">
        <img src='/images/loader1.png' alt='img' className='p-4 h-[8rem]'/>
      </div>
      
      
      {/* </div> */}
    </div>
  );
}


