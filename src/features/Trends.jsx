import React from 'react'
import UserDetails from '../components/UserDetails';
import Bills from '../components/Bills';
import DesktopCreatingPostButton from '../components/DesktopCreatingPostButton';
import useGetTrends from '../hooks/useGetTrends';
import TrendPerPost from "../components/TrendPerPost"
import BlueMiniLoader from '../ui/BlueMiniLoader';
import useGetRegisteredSchools from '../hooks/useGetRegisteredSchools';




export default function Trends() {
   const className = "md:max-w-[1250px]   md:w-[90vw]  m-auto";

 const { data:schoolPosts,  } = useGetRegisteredSchools();
   const { state, uniProfilePicture,university } = schoolPosts?.pages?.at(0).schoolInfo ||{};
//  const {state,uniProfilePicture}=schoolPosts?.schoolInfo ||{}
const {data,isLoading}=useGetTrends()
const trend = data?.trendingPosts

 return (
   <div className="min-h-screen max-sm:pt-[7.5rem] md:pt-[9.8rem] lg:pt-[5.4rem]  pb-[8rem]">
     <div
       className={`${className} md:grid lg:grid-cols-[16rem,1fr,auto] md:grid-cols-[16rem,1fr] gap-x-3 `}
     >
       <UserDetails />
       <div className=" ">
         <div className=" p-4 mb-2 bg-white rounded-lg flex flex-col gap-y-3">
           <div className="flex gap-x-3 items-center">
             <img
               src={
                 uniProfilePicture
                   ? uniProfilePicture
                   : "/images/profile-circle.svg"
               }
               alt="person"
               className="rounded-full w-[5rem] h-[5rem]"
             />
             <div>
               <h4 className="uppercase mb-1">{university}</h4>
               <h4 className="capitalize text-sm mb-0 text-stone-500 ">
                 {state} nigeria
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
         </div>
         <DesktopCreatingPostButton />
         {isLoading ? (
           <div className="flex justify-center mt-3">
             <BlueMiniLoader />
           </div>
         ) : (
           trend?.map((item) => <TrendPerPost item={item} key={item.postId} />)
         )}

         {!trend.length && <p className='capitalize text-lg text-stone-600 text-center'>no trending post yet</p>}
       </div>

       <Bills />
     </div>
   </div>
 );
}

  