import React, { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { HiOutlineEyeSlash } from 'react-icons/hi2';
import { IoIosEye } from 'react-icons/io';
import { ModalContext } from './Modals';

export default function SugDeleteAcctModal() {
      const { close } = useContext(ModalContext);
      const formRef = useRef(null)
     const [open, setOpen] = useState(false);
          const {
            register,
            handleSubmit,
            formState: { errors },
           
          } = useForm();
          const onSubmit =function(data){
            console.log(data)
          }
          const handleClose = function(e){
            if(formRef.current && !formRef.current.contains(e.target) )
              close()
          }
  return (
    <div onClick={handleClose} className="fixed  z-50 grid place-items-end backdrop-blur-md bg-opacity-70 inset-0 p-8">
      <div className="bg-white p-3 rounded-md flex flex-col gap-y-3">
        <h4 className="text-[#ec0e24] text-center font-semibold text-[0.9rem]">
          if you wish to delete your account, enter password below
        </h4>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
          <PasswordField
            open={open}
            ToggleOpen={() => setOpen(!open)}
            placeholder="password"
            register={register}
          />
          <button className="capitalize bg-[#ec0e24] text-center text-white p-2 rounded-md w-full">
            yes,delete
          </button>
        </form>
      </div>
    </div>
  );
}


export const PasswordField = ({

//   isPending,
  placeholder,
  register,
  errors,
  
  open,
  ToggleOpen,
}) => (
  <div className=" ">

    <div className="relative">
      <input
        type={!open ? "password" : "text"}
        id="password"
        // disabled={isPending}
        className="w-full md:p-2 border border-stone-700 p-2 rounded-md"
        placeholder={placeholder}
        {...register("password")}
        autoComplete="current-password"
      />
      <span className="absolute right-3 top-3 cursor-pointer">
        {open ? (
          <IoIosEye
            className="cursor-pointer text-stone-500 w-[2rem] h-[2rem] pb-[.8rem]"
            onClick={ToggleOpen}
          />
        ) : (
          <HiOutlineEyeSlash
            className="cursor-pointer w-[2rem] text-stone-500 h-[2rem] pb-[.8rem]"
            onClick={ToggleOpen}
          />
        )}
      </span>
    </div>
  </div>
);