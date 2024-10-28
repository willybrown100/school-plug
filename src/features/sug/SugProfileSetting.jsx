import React from 'react'
import { Link } from 'react-router-dom';
import useGetSugUser from '../../hooks/useGetSugUser';

export default function SugProfileSetting() {
   const { data, isLoading } = useGetSugUser();
    const sugImg = data?.data?.uniProfilePicture;
    const uni = data?.data?.university;
    const state = data?.data?.state;
      const aboutUni = data?.data?.aboutUniversity;
      const aboutUniz = data?.data?.user;
      const { fullName, email, phoneNumber,} = data?.data?.user || {};
   console.log(data, aboutUniz);
  return (
    <article className="border border-stone-400 p-3  rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center my-2">
          <img src={sugImg} alt="img" className="rounded-full w-14 h-14" />
          <div className="flex flex-col ">
            <h3 className="mb-0">{uni}</h3>
            <p className="mb-0 capitalize">{state} state</p>
          </div>
        </div>
        <Link to="/sughome/sugprofile/sugeditprofile">
          <img src="\src\assets\edit.svg" alt="edit" />
        </Link>
      </div>
      <p className="  text-stone-700 p-2 rounded-md bg-stone-50">{aboutUni}</p>

      <div className="flex flex-col gap-y-2 bg-stone-50 p-1">
        <h4 className="mb-0 capitalize">
          <span className="text-stone-500 capitalize">SUG Name:</span> {fullName}
        </h4>

        <p className="mb-0 text-stone-500">{email}</p>
      </div>
    </article>
  );
}
