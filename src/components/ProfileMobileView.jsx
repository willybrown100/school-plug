import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useGetUser from '../hooks/useGetUser';

export default function ProfileMobileView() {
 const {data,isLoading}=useGetUser()
 const img =data?.user?.profilePhoto;
console.log(img);
  return (
    <img
      src={img}
      alt="img"
      className="w-[3.5rem]  h-[3.5rem] rounded-full mb-0"
    />
  );
}
