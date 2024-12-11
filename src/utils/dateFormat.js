
import { format } from 'date-fns';

export default function dateFormat(date) {
    return format(date,"dd/mm/yyyy");

}
export const formatDate = (date) => {
  if (!date) {
    return ""; // Return an empty string or a placeholder if the date is null
  }

  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
};

// export const formatDate = (date) => {
//   const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
//   const year = date.getFullYear(); // Get full year

//   return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
// };


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

export const optionSplit = function (option) {
  const splitString = option.replace(/([a-z])([A-Z])/g, "$1 $2");
  return splitString; // Outputs: "faculty Fee
};



export function formatNaira(amount) {
  // Convert the number to a fixed decimal string
  const formatted = parseFloat(amount)
    .toFixed(2) // Ensure two decimal places
    .toString()
    .split("."); // Split into integer and decimal parts

  // Add commas to the integer part
  formatted[0] = formatted[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Join back the integer and decimal parts
  return `₦${formatted.join(".")}`;
}

export function getBankLogo(bankName) {
  switch (bankName?.toLowerCase()) {
    case "access bank":
      return "/logos/access-bank.png";
    case "gtbank":
      return "/logos/gtbank.png";
    case "zenith bank":
      return "/logos/zenith-bank.png";
    case "uba":
      return "/logos/uba.png";
    case "first bank":
      return "/images/First-Bank.png";
    default:
      return "/logos/default-bank.png"; // Default logo for unknown banks
  }
}

// Example usage


export function formatDates(isoDate) {
  const date = new Date(isoDate);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // Short month name
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad single digits
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';

  // Adding the ordinal suffix to the day
  const daySuffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${daySuffix(day)} ${month}, ${year}, ${hours}:${minutes}${ampm}`;
}



export function formatText(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2');
}







