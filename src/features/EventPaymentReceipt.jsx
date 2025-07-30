import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { formatDates, formatNaira } from '../utils/dateFormat';
import BlueMiniLoader from '../ui/BlueMiniLoader';
import jsPDF from 'jspdf';
import Button from '../ui/Button';


// export default function EventPaymentReceipt() {


//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Get the reference from localStorage
//     const reference = localStorage.getItem("payment_reference");
// console.log(reference)
//     if (!reference) {
//       setError("Payment reference not found. Unable to verify payment.");
//       setLoading(false);
//       return;
//     }

//     // Call the verification API
//     async function verifyPayment() {
//       try {
//         const response = await fetch(
//           `https://student-plug.onrender.com/api/schoolEvent/verify/${reference}`
//         );

//         if (!response.ok) {
//           const errorResponse = await response.json();
//           throw new Error(errorResponse.message || "Verification failed.");
//         }

//         const result = await response.json();
//         console.log("Payment Verified:", result);
//         setPaymentStatus(result);
//       } catch (err) {
//         console.error("Error Verifying Payment:", err);
//         setError(err.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     verifyPayment();
//   }, []);

//   if (loading) return <p>Verifying payment....</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className='pt-[5rem]'>
//       <h1>Payment Confirmation</h1>
//       {paymentStatus ? (
//         <div>
//           <p>Payment was successful!</p>
//           <p>Reference: {paymentStatus.reference}</p>
//           {/* Display more details as needed */}
//         </div>
//       ) : (
//         <p>Unable to verify payment.</p>
//       )}
//     </div>
//   );



// }





export default function EventPaymentReceipt() {
  const reference=localStorage.getItem("prevRefNumber")

  const { data: paymentStatus, error, isLoading } = useQuery(
    ["verifyPayment", reference],
    async () => {
      if (!reference) {
        throw new Error("Payment reference not found. Unable to verify payment.");
      }
      const response = await fetch(
  //  https://student-plug.onrender.com/api/schoolEvent/receipt/09FG250729212858030P5B266
        `https://student-plug.onrender.com/api/schoolEvent/receipt/${reference}`
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Verification failed.");
      }
      return response.json();
    },
    {
      enabled: !!reference, // Only run query if reference exists
      staleTime: Infinity, // Prevent refetching
      cacheTime: 300000,   // Keep data in cache for 5 minutes
    }
  );
    console.log(paymentStatus)


  if (error) return <p className="text-red-500">Error: {error.message}</p>;
const {
  amount,
 fullName,

  regNo,
  department,
  academicLevel,

reference:ref,
date,

 
} = paymentStatus || {};


    const downloadReceipt = () => {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("SUG Payment Receipt", 20, 20);

      // Add user info
      doc.setFontSize(12);
      doc.text(`Payment Made By: ${fullName} `, 20, 40);
      doc.text(`Reg No: ${regNo}`, 20, 50);
      doc.text(`Department: ${department}`, 20, 60);
      doc.text(`Academic Year: ${academicLevel}`, 20, 70);

      // Add payment details
      doc.text(`Amount Paid: ${formatNaira(amount)}`, 20, 90);
      doc.text(`Payment Date: ${formatDates(date)}`, 20, 100);
      doc.text(`Reference: ${reference}`, 20, 110);

      // Save the PDF
      doc.save("receipt.pdf");
    };
  return (
    <article className="pt-[8rem]  min-h-[100dvh] p-3 md:pt-[10rem] lg:pt-[5rem]">
      <h4 className="text-2xl font-bold text-center">Payment successful</h4>
      <div className="border-[1.3rem] border-[#F0AA14] p-3 md:w-[600px] md:mx-auto">
        <div className="flex justify-between    items-center">
          <div className="  ">
            <div className="flex gap-x-2 items-center">
              <img src="\images\smLogo.png" alt="img" />
              <h3 className="mb-0 text-secondary600 font-semibold font-heading capitalize">
                SchoolPlug
              </h3>
            </div>
          </div>
          <h4 className="mb-0 text-stone-600">sug event</h4>
        </div>
        {isLoading && <BlueMiniLoader />}
        <div className="flex border-b border-stone-300 pb-2 justify-center items-center gap-y-2 mt-2 flex-col">
          <img src="\images\popcorn.png" alt="img" />
          <p className="mb-0 text-[#07B64A]">Payment success</p>
          <h4 className="mb-0 font-semibold text-[#07B64A]">
            {formatNaira(amount)}
          </h4>
        </div>

        <h4 className="pt-4">student info</h4>
        <div className="border border-stone-300 border-b mb-3 flex flex-col gap-y-3 bg-stone-50 p-2 rounded-lg">
          <div className="flex flex-col ">
            <h4 className="text-[#07B64A] mb-0 text-sm">Payment made by</h4>
            <h4 className="mb-0">
              {fullName}
            </h4>
          </div>
          <div className="flex flex-col ">
            <h4 className="text-[#07B64A] mb-0 text-sm">Reg No</h4>
            <h4 className="mb-0">{regNo}</h4>
          </div>
          <div className="flex flex-col ">
            <h4 className="text-[#07B64A] mb-0 text-sm">Department</h4>
            <h4 className="mb-0">{department}</h4>
          </div>
          <div className="flex flex-col ">
            <h4 className="text-[#07B64A] mb-0 text-sm">Academic Year </h4>
            <h4 className="mb-0">{academicLevel}</h4>
          </div>
        </div>

        <div className="flex border-t border-stone-300 py-2 justify-between items-center gap-x-2">
          <p className="mb-0 text-secondary600 text-sm capitalize font-semibold">
            {formatDates(date)}
          </p>
          <p className="mb-0 text-secondary600 text-sm capitalize font-semibold">
            ref:{ref}
          </p>
        </div>
      </div>
<div className='flex justify-center mt-4'>

      <Button className="mX-auto" onClick={downloadReceipt}>Download Reciept</Button>
</div>
    </article>
  );
}
