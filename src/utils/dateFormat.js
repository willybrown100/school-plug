import { PDFDocument } from "pdf-lib";

import { format } from "date-fns";

export default function dateFormat(date) {
  return format(date, "dd/mm/yyyy");
}
export const formatDate = (date) => {
  if (!date) {
    return ""; // Return an empty string or a placeholder if the date is null
  }

  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const convertDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getYearFromISODate = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const optionSplit = function (option) {
  const splitString = option.replace(/([a-z])([A-Z])/g, "$1 $2");
  return splitString; // Outputs: "faculty Fee
};

export function readFileAsBlob(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file); // Reads file fully into memory
  });
}

export async function compressPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Save optimized PDF (removes unnecessary data)
  const pdfBytes = await pdfDoc.save({ useObjectStreams: false });

  return new File([pdfBytes], file.name, { type: "application/pdf" });
}


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

export function notificationType(title) {
  switch (title) {
    case "Your post was liked":
      return "/assets/like2.svg";
    case "Your post has new comments":
      return "/assets/message-text.svg";
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
  const month = date.toLocaleString("default", { month: "short" }); // Short month name
  const year = date.getFullYear();
  // const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  // const minutes = date.getMinutes().toString().padStart(2, "0"); // Pad single digits
  // const ampm = date.getHours() >= 12 ? "pm" : "am";

  // Adding the ordinal suffix to the day
  const daySuffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${daySuffix(
    day
  )} ${month}, ${year}`;
}

export function formatText(text) {
  return text.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export async function uploadWithRetries(url, formData, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      console.log(`Uploading... Attempt ${attempt + 1}`);

      // Set a timeout for the request
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000); // 60 sec timeout

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeout); // Clear timeout if request completes

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Upload failed.");
      }

      return await response.json();
    } catch (error) {
      console.error(`Upload failed (Attempt ${attempt + 1}):`, error.message);
      if (attempt === maxRetries - 1) throw error;
      attempt++;
      await new Promise((res) => setTimeout(res, 2000)); // Wait before retrying
    }
  }
}
