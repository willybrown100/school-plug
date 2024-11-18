import React, { useState } from 'react'
import DesktopCreatingPostButton from './DesktopCreatingPostButton';
import DefaultSchool from './DefaultSchool';
import Bills from './Bills';
import UserDetails from './UserDetails';

import {  useQuery } from '@tanstack/react-query';
import { getParticularSchData } from '../services/contactApi';

import { getRegisteredSchools } from '../services/sugApis';
import StudentPerPost from './StudentPerPost';

import PageLoader from './PageLoader';
import useGetUser from '../hooks/useGetUser';

export default function UsersFeed() {
const [open, setOpen] = useState(null);

const { data:authStudent } = useGetUser()
const { studentInfo } = authStudent;
const uni = studentInfo?.university;
console.log(uni)
  const { data: school=[] } = useQuery({
    queryFn: getRegisteredSchools,
    queryKey: ["regSchools"],
  }); 
 
  const schools = school?.schools
  const sch = schools?.filter((item)=>item.university === uni) 
  const schObj = sch?.at(0)
  const schoolInfoId = schObj?._id
  console.log(schoolInfoId);
  
  const { data = [], isLoading } = useQuery({
    queryFn: () => getParticularSchData(schoolInfoId),
    queryKey: ["schoolpost"],
    enabled: !!schoolInfoId,
  }); 
  console.log(data)

 const className = "md:max-w-[1250px]   md:w-[90vw]  m-auto ";
if(isLoading)return <PageLoader/>
 return (
   <div className="min-h-screen max-sm:mt-[5.5rem] md:mt-[9.4rem] lg:mt-[4.4rem]  pb-[8rem]">
     <div
       className={`${className} md:grid lg:grid-cols-[16rem,1fr,auto]  md:grid-cols-[16rem,1fr] gap-x-3 `}
     >
       <UserDetails />
       <div className=" ">
         <DefaultSchool data={data} />
         <DesktopCreatingPostButton />
         <ul className="flex flex-col gap-y-2">
           {data?.posts?.map((item) => (
             <StudentPerPost
               item={item}
               key={item._id}
               open={open === item._id}
               onClick={() =>
                 setOpen((prev) => (prev === item._id ? null : item._id))
               }
             />
           ))}
         </ul>
       </div>
       <Bills />
     </div>
   </div>
 );
}



