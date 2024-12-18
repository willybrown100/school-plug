/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect, useContext } from "react";
import useUser from "./hooks/useUser";
import useSug from "./hooks/useSug";
import { io } from "socket.io-client";
// import { getMessaging, getToken } from "firebase/messaging";


const WebSocketContext = createContext()
export const WebSocketProvider = ({ children }) => {


  // const messaging = getMessaging();

  // async function requestNotificationPermission() {
  //   try {
  //     const permission = await Notification.requestPermission();
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");
  //       const token = await getToken(messaging, {
  //         vapidKey:
  //           "BNKKIoMgttf2Vqkqui9YQWgatPkhRZuvCUj0RsMsUdh-_07oTR3lqzDJ8ao5_WcOW8m56FXefe8UJZzecBLwYCk",
  //       });
  //       console.log("FCM Token:", token);
  //       // Send the token to your backend to associate it with the user
  //       await fetch("/save-fcm-token", {
  //         method: "POST",
  //         body: JSON.stringify({ token }),
  //         headers: { "Content-Type": "application/json" },
  //       });
  //     } else {
  //       console.error("Notification permission denied.");
  //     }
  //   } catch (error) {
  //     console.error("Error getting notification permission:", error);
  //   }
  // }

  // requestNotificationPermission();

  const pathname = window.location.pathname;
  const { userId } = useUser();
  const { userId: adminId } = useSug();
  const user = pathname === "/sughome/sugfeed" ? adminId : userId;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("Initializing socket connection...");
    const newSocket = io("https://student-plug.onrender.com", {
      query: { userId: user },
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
    });

    newSocket.on("post_liked", (data) => {
      console.log("Client received post_liked event:", data);
    });

    setSocket(newSocket);

    return () => {
      console.log("Cleaning up socket...");
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};


export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};