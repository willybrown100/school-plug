export default async function signup(data){
    try {
   const response = await fetch(
     "https://techeat-server-1.onrender.com/api/auth/register",
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     }
   );
   const result = await response.json();
        return result
    } catch (error) {
      console.log(error)  
    }
}

