/* eslint-disable react/prop-types */

import React, { createContext, useContext, useState } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
const [notification,setNotification]=useState([])
const [newPost,setNewPost]=useState(null)
const [socket,setSocket]=useState(null)

// const messageQueue = [];

// const sendMessage = (message) => {
//   if (socket && socket.readyState === WebSocket.OPEN) {
//     socket.send(JSON.stringify(message));
//     console.log("Message sent:", message);
//   } else {
//     console.warn("WebSocket not ready. Queuing message:", message);
//     // messageQueue.push(message);
//   }
// };

let messageBuffer = [];

const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    while (messageBuffer.length > 0) {
      const bufferedMessage = messageBuffer.shift();
      socket.send(JSON.stringify(bufferedMessage));
      console.log("Buffered message sent:", bufferedMessage);
    }

    socket.send(JSON.stringify(message));
    console.log("Message sent:", message);
  } else {
    console.warn("WebSocket not ready. Buffering message:", message);
    messageBuffer.push(message);
  }
};


    

// const flushMessageQueue = () => {
//   while (messageQueue.length > 0 && socket.readyState === WebSocket.OPEN) {
//     const message = messageQueue.shift();
//     socket.send(JSON.stringify(message));
//     console.log("Flushed message from queue:", message);
//   }
// };

  return (
    <SocketContext.Provider
      value={{
        notification,
        socket,
        setSocket,
        sendMessage,
        messageBuffer,
        setNotification,
        newPost,
        setNewPost,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
