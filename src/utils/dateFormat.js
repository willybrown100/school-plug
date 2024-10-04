import React from 'react'
import { format } from 'date-fns';

export default function dateFormat(date) {
    return format(date,"dd/mm/yyyy");

}
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
};


export const convertDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString); // Convert string to Date object

  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
};

// Example usage
const inputDate = 'Thu Jul 11 2024 00:00:00 GMT+0100 (West Africa Standard Time)';
const formattedDate = convertDateToDDMMYYYY(inputDate);
console.log(formattedDate); // Output: "11/07/2024"




export const getYearFromISODate = (dateString) => {
  const date = new Date(dateString); // Convert the ISO string to a Date object
  return date.getFullYear(); // Extract the year
};







