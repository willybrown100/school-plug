import React, { useRef, useState } from 'react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import { useMutation, useQuery } from '@tanstack/react-query'
import { handleUpload, uploadUserImage } from '../services/contactApi'

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
  const [imageFile, setImageFile] = useState(null);
 console.log(imageFile)
  const imageRef = useRef()
  const { mutate, isPending } = useMutation({
    mutationFn: handleUpload,
    onSuccess: () => {
navigate("/home")
    },
  });
 


 const handleImageChange = (event) => {
   const file = event.target.files[0]; // Get the selected file
   if (file) {
     setImageFile(file); // Set the selected file to state

     // Use the selected file directly here
     mutate({ profilePhoto: file, token, userId });
   }
 };



  const handleClick = function(e){
    if(imageRef.current){
      imageRef.current.click()
      e.preventDefault()
    }
  }



 
  return (
    <div>
   
        <div className="">
          <img
            src="\images\blackman2.png"
            alt="userprofile"
            className="mx-auto mb-11 w-[10rem] w rounded-full"
          />
          <div className="flex flex-col gap-y-3 md:grid md:grid-cols-2 md:gap-x-2">
            <Button>use image</Button>
            <button
              onClick={handleClick}
              className="bg-white capitalize font-heading  p-2 rounded-md border border-secondary500"
            >
              {isPending ? "wait.." : " change image"}
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





const ImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState('your-user-id'); // Replace with your actual user ID
  const token = 'your-auth-token'; // Replace with your actual token

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile || !userId) return; // Ensure both image and userId are present

    const formData = new FormData();
    formData.append('image', imageFile); // Append the image file
    formData.append('userId', userId); // Append the user ID

    try {
      const response = await fetch('https://your-api-url.com/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          // Do not set Content-Type, it will be set automatically
        },
        body: formData, // Send FormData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

// export default ImageUpload;
