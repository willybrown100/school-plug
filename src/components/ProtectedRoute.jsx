/* eslint-disable react/prop-types */
import  { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useUser from "../hooks/useUser";
import { useSocket } from "./SocketProvider";
import useFetchNotification from "../hooks/useFetchNotification";
import { useNavigate } from "react-router-dom";




export default function ProtectedRoute({ children }) {

  const { token: userToken, userId: studentId } = useUser();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { setNotification, setSocket, flushMessageQueue } = useSocket();
  const { isLoading,refetchNotifications } = useFetchNotification();
  console.log(isLoading);
  const session = userToken;
  const userId = useMemo(() => studentId, [studentId]);
  const url = useMemo(() => "wss://student-plug.onrender.com", []);

  const createWebSocketConnection = useCallback(() => {
    if (!userId || !userToken) {
      console.warn("Cannot open WebSocket: Missing userId or userToken");
      return null;
    }

    const ws = new WebSocket(url);
    ws.onopen = () => {
      console.log("WebSocket connection established");
      flushMessageQueue()
      try {
        ws.send(JSON.stringify({ userId, token: userToken }));
        console.log("Sent user ID to server:", userId);
      } catch (error) {
        console.error("Error sending initial message:", error);
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Message from server:", data);
        // setNotification(prevMessages => [...prevMessages, data]);
       refetchNotifications()
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      if (!event.wasClean) {
        setTimeout(() => {
          console.log("Attempting to reconnect...");
          const newWs = createWebSocketConnection();
          if (newWs) setSocket(newWs);
        }, 3000);
      }
    };

    return ws;
  }, [url, userId, userToken, setSocket, setNotification]);

  // useEffect(() => {
  //   let ws = null;
  //   let mounted = true;
  //   console.log(mounted)

  //   if (userId && userToken) {
  //     ws = createWebSocketConnection();
  //     if (ws) setSocket(ws);
  //   }

  //   return () => {
  //     mounted = false;
  //     if (ws && ws.readyState === WebSocket.OPEN) {
  //       ws.close(1000, "Component unmounting");
  //     }
  //   };
  // }, [userId, userToken, createWebSocketConnection]);

const wsRef = useRef(null);

useEffect(() => {
  if (userId && userToken && !wsRef.current) {
    wsRef.current = createWebSocketConnection();
    if (wsRef.current) setSocket(wsRef.current);
  }

  return () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.close(1000, "Component unmounting");
    }
    wsRef.current = null;
  };
}, [userId, userToken, createWebSocketConnection]);

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
            headers: { Authorization:` Bearer ${token} `},
          }
        )
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









