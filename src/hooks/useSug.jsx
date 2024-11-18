

export default function useSug() {
   const userInfo = localStorage.getItem("sugDetails");
   const authUserData = JSON.parse(userInfo);
 
  
     const userId = authUserData?.userId
     const token = authUserData?.token;

  return { authUserData, userId, token };
}



