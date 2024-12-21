import React from 'react'
import { useEffect, useState } from "react";

export default function EventPaymentReceipt() {


  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the reference from localStorage
    const reference = localStorage.getItem("payment_reference");
console.log(reference)
    if (!reference) {
      setError("Payment reference not found. Unable to verify payment.");
      setLoading(false);
      return;
    }

    // Call the verification API
    async function verifyPayment() {
      try {
        const response = await fetch(
          `https://student-plug.onrender.com/api/schoolEvent/verify/${reference}`
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "Verification failed.");
        }

        const result = await response.json();
        console.log("Payment Verified:", result);
        setPaymentStatus(result);
      } catch (err) {
        console.error("Error Verifying Payment:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, []);

  if (loading) return <p>Verifying payment...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Payment Confirmation</h1>
      {paymentStatus ? (
        <div>
          <p>Payment was successful!</p>
          <p>Reference: {paymentStatus.reference}</p>
          {/* Display more details as needed */}
        </div>
      ) : (
        <p>Unable to verify payment.</p>
      )}
    </div>
  );



}
