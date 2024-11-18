/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import useUser from "./hooks/useUser";
import useSug from "./hooks/useSug";

// import useSug from "./hooks/useSug";

const WebSocketContext = createContext();

 const WebSocketProvider = ({ children }) => {
     const pathname = window.location.pathname;
     console.log(pathname)
    const {userId}=useUser()
    const { userId:adminId } = useSug();
      const identifier = pathname === "/sughome/sugfeed"?adminId:userId
      console.log(identifier)
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  console.log(notifications)

  useEffect(() => {
    const ws = new WebSocket(
      `wss://student-plug.onrender.com/?userId=${identifier}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
      setNotifications((prev) => [...prev, message]);
    };
      // ws.onmessage = (event) => {
      //   const message = JSON.parse(event.data);
      //   console.log("Received message:", message);

      //   // Check if it's a notification
      //   if (message.event === "newNotification") {
      //     setNotifications((prevNotifications) => [
      //       ...prevNotifications,
      //       message.payload,
      //     ]);
      //   }
      // };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setSocket(null);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, notifications }}>
      {children}
    </WebSocketContext.Provider>
  );
};
export { WebSocketProvider, WebSocketContext };
