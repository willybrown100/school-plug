import React from 'react'
import UserDetails from '../components/UserDetails';
import Bills from '../components/Bills';
import DesktopCreatingPostButton from '../components/DesktopCreatingPostButton';



export default function Trends() {
   const className = "md:max-w-[1250px]   md:w-[90vw]  m-auto";


 return (
   <div className=" min-h-screen max-sm:mt-[6.5rem] md:mt-[9.4rem] lg:mt-[4.4rem]">
     <div
       className={`${className} md:grid lg:grid-cols-[16rem,1fr,auto] md:grid-cols-[16rem,1fr] gap-x-3 `}
     >
       <UserDetails />
       <div className=" ">
         {/* <div className={``}> */}

         <div className=" p-4 bg-white rounded-lg flex flex-col gap-y-3">
           <div className="flex gap-x-3 items-center">
             <img
               src="\images\yabatech.png"
               alt="person"
               className="rounded-full"
             />
             <div>
               <h4 className="uppercase mb-1">yaba tech</h4>
               <h4 className="capitalize text-sm mb-0 text-stone-500 ">
                 lagos nigeria
               </h4>
             </div>
           </div>

           <div>
             <h4 className="font-heading text-secondary600 font-semibold ">
               #TrendinginYabaTech
             </h4>
             <p className="font-heading">
               This section contains all the important and trending school gist
               within the campus. You can use the hashtag above to create a
               trending post.
             </p>
           </div>
           {/* </div> */}
         </div>
       <DesktopCreatingPostButton/>
       </div>

       <Bills />
     </div>
   </div>
 );
}

  