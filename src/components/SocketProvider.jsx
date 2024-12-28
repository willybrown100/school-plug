/* eslint-disable react/prop-types */

import React, { createContext, useContext, useState } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
const [notification,setNotification]=useState([])
const [socket,setSocket]=useState(null)

  return (
    <SocketContext.Provider value={{ notification,socket,setSocket, setNotification }}>
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
