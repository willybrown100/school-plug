/* eslint-disable react/prop-types */
import  { useEffect, useMemo, useState } from "react";
import useUser from "../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "./SocketProvider";
import useFetchNotification from "../hooks/useFetchNotification";
import useSug from "../hooks/useSug";
// import Loader from "./Loader";


export default function ProtectedRoute({ children }) {
  const { token } = useUser();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { token: userToken } = useUser();



  // const [messages, setMessages] = useState([]);
  const {isLoading}=useFetchNotification()
  console.log(isLoading)
const { notification, setNotification, setSocket } = useSocket();
  const { pathname } = useLocation();
  const { userId: studentId } = useUser();
  const { userId: adminId } = useSug();
console.log(notification);
  // Memoize the userId based on the pathname
  const userId = useMemo(() => {
    return pathname === "/home/homePage/feed" ? studentId : adminId;
  }, [pathname, studentId, adminId]);

  // Memoize the WebSocket URL
  const url = useMemo(() => "wss://student-plug.onrender.com", []); // to   secure WebSocket connection

  useEffect(() => {
    // Create a WebSocket instance only when the component mounts
    const ws = new WebSocket(url);

    // Store the socket instance in state
    setSocket(ws);

    // Set up event listeners only after the socket is created
    ws.onopen = () => {
      if (userId) {
        ws.send(JSON.stringify({ type: "user-connect", userId }));
        console.log("Sent user ID to server:", userId);
      }
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
         console.log("Message from server:", data);
      setNotification((prevMessages) => [...prevMessages, data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [url, userId]); 

  useEffect(() => {
 
      if (!token) {
        console.log(
          "User is not authenticated, "
        );
        
        return; 
      }


  }, [userToken]);
  const [load, setLoad] = useState(false);
  const session = token;


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
    // return <Loader />;
  }
  if (session) {
    return children;
  }
}




// export  function useWebSocket() {
//   const [socket, setSocket] = useState(null); // Initial state is null
//   // const [messages, setMessages] = useState([]);
//   const {isLoading}=useFetchNotification()
//   console.log(isLoading)
// const { notification, setNotification } = useSocket();
//   const { pathname } = useLocation();
//   const { userId: studentId } = useUser();
//   const { userId: adminId } = useSug();
// console.log(notification);
//   // Memoize the userId based on the pathname
//   const userId = useMemo(() => {
//     return pathname === "/home/homePage/feed" ? studentId : adminId;
//   }, [pathname, studentId, adminId]);

//   // Memoize the WebSocket URL
//   const url = useMemo(() => "https://student-plug.onrender.com", []); // to wss for secure WebSocket connection

//   useEffect(() => {
//     // Create a WebSocket instance only when the component mounts
//     const ws = new WebSocket(url);

//     // Store the socket instance in state
//     setSocket(ws);

//     // Set up event listeners only after the socket is created
//     ws.onopen = () => {
//       if (userId) {
//         ws.send(JSON.stringify({ type: "user-connect", userId }));
//         console.log("Sent user ID to server:", userId);
//       }
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//          console.log("Message from server:", data);
//       setNotification((prevMessages) => [...prevMessages, data]);
//     };

//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     ws.onclose = (event) => {
//       console.log("WebSocket connection closed:", event);
//     };

//     // Cleanup WebSocket connection on unmount
//     return () => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.close();
//       }
//     };
//   }, [url, userId]); // Effect depends on `url` and `userId`

//   return { notification, socket };
// }
