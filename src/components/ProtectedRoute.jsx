/* eslint-disable react/prop-types */
import  {  useEffect,   useState } from "react";
import useUser from "../hooks/useUser";
// import { useSocket } from "./SocketProvider";
import useFetchNotification from "../hooks/useFetchNotification";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./SocketProvider";




export default function ProtectedRoute({ children }) {
  const { token: userToken } = useUser();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const {  setNewPost} = useSocket();
  const { isLoading } = useFetchNotification();
  console.log(isLoading);
  const session = userToken;
  // const userId = useMemo(() => studentId, [studentId]);
  // const url = useMemo(() => "wss://student-plug.onrender.com", []);

  //   const createWebSocketConnection = useCallback(() => {
  //     if (!userId || !userToken) {
  //       console.warn("Cannot open WebSocket: Missing userId or userToken");
  //       return null;
  //     }

  //     const ws = new WebSocket(url);
  //     // ws.onopen = () => {
  //     //   console.log("WebSocket connection established");
  //     //   // flushMessageQueue()
  //     //   while (messageBuffer.length > 0) {
  //     //     const bufferedMessage = messageBuffer.shift();
  //     //     socket.send(JSON.stringify(bufferedMessage));
  //     //     console.log("Buffered message sent:", bufferedMessage);
  //     //   }
  //     //   try {
  //     //     ws.send(JSON.stringify({ userId, token: userToken }));
  //     //     console.log("Sent user ID to server:", userId);
  //     //   } catch (error) {
  //     //     console.error("Error sending initial message:", error);
  //     //   }
  //     // };
  //     const flushMessageQueue = () => {
  //       while (messageBuffer.length > 0) {
  //         const bufferedMessage = messageBuffer.shift();
  //         try {
  //           socket.send(JSON.stringify(bufferedMessage));
  //           console.log("Buffered message sent:", bufferedMessage);
  //         } catch (error) {
  //           console.error(
  //             "Error sending buffered message:",
  //             bufferedMessage,
  //             error
  //           );
  //         }
  //       }
  //     };

  //     ws.onopen = () => {
  //       console.log("WebSocket connection established");
  //       flushMessageQueue();
  //       try {
  //         ws.send(JSON.stringify({ userId, token: userToken }));
  //         console.log("Sent user ID to server:", { userId, token: userToken });
  //       } catch (error) {
  //         console.error("Error sending initial message:", error);
  //       }
  //     };

  //     ws.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);
  //         console.log("Message from server:", data);
  //         // setNotification(prevMessages => [...prevMessages, data]);
  //       //  refetchNotifications()
  //       } catch (error) {
  //         console.error("Error processing message:", error);
  //       }
  //     };

  //     ws.onerror = (error) => {
  //       console.error("WebSocket error:", error);
  //     };

  //     ws.onclose = (event) => {
  //       console.log("WebSocket connection closed:", event);
  //       if (!event.wasClean) {
  //         setTimeout(() => {
  //           console.log("Attempting to reconnect...");
  //           const newWs = createWebSocketConnection();
  //           if (newWs) setSocket(newWs);
  //         }, 3000);
  //       }
  //     };

  //     return ws;
  //   }, [url, userId, userToken, setSocket]);

  // const wsRef = useRef(null);

  // useEffect(() => {
  //   if (userId && userToken && !wsRef.current) {
  //     wsRef.current = createWebSocketConnection();
  //     if (wsRef.current) setSocket(wsRef.current);
  //   }

  //   return () => {
  //     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
  //       wsRef.current.close(1000, "Component unmounting");
  //     }
  //     wsRef.current = null;
  //   };
  // }, [userId, userToken, createWebSocketConnection]);




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
    if (!session) {
      console.log("User is not authenticated.");
      navigate("/signin");
    }
  }, [session, navigate]);

  useEffect(() => {
    const fetchUser = async (token) => {
      try {
        const response = await fetch(
          "https://student-plug.onrender.com/api/auth/getuser",
          {
            headers: { Authorization: ` Bearer ${token} ` },
          }
        );
        const result = await response.json();

        if (result?.message === "Invalid Token") {
          localStorage.removeItem("userDetails");
          navigate("/signin");
        } else {
          setUser(result);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userToken) fetchUser(userToken);
  }, [userToken, navigate]);

  if (user?.message === "Invalid Token") {
    localStorage.removeItem("userDetails");
    navigate("/signin");
    return null;
  }

  if (session) {
    return children;
  }

  return null;
}













