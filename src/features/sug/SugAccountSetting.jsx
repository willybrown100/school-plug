import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Modals from '../../components/Modals';
import SugDeleteAcctModal from '../../components/SugDeleteAcctModal';

export default function SugAccountSetting() {
    const navigate = useNavigate()
      const [chec, setCheck] = useState("");
      console.log(chec);
const handleClick = function(){
    navigate(-1)
}
  return (
    <section>
      <article className="">
        <div className="flex gap-x-2 items-center mb-5">
          <button onClick={handleClick} className="bg-transparent">
            <img src="\assets\arrow-left.svg" alt="icon" />
          </button>
          <p className="mb-0 font-semibold capitalize">account settings</p>
        </div>

        <article>
          <div className="flex justify-between items-center bg-stone-50 p-2 rounded-md">
            <p className="mb-0 capitalize tracking-wide">change password</p>
            <Link
              to="/sughome/sugprofile/sugchangepassword"
              className="bg-white w-8 h-8 flex justify-center items-center rounded-full"
            >
              <img
                src="\assets\arrowRight.svg"
                alt="icon"
                className="  rounded-full"
              />
            </Link>
          </div>

          <article className="border flex flex-col gap-y-4 border-stone-400 rounded-md p-2 my-3">
            <div className="flex gap-x-3 items-center mb-3">
              <h3 className="mb-0 text-stone-600 font-semibold">
                manage notification
              </h3>
              <img src="\images\notification-bing.png" alt="" />
            </div>
            <div className="bg-stone-50 p-2 rounded-md flex justify-between">
              <p className="mb-0 text-stone-700">Recieve tags and mentions</p>

              <input
                type="checkbox"
                id="check1"
                value={chec}
                className="checkbtn1 hidden"
                onChange={(e) => setCheck(e.target.checked)}
                // {...register("checkbox", { required: true })}
              />
              <label
                htmlFor="check1"
                className="bg-[#cfdaf1] relative label1 w-[40px]  h-[20px] rounded-full"
              ></label>
            </div>
            <div className="bg-stone-50 p-2 rounded-md flex justify-between">
              <p className="mb-0 text-stone-700">
                Always recieve notification{" "}
              </p>

              <input
                type="checkbox"
                id="check2"
                value={chec}
                className="checkbtn2 hidden"
                onChange={(e) => setCheck(e.target.checked)}
                // {...register("checkbox", { required: true })}
              />
              <label
                htmlFor="check2"
                className="bg-[#cfdaf1] relative label2 w-[40px]  h-[20px] rounded-full"
              ></label>
            </div>
            <div className="bg-stone-50 p-2 rounded-md flex justify-between">
              <p className="mb-0 text-stone-700">Stop recieving notification</p>

              <input
                type="checkbox"
                id="check3"
                value={chec}
                className="checkbtn3 hidden"
                onChange={(e) => setCheck(e.target.checked)}
                // {...register("checkbox", { required: true })}
              />
              <label
                htmlFor="check3"
                className="bg-[#cfdaf1] relative label3 w-[40px]  h-[20px] rounded-full"
              ></label>
            </div>
          </article>

          <div className="flex justify-between items-center bg-stone-50 p-2 rounded-md">
            <p className="mb-0 capitalize tracking-wide">delete account</p>
            <OpenModal />
          </div>
          <div className="flex justify-between my-4 items-center bg-stone-50 p-2 rounded-md">
            <p className="mb-0 capitalize tracking-wide">log out</p>
            <button className="bg-white w-8 h-8 flex justify-center items-center rounded-full">
              <img
                src="\assets\logout.svg"
                alt="icon"
                className="  rounded-full"
              />
            </button>
          </div>
        </article>
      </article>
    </section>
  );
}


function OpenModal() {

  const handleClick = function (e) {
    e.preventDefault();
  };
  return (
    <Modals>
      <Modals.Open opens="deleteModal">
        <button className="bg-white w-8 h-8 flex justify-center items-center rounded-full">
          <img
            src="\assets\arrowRight.svg"
            alt="icon"
            className="  rounded-full"
          />
        </button>
      </Modals.Open>
      <Modals.Window name="deleteModal">
        <SugDeleteAcctModal />
      </Modals.Window>
    </Modals>
  );
}