import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SugProfileSetting from "./SugProfileSetting";
import useGetSugUser from "../../hooks/useGetSugUser";

export default function SugProfilez() {
   const { data, isLoading } = useGetSugUser();
   const sugImg = data?.data?.uniProfilePicture;
   const uni = data?.data?.university;
   const aboutUni = data?.data?.aboutUniversity;
     const aboutUniz = data?.data?.user;
     const {  faculties } = data?.data?.user || {};

   console.log(data, sugImg, uni);
  const [chec, setCheck] = useState("");

  const navigate = useNavigate();
  const handleClick = function () {
    navigate(-1);
  };
  return (
    <section className=" px-3 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-x-2 items-center">
          <button onClick={handleClick} className="bg-transparent">
            <img src="\src\assets\arrow-left.svg" alt="icon" />
          </button>
          <p className="mb-0 font-semibold capitalize">profile</p>
        </div>

        <Link to="/sughome/sugprofile/acctsetting">
          <img src="\src\assets\setting-2.svg" alt="settings" />
        </Link>
      </div>

      <SugProfileSetting />

      <article className="my-4 border border-stone-400 p-3 rounded-md">
        <div className="flex gap-x-2 items-center">
          <h3 className="mb-0">school info </h3>
          <img src="\src\assets\info-circle.svg" alt="i" />
        </div>

        <div className="bg-stone-50 p-1 rounded-md ">
          <div className="flex justify-between items-center">
            <p className="mb-0 text-stone-700">School Faculties</p>
            <Link to="/sughome/sugprofile/sugfaculties">
              <img
                src="\src\assets\arrowRight.svg"
                alt="icon"
                className="bg-white p-3 rounded-full"
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-2">
            <p className=" inline-block border border-secondary400 rounded-full mb-0 p-1">
              {" "}
              <span className="border-2 border-green-600 w-7 h-7 rounded-full flex justify-center items-center">
                {faculties?.length}
              </span>
            </p>
            <p className="mb-0 capitalize text-secondary600">added</p>
          </div>
        </div>

        <div className="bg-stone-50 my-4 items-center p-2 flex justify-between">
          <p className="mb-0 text-stone-700">Imported Reg No.</p>
          <Link to="/sughome/sugprofile/importedregnum">
            <img
              src="\src\assets\arrowRight.svg"
              alt="icon"
              className="bg-white p-3 rounded-full"
            />
          </Link>
        </div>
      </article>

      <article className="my-4 border border-stone-400 p-3 rounded-md">
        <div className="flex gap-x-2 items-center">
          <h3 className="mb-0">Admin assist </h3>
          <img src="\src\assets\verify.svg" alt="i" />
        </div>

        <div className="bg-stone-50 p-1 rounded-md ">
          <div className="flex justify-between items-center">
            <p className="mb-0 text-stone-700">Add Admin</p>
            <Link to="/sughome/sugprofile/adminassist">
              <img
                src="\src\assets\profile-add.svg"
                alt="icon"
                className="bg-white p-3 rounded-full"
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-2">
            <p className=" inline-block border border-secondary400 rounded-full mb-0 p-1">
              {" "}
              <span className="border-2 border-green-600 w-7 h-7 rounded-full flex justify-center items-center">
                3
              </span>
            </p>
            <p className="mb-0 capitalize text-secondary600">added</p>
          </div>
        </div>

        <div className="bg-stone-50 my-4 items-center p-2 flex justify-between">
          <p className="mb-0 text-stone-700">Close posting</p>

          <input
            type="checkbox"
            id="check"
            value={chec}
            className="checkbtn hidden"
            onChange={(e) => setCheck(e.target.checked)}
            // {...register("checkbox", { required: true })}
          />
          <label
            htmlFor="check"
            className="bg-[#cfdaf1] relative label w-[40px]  h-[20px] rounded-full"
          ></label>
        </div>
      </article>
    </section>
  );
}
