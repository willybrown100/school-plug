export default async function signUp(data){
    try {
   const response = await fetch(
     "https://school-plug.onrender.com/api/signup/",
     {
      // mode:"no-cors",
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     }
   );

   const result = await response.json();
   console.log(result)
        return result
    } catch (error) {
      console.log(error)  
    }
}
export  async function EducationalSignUp(data){
  console.log(data)
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

