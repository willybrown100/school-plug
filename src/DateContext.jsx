/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

const DateContext = createContext();
function DateProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [facultyFiles, setFacultyFiles] = useState({});
    const [socket, setSocket] = useState(null);
  const [fileName, setFileName] = useState("");
  return (
    <DateContext.Provider
      value={{
        setSelectedDate2,
        selectedDate2,
        selectedDate,
        setSelectedDate,
        selectedFile,
        setSelectedFile,
        fileName,
        setFileName,
        facultyFiles,
        setFacultyFiles,
        socket,
        setSocket,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}
export { DateProvider, DateContext };
