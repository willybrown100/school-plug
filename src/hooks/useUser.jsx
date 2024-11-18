


export default function useUser() {
     const userInfo = localStorage.getItem("userDetails");
    
     const authUserData = JSON.parse(userInfo);
//  console.log(authUserData)
     const userId = authUserData?.data?._id
     const token = authUserData?.token
   
   
  return { authUserData, userId ,token};
}
