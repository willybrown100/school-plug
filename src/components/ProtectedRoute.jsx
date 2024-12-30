/* eslint-disable react/prop-types */
import  { useEffect, useMemo, useState } from "react";
import useUser from "../hooks/useUser";
import { useSocket } from "./SocketProvider";
import useFetchNotification from "../hooks/useFetchNotification";
import { useNavigate } from "react-router-dom";

// import Loader from "./Loader";


// export default function ProtectedRoute({ children }) {
//   const { token } = useUser();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const { token: userToken } = useUser();

//   const {isLoading}=useFetchNotification()
//   console.log(isLoading)
// const { notification, setNotification,socket, setSocket } = useSocket();

//   const { userId: studentId } = useUser();
 
// console.log(notification);
//   // Memoize the userId based on the pathname
//   const userId = useMemo(() => {
//     return  studentId 
//   }, [ studentId]);

//   // Memoize the WebSocket URL
//   const url = useMemo(() => "wss://student-plug.onrender.com", []); // to   secure WebSocket connection

//   useEffect(() => {
//     // Create a WebSocket instance only when the component mounts
//     const ws = new WebSocket(url);

//     // Store the socket instance in state
//     setSocket(ws);

//     // Set up event listeners only after the socket is created
//     ws.onopen = () => {
//       if (userId) {
//  ws.send(JSON.stringify({ userId, token:userToken })); 
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


// const startPing = () => {
//   setInterval(() => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       console.log("Sending ping to server...");
//       socket.send(JSON.stringify({ type: "ping" })); // Optional: You can add a specific "ping" message
//     }
//   }, 25000); // Ping every 25 seconds to match server's 30-second interval
// };
// startPing()
//     // Cleanup WebSocket connection on unmount
//     return () => {
//       if (ws.readyState === WebSocket.OPEN) {
//         ws.close();
//       }
//     };

//   }, [url, userId]); 


//   useEffect(() => {
 
//       if (!token) {
//         console.log(
//           "User is not authenticated, "
//         );
        
//         return; 
//       }


//   }, [userToken]);
//   const [load, setLoad] = useState(false);
//   const session = token;


//   if (user?.message === "Invalid Token") {
//     localStorage.removeItem("userDetails"); // Clear local storage
//     navigate("/signin"); // Redirect to the sign-in page
//   }
//   useEffect(() => {
//     async function getAuthUser(token) {
//       try {
//         setLoad(true);
//         const response = await fetch(
//           "https://student-plug.onrender.com/api/auth/getuser",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const result = await response.json();

//         setUser(result);
//         return result;
//       } catch (error) {
//         console.log(error);
//         throw error;
//       } finally {
//         setLoad(false);
//       }
//     }
//     getAuthUser(token);
//   }, [token]);

//   useEffect(() => {
//     if (!session) navigate("/signin");
//   });

//   if (load) {
//     // return <Loader />;
//   }
//   if (session) {
//     return children;
//   }
// }




export default function ProtectedRoute({ children }) {
  const { token: userToken, userId: studentId } = useUser();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { notification, setNotification, setSocket,socket } = useSocket();
  const { isLoading } = useFetchNotification();

  console.log(isLoading,socket);
  console.log(notification);

  const session = userToken;

  // Memoize userId and WebSocket URL
  const userId = useMemo(() => studentId, [studentId]);
  const url = useMemo(() => "wss://student-plug.onrender.com", []);

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);
    
  if (!userId || !userToken) {
    console.warn("Cannot open WebSocket: Missing userId or userToken");
    return;
  }

    // const startPing = () => {
    //   const pingInterval = setInterval(() => {
    //     if (ws.readyState === WebSocket.OPEN) {
    //       console.log("Sending ping to server...");
    //       ws.send(JSON.stringify({ type: "ping" }));
    //     }
    //   }, 25000);

    //   return () => clearInterval(pingInterval);
    // };


ws.onopen = () => {
  if (userId && userToken) {
    // Send the userId and token immediately upon connection
    ws.send(JSON.stringify({ userId, token: userToken }));    
    console.log("Sent user ID to server:", userId);
    // Now that credentials are sent, start sending pings
    // startPing();
  } else {
    console.error("User credentials are missing!");
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
          setTimeout(() => {
            // Attempt to reconnect after 3 seconds
            console.log("Attempting to reconnect...");
            setSocket(new WebSocket(url));
          }, 3000);
    };
  ws.onping = () => {
    console.log("Ping received from server. Sending pong...");
    ws.pong(); // Respond with pong to keep the connection alive
  };

    // Cleanup WebSocket connection
    return () => {
       if (ws.readyState === WebSocket.OPEN) {
         ws.close();
       }
    };
  }, [url, userId, userToken, setNotification, setSocket]);

  useEffect(() => {
    if (!session) {
      console.log("User is not authenticated.");
      navigate("/signin");
    }
  }, [session, navigate]);


    if (user?.message === "Invalid Token") {
    localStorage.removeItem("userDetails"); // Clear local storage
    navigate("/signin"); // Redirect to the sign-in page
  }
  useEffect(() => {
    const fetchUser = async (token) => {
      try {

        const response = await fetch(
          "https://student-plug.onrender.com/api/auth/getuser",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const result = await response.json();
        setUser(result);

        if (result?.message === "Invalid Token") {
          localStorage.removeItem("userDetails");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } 
    };

    if (userToken) fetchUser(userToken);
  }, [userToken, navigate]);



  if (session) {
    return children;
  }

  return null;
}









