import React from 'react'
import Button from '../ui/Button';
import useGetReceipt from '../hooks/useGetReceipt';
import {  formatDates, formatNaira } from '../utils/dateFormat';
import jsPDF from "jspdf";
import BlueMiniLoader from '../ui/BlueMiniLoader';

export default function PaymentReceipt() {
  const {data,isLoading}=useGetReceipt()

  const { fullName, lastName, regNo, department,amount, academicLevel ,reference,time
} =
    data || {};
console.log(data)
    const downloadReceipt = () => {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("SUG Payment Receipt", 20, 20);

      // Add user info
      doc.setFontSize(12);
      doc.text(`Payment Made By: ${fullName} ${lastName}`, 20, 40);
      doc.text(`Reg No: ${regNo}`, 20, 50);
      doc.text(`Department: ${department}`, 20, 60);
      doc.text(`Academic Year: ${academicLevel}`, 20, 70);

      // Add payment details
      doc.text(`Amount Paid: ${formatNaira(amount)}`, 20, 90);
      doc.text(`Payment Date: ${formatDates(
time
)}`, 20, 100);
      doc.text(`Reference: ${reference}`, 20, 110);

      // Save the PDF
      doc.save("receipt.pdf");
    };
  return (
    <article className="min-h-screen  max-sm:pt-[7.5rem] md:pt-[9.8rem] lg:pt-[5.4rem] pb-[8rem] bg-white p-2">
      <h4 className="text-center font-semibold my-3">Payment successful</h4>
      <div className="md:max-w-[600px] m-auto">
        <div className="border-[1rem]   border-secondary600 rounded-xl p-2">
          <div className="flex justify-between items-center ">
            <div className="flex gap-x-2 items-center">
              <img src="\images\smLogo.png" alt="img" />
              <h3 className="mb-0 text-secondary600 font-semibold font-heading capitalize">
                SchoolPlug
              </h3>
            </div>
            <p className="mb-0 text-stone-700 text-[0.8rem]">
              SUG Payment Receipt
            </p>
          </div>
          {isLoading ? (
            <div className="flex justify-center">
              <BlueMiniLoader />
            </div>
          ) : (
            <>
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
                  <h4 className="text-[#07B64A] mb-0 text-sm">
                    Payment made by
                  </h4>
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
                  <h4 className="text-[#07B64A] mb-0 text-sm">
                    Academic Year{" "}
                  </h4>
                  <h4 className="mb-0">{academicLevel}</h4>
                </div>
              </div>

              <div className="flex border-t border-stone-300 py-2 justify-between items-center gap-x-2">
                <p className="mb-0 text-secondary600 text-sm capitalize font-semibold">
                  {time}
                </p>
                <p className="mb-0 text-secondary600 text-sm capitalize font-semibold">
                  ref:{reference}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center mt-8 ">
          <Button
            onClick={downloadReceipt}
            className="text-stone-50 px-5 max-md:m-auto md:ml-auto lg:m-auto lg:bg-transparent lg:text-secondary600 lg:border borde border-secondary600"
          >
            Download Reciept
          </Button>
        </div>
      </div>
  
    </article>
    
  );
}
