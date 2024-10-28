import React, { createContext, useState } from 'react'
import { formatDate } from './utils/dateFormat';



const DateContext = createContext();
 function DateProvider({ children }) {
     const [selectedDate, setSelectedDate] = useState(null);
     const [selectedDate2, setSelectedDate2] = useState(null);
   const [selectedFile, setSelectedFile] = useState(null);
      const [facultyFiles, setFacultyFiles] = useState({});
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
       }}
     >
       {children}
     </DateContext.Provider>
   );
 }
export { DateProvider, DateContext };
