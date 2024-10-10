import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useGetUser from '../hooks/useGetUser';
import SmallLoader from './SmallLoader';

export default function ProfileMobileView() {
 const {data,isLoading}=useGetUser()
 const img =data?.user?.profilePhoto;

  return (
    <div>
      {isLoading ? (
        <SmallLoader />
      ) : (
        <>
          <img
            src={img ? img : "/images/profile-circle.svg"}
            alt="img"
            loading="lazy"
            className="w-[3.5rem] object-cover  h-[3.5rem] rounded-full mb-0"
          />
        </>
      )}
    </div>
  );
}
