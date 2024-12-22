import { useQuery } from '@tanstack/react-query';
import React from 'react'
import PageLoader from '../components/PageLoader';


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
  const reference = localStorage.getItem("payment_reference");

  const { data: paymentStatus, error, isLoading } = useQuery(
    ["verifyPayment", reference],
    async () => {
      if (!reference) {
        throw new Error("Payment reference not found. Unable to verify payment.");
      }
      const response = await fetch(
        `https://student-plug.onrender.com/api/schoolEvent/verify/${reference}`
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

  if (isLoading) return <PageLoader/>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
console.log(paymentStatus?.data);
  return (
    <div className="pt-[10rem]  min-h-[100dvh]">
      <h1 className="text-2xl font-bold">Payment successful</h1>

      <div>
        <div className="flex gap-x-2 items-center">
          <img src="\images\smLogo.png" alt="img" />
          <h3 className="mb-0 text-secondary600 font-semibold font-heading capitalize">
            SchoolPlug
          </h3>
        </div>
      </div>
    </div>
  );
}
