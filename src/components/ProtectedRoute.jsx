/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({ children }) {
  const { token } = useUser();
  const navigate = useNavigate();
  const [user,setUser]=useState(null)
  console.log(user)

  const [load, setLoad] = useState(false);
  const session = token;
  console.log(session);
  console.log(load);

//   if (user?.message === "Invalid Token"){
//     navigate("/signin");
//   }

 if (user?.message === "Invalid Token") {
   localStorage.removeItem("userDetails"); // Clear local storage
   navigate("/signin"); // Redirect to the sign-in page
 }
    useEffect(() => {
      async function getAuthUser(token) {
        try {
          setLoad(true);
          const response = await fetch(
            "https://student-plug.onrender.com/api/auth/getuser",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const result = await response.json();
          console.log(result);
          setUser(result);
          return result;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoad(false);
        }
      }
      getAuthUser(token);
    }, [token]);

  useEffect(() => {
    if (!session) navigate("/signin");
  });

  if (load) {
    return <Loader />;
  }
  if (session) {
    return children;
  }
}
