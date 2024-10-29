import React, { useRef } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import useGetSugUser from "../hooks/useGetSugUser";
import { useForm } from "react-hook-form";




import { useEffect } from "react";

export default function EditSugProfile() {
  const { data, isLoading } = useGetSugUser();
const ImageRef = useRef()
  // Destructure and set default form values
  const sugImg = data?.data?.uniProfilePicture;
  const aboutUniversity = data?.data?.aboutUniversity;
  const university = data?.data?.university;
  const state = data?.data?.state;
  const { fullName, email } = data?.data?.user || {};

  const editvalue = {
    fullName,
    university,
    state,
    email,
    aboutUniversity,
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editvalue,
  });

  useEffect(() => {
    // Reset form values after data is loaded
    if (data) {
      reset(editvalue);
    }
  }, [data, reset]);

  const navigate = useNavigate();
  const handleClick = function (e) {
    navigate(-1);
  };
  const handleRefClick = function(){
    if(ImageRef.current){
      ImageRef.current.click()
    }
  }

  const onSubmit = function (e) {
    e.preventDefault();
  };

  return (
    <article className="p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <button
              type="button"
              onClick={handleClick}
              className="bg-transparent"
            >
              <img src="/assets/arrow-left.svg" alt="icon" />
            </button>
            <p className="mb-0 font-semibold capitalize">Edit Profile</p>
          </div>
          <button className="rounded-[1rem] bg-secondary600 capitalize px-4 py-1 tracking-wide font-semibold text-white">
            save
          </button>
        </div>

        <div className="relative inline-block my-4">
          <img src={sugImg} alt={fullName} className="rounded-full w-20 h-20" />
          <div className="absolute inset-0 bg-black opacity-20 rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleRefClick}
              className="bg-white rounded-full w-8 h-8 flex items-center justify-center z-50"
            >
              <span className="mb-1 text-[1.2rem]">+</span>
            </button>
            <input
              type="file"
              accept="image"
              ref={ImageRef}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1">
            <label className="text-stone-500 font-medium">School name</label>
            <input
              type="text"
              {...register("university")}
              className="border p-2 border-stone-500 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-stone-500 font-medium">State</label>
            <input
              type="text"
              {...register("state")}
              className="border p-2 border-stone-500 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-stone-500 font-medium">SUG Full name</label>
            <input
              type="text"
              {...register("fullName")}
              className="border p-2 border-stone-500 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-stone-500 font-medium">Email</label>
            <input
              type="email"
              disabled
              {...register("email")}
              className="border p-2 border-stone-500 rounded-md"
            />
          </div>
          <div>
            <textarea
              {...register("aboutUniversity")}
              className="border p-2 border-stone-500 rounded-md h-[9rem] w-full"
              placeholder="About university"
            />
          </div>
        </div>
      </form>
    </article>
  );
}




// export default function EditSugProfile() {
//   const { data, isLoading } = useGetSugUser();
//     const sugImg = data?.data?.uniProfilePicture;
//     const aboutUniversity = data?.data?.aboutUniversity;
//     const university = data?.data?.university;
//     const state = data?.data?.state;
//   const { fullName,email } = data?.data?.user || {};
//   const { ...editvalue } = {
//     fullName,
//     university,
//     state,
//     email,
//     aboutUniversity,
//   };
// console.log(editvalue)
//   const { register, handleSubmit, reset } = useForm({
//     defaultValues:editvalue,
//   });
//   const navigate = useNavigate();
//   const handleClick = function (e) {
//     navigate(-1);
//   };
//   const onSubmit = function (e) {
//     e.preventDefault();
//   };
//   return (
//     <article className="p-3">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex justify-between items-center">
//           <div className="flex gap-x-2 items-center">
//             <button
//               type="button"
//               onClick={handleClick}
//               className="bg-transparent"
//             >
//               <img src="\src\assets\arrow-left.svg" alt="icon" />
//             </button>
//             <p className="mb-0 font-semibold capitalize">Edit Profile</p>
//           </div>
//           <button className="rounded-[1rem] bg-secondary600 capitalize px-4 py-1 tracking-wide font-semibold  text-white ">
//             save
//           </button>
//         </div>

//         <div className="relative inline-block my-4">
//           <img src={sugImg} alt={fullName} className="rounded-full w-20 h-20" />

//           <div className="absolute inset-0 bg-black opacity-20 rounded-full"></div>

//           <div className="absolute inset-0 flex items-center justify-center">
//             <button className="bg-white rounded-full  w-8 h-8 flex items-center justify-center z-50">
//               <span className="mb-1 text-[1.2rem]">+</span>
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col gap-y-5">
//           <div className="flex flex-col gap-y-1">
//             <label className="text-stone-500 font-medium ">School name</label>
//             <input
//               type="text"
//               {...register("schoolName")}
//               className="border p-2 border-stone-500 rounded-md"
//             />
//           </div>
//           <div className="flex flex-col gap-y-1">
//             <label className="text-stone-500 font-medium ">State</label>
//             <input
//               type="text"
//               {...register("state")}
//               className="border p-2 border-stone-500 rounded-md"
//             />
//           </div>
//           <div className="flex flex-col gap-y-1">
//             <label className="text-stone-500 font-medium ">SUG Full name</label>
//             <input
//               type="text"
//               {...register("sugFullName")}
//               className="border p-2 border-stone-500 rounded-md"
//             />
//           </div>
//           <div className="flex flex-col gap-y-1">
//             <label className="text-stone-500 font-medium ">Email</label>
//             <input
//               type="email"
//               disabled
//               {...register("email")}
//               className="border p-2 border-stone-500 rounded-md"
//             />
//           </div>
//           <div className="">
//             <textarea
//               {...register("aboutUniversity")}
//               className="border p-2 border-stone-500 rounded-md h-[9rem] w-full"
//               placeholder="About university"
//             />
//           </div>
//         </div>
//       </form>
//     </article>
//   );
// }