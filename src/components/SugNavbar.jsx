import React from 'react'
import { useLocation } from 'react-router-dom'
import useGetSugUser from '../hooks/useGetSugUser'

export default function SugNavbar() {

  const { data, isLoading } = useGetSugUser()
  const sugImg = data?.data?.uniProfilePicture;
  const uni = data?.data?.university;
  const {fullName} = data?.data?.user || {};
  console.log(data, sugImg, uni);

  const {pathname}=useLocation()
  const pathn = pathname.split("/").at(2)
  console.log(pathn)
  return (
    <>
      {pathn !== "sugprofile" && (
        <nav className="py-4 px-3 bg-white">
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex gap-x-4 items-center">
              <img
                src={sugImg}
                alt={fullName}
                className="rounded-full w-14 h-14"
              />
              <div className="flex flex-col gap-y-1">
                <p className="mb-0 capitalize font-heading">admin,</p>
                <h3 className="mb-0 capitalize font-semibold font-heading">
                  {uni}
                </h3>
              </div>
            </div>
            <img
              src="\images\notification-bing.png"
              alt="img"
              loading="lazy"
              className=" rounded-full p-2 border border-secondary400"
            />
          </div>
        </nav>
      )}
    </>
  );
}
