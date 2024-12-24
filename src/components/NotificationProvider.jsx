/* eslint-disable react/prop-types */
// NotificationContext.js

import React, { createContext, useContext, useState } from "react";

// Create a Context for notifications
const NotificationContext = createContext();

// Hook to access the NotificationContext
export const useNotification = () => useContext(NotificationContext);

// Provider component that will store the notifications and provide them globally
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
