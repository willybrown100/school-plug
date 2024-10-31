import React from 'react'

export default function useSug() {
   const userInfo = localStorage.getItem("sugDetails");
   const authUserData = JSON.parse(userInfo);
 
  
     const userId = authUserData?.userId
     console.log(userId);
  return { authUserData, userId };
}



