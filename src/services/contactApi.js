export default async function signUp(data){
    try {
   const response = await fetch(
     "https://student-plug-server.onrender.com/api/auth/signup1",
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     }
    );
       if (!response.ok) {
         const error = await response.json();
         throw new Error(error.message);
       }
    
    const result = await response.json();
    if(result){
      localStorage.setItem("userDetails", JSON.stringify(result));
    }
    console.log(result)
   
    return result
    } catch (error) {
     throw error
     console.log(error)
    }
}
export  async function getAuthUser(){
    try {
   const response = await fetch(
     "https://student-plug-server.onrender.com/api/auth/getuser1"
   );

   const result = await response.json();
  
   console.log(result)
        return result
    } catch (error) {
      throw error; 
        console.log(error);
    }
}
export  async function EducationalSignUp(data){
  console.log(data)
    try {
   const response = await fetch(
     "https://student-plug-server.onrender.com/api/auth/studentinfo",
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     }
   );
   if(!response.ok){
throw new Error(
  "faild to signup"
)
   }
   const result = await response.json();
   console.log(result)
        return result
    } catch (error) {
      console.log(error)  
      throw error;
    }
}

export  async function signIn(data){
  console.log(data)
    try {
   const response = await fetch(
     "https://student-plug-server.onrender.com/api/auth/signin",
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     }
   );

   

   if(!response.ok){
throw new Error(
  "faild to signin"
)
   }
   const result = await response.json();
    if (result) {
      localStorage.setItem("userDetails", JSON.stringify(result));
    }
   console.log(result)
        return result
    } catch (error) {
      console.log(error)  
      throw error;
    }
}


export  async function uploadUserImage({ userId, token ,profilePhoto}) {
  console.log(`${userId}, token:${token}, ${profilePhoto}`);
  try {
    const response = await fetch(
      "https://student-plug-server.onrender.com/api/auth/upload-profile",
      {
        method: "POST",
        headers: {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        },
        body: JSON.stringify({profilePhoto,userId}),
      }
    );
    if (!response.ok) {
      throw new Error("faild to upload");
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}



export const handleUpload = async ({ profilePhoto, userId,token }) => {
  console.log(profilePhoto, userId, token);
  if (!profilePhoto || !userId) return; // Ensure both image and userId are present

  const formData = new FormData();
  formData.append("profilePhoto", profilePhoto); // Append the image file
  formData.append("userId", userId); // Append the user ID

  try {
    const response = await fetch(
      "https://student-plug-server.onrender.com/api/auth/upload-profile",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          // Do not set Content-Type, it will be set automatically
        },
        body: formData, // Send FormData
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log("Upload successful:", data);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error
  }
};

