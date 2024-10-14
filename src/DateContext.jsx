import React, { createContext, useState } from 'react'
import { formatDate } from './utils/dateFormat';



const DateContext = createContext();
 function DateProvider({ children }) {
     const [selectedDate, setSelectedDate] = useState(null);
     const [selectedDate2, setSelectedDate2] = useState(null);
   

   return (
     <DateContext.Provider
       value={{
    setSelectedDate2,
        selectedDate2,
         selectedDate,
         setSelectedDate,
       }}
     >
       {children}
     </DateContext.Provider>
   );
 }
export { DateProvider, DateContext };
