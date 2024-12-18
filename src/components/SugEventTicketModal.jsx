/* eslint-disable react/prop-types */
import React, { useContext, useRef } from "react";
import Button from "../ui/Button";
import { ModalContext } from "./Modals";
import MiniLoader from "../ui/MiniLoader";

export default function SugEventTicketModal({ setPrice, creatingPaidEvent }) {
  const { close } = useContext(ModalContext);
  const modalRef = useRef(null);
  const handleClose = function (e) {
    console.log(e, modalRef.current);
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close();
    }
  };
  return (
    <div
      className="fixed bg-black bg-opacity-50 z-50  backdrop-blur-sm inset-0 p-6"
      onClick={handleClose}
    >
      <div className="relative min-h-screen ">
        <div
          ref={modalRef}
          className="bg-white rounded-lg p-4 absolute  right-0 left-0  bottom-[5rem]"
        >
          <img
            src="\assets\info-circle2.svg"
            className="font-semibold m-auto"
          />
          <p className="text-sm font-semibold text-center mb-0 text-secondary600 font-heading">
            Enter event ticket price
          </p>

          <input
            type="text"
            placeholder="enter price"
            onChange={(e) => setPrice(e.target.value)}
            className="my-4 w-full border  border-stone-600 rounded-md outline-none bg-transparent p-1"
          />

          <Button className="w-full">
            {creatingPaidEvent ? (
              <div className="flex justify-center">
                {" "}
                <MiniLoader />
              </div>
            ) : (
              "Publish event"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
