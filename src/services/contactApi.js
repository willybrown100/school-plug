export default async function signUp(data){
    try {
   const response = await fetch(
     "https://school-plug.onrender.com/api/signup/",
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
  "faild to siggnup"
)
   }
   const result = await response.json();
   console.log(result)
        return result
    } catch (error) {
      console.log(error)  
    }
}
export  async function EducationalDetails(data){
    try {
   const response = await fetch(
     "https://school-plug.onrender.com/api/signup/educational-details/",
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
  "faild to siggnup"
)
   }
   const result = await response.json();
   console.log(result)
        return result
    } catch (error) {
      console.log(error)  
    }
}

