import React, { useRef, useState } from 'react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import { useMutation,  } from '@tanstack/react-query'
import {  handleUpload2} from '../services/contactApi'
import toast from 'react-hot-toast'

export default function UserProfile() {
  const {authUserData}=useUser()
  const token=authUserData.token
  console.log(authUserData)
  const navigate = useNavigate()
  const [showImg,setShowImg]=useState(true)
const handleSkip = function(){
  if(token){
    navigate("/home")
  }
}
  return (
    <main className="profileContainer  bg-stone-100">
      <div className="profile min-h-screen  grid place-items-center">
        <div className="md:bg-stone-50  md:shadow-lg w-full rounded-[1.5rem] pb-20 p-12 md:w-[500px] px-10  ">
          {showImg ? (
            <>
              <div className="mb-[2rem]">
                <img src="\images\animIMG.gif" alt="img " className="m-auto" />
                <h3 className="font-fontHeading  text-center md:px-10 text-[1.4rem]">
                  upload your profile picture
                </h3>
              </div>
              <div className=" md:grid md:grid-cols-2 flex flex-col gap-3">
                <Button
                  onClick={() => setShowImg(false)}
                  className="md:hidden  capitalize rounded-md px-6 py-[0.4rem]"
                >
                  continue
                </Button>
                <button
                  onClick={handleSkip}
                  className="border-secondary400 border-[1px] capitalize rounded-md px-6 py-1"
                >
                  skip for later
                </button>
                <Button
                  onClick={() => setShowImg(false)}
                  className="px-6 hidden md:block bg-secondary400"
                >
                  continue
                </Button>
              </div>
            </>
          ) : (
            <UserImage />
          )}
        </div>
      </div>
    </main>
  );
}

function UserImage(){
  const navigate = useNavigate()
  const { authUserData,userId } = useUser();
  const token = authUserData.token;
  // const [imageFile, setImageFile] = useState(null);
  const imageRef = useRef()

const defaultImagePath = "/images/blackman2.png";

  const { mutate, isLoading } = useMutation({
    mutationFn: handleUpload2,
    onSuccess: () => {
navigate("/home/homePage")
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  });
 


 const handleImageChange = (event) => {
   const file = event.target.files[0];
   if (file) {
    //  setImageFile(file); 
     mutate({ profilePhoto: file, token, userId });
   }
 };

  const handleClick = function(e){
    if(imageRef.current){
      imageRef.current.click()
      e.preventDefault()
    }
  }

   const handleUseImage = () => {
     // When "Use Image" is clicked, use the default image for upload
     mutate({ profilePhoto: defaultImagePath, token, userId });
   };
 return (
   <div>
     <div className="">
       <img
         src={defaultImagePath}
         alt="userprofile"
         className="mx-auto mb-11 w-[10rem] w rounded-full"
       />
       <div className="flex flex-col gap-y-3 md:grid md:grid-cols-2 md:gap-x-2">
         <Button onClick={handleUseImage}>use image</Button>
         <button
           onClick={handleClick}
           className="bg-white capitalize font-heading  p-2 rounded-md border border-secondary500"
         >
           {isLoading ? "wait.." : " change image"}
         </button>
         <input
           type="file"
           accept="image"
           className="hidden"
           ref={imageRef}
           onChange={handleImageChange}
         />
       </div>
     </div>
   </div>
 );
}




 // Adjust this import based on your setup

// const YourComponent = () => {
//   const navigate = useNavigate();
//   const { authUserData, userId } = useUser();
//   const token = authUserData.token;
//   const [imageFile, setImageFile] = useState(null);
//   // Make sure the path is correct
//   const imageRef = useRef();
//   const { mutate, isPending } = useMutation({
//     mutationFn: handleUpload2,
//     onSuccess: () => {
//       navigate("/home");
//     },
//   });

  

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImageFile(file);
//       mutate({ profilePhoto: file, token, userId });
//     }
//   };

//   const handleClick = function (e) {
//     if (imageRef.current) {
//       imageRef.current.click();
//       e.preventDefault();
//     }
//   };

//   const handleUseImage = () => {
//     // When "Use Image" is clicked, use the default image for upload
//     mutate({ profilePhoto: defaultImagePath, token, userId });
//   };

//   return (
//     <div>
//       <div className="">
//         <img
//           src={defaultImagePath} // Use the path for the default image
//           alt="userprofile"
//           className="mx-auto mb-11 w-[10rem] rounded-full"
//         />
//         <div className="flex flex-col gap-y-3 md:grid md:grid-cols-2 md:gap-x-2">
//           <button
//             onClick={handleUseImage} // Handle the use of default image
//             className="bg-white capitalize font-heading p-2 rounded-md border border-secondary500"
//           >
//             Use Image
//           </button>
//           <button
//             onClick={handleClick}
//             className="bg-white capitalize font-heading p-2 rounded-md border border-secondary500"
//           >
//             {isPending ? "wait.." : "Change Image"}
//           </button>
//           <input
//             type="file"
//             accept="image/*" // Use image/* for all image types
//             className="hidden"
//             ref={imageRef}
//             onChange={handleImageChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
