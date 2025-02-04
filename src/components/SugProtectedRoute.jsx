/* eslint-disable react/prop-types */
// import React from "react";
import { useEffect, useState } from "react";
import useSug from "../hooks/useSug";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./SocketProvider";
// import Loader from "./Loader";

export default function SugProtectedRoute({ children }) {
  const [user,setUser]=useState(null)
  const { userId, token } = useSug();
  const navigate = useNavigate();
 const {  setNewPost} = useSocket();

  const session = token;

useEffect(() => {
  const eventSource = new EventSource(
    "https://student-plug.onrender.com/api/students/post-events"
  );

  eventSource.onopen = () => {
    console.log("Connected to SSE endpoint.");
  };

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("New post notification:", data);
      setNewPost(data);
    } catch (error) {
      console.error("Error parsing SSE data:", error);
    }
  };

  eventSource.onerror = (error) => {
    console.error("SSE error:", error);
    eventSource.close();
  };

  return () => {
    eventSource.close(); // Cleanup
  };
}, []);



  useEffect(() => {
    async function getAuthSug(userId, token) {
      try {
        // setLoad(true);
        const response = await fetch(
          `https://student-plug.onrender.com/api/school/getSug/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
setUser(result)
        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        // setLoad(false);
      }
    }
    getAuthSug(userId,token);
  }, [userId,token]);

  useEffect(() => {
    if (!session) navigate("/sugsignin");
  }, [session]);

  
  if (user?.message === "Token has expired") {
    localStorage.removeItem("sugDetails");
    navigate("/sugsignin");
    return null;
  }
 
  if (session) {
    return children;
  }
}
