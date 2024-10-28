import React from 'react'

export default function useSug() {
   const userInfo = localStorage.getItem("sugDetails");
   const authUserData = JSON.parse(userInfo);
   console.log(authUserData);
  
     const userId = authUserData?.userId
     console.log(userId);
  return { authUserData, userId };
}



