
import React, { useEffect } from 'react'
import useGetUser from '../hooks/useGetUser';
import SmallLoader from './SmallLoader';
import { useNavigate } from 'react-router-dom';

export default function ProfileMobileView() {
  const navigate = useNavigate()
 const {data,isLoading}=useGetUser()
 const img =data?.user?.profilePhoto;
console.log(data)
useEffect(() => {
  if (data?.message === "Token has expired") {
    navigate("/signin");
  }
},[data.message]);
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
