import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useGetPaymentStatus from '../../hooks/useGetPaymentStatus';
import BlueMiniLoader from '../../ui/BlueMiniLoader';

export default function SugViewBills() {
  const navigate = useNavigate();
  const { data, setCurrentPage, isLoading, currentPage } =
    useGetPaymentStatus();
  const { facultyDetails } = data?.data || {};
  const { facultyName, students } = facultyDetails?.at(0) || {};
  const totalPages = data?.data?.pagination?.totalPages || 1;
  const { pagination } = data?.data || {};

  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination?.hasPrevPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleClick = () => {
    navigate(-1);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter students based on the search query
  const filteredStudents = students?.filter((student) =>
    student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <article className="p-[1rem]">
      <div className="flex gap-x-2 items-center mb-5">
        <button onClick={handleClick} className="bg-transparent">
          <img src="\assets\arrow-left.svg" alt="icon" />
        </button>
        <p className="mb-0 font-semibold capitalize">bills</p>
      </div>

      <div className="border-stone-300 p-3 rounded-lg border ">
        <h4 className="font-semibold">
          {isLoading ? <BlueMiniLoader /> : facultyName}
        </h4>
        <form
          className="flex items-center gap-x-2 p-2 border border-stone-500 rounded-lg"
          onSubmit={(e) => e.preventDefault()} // Prevent form submission
        >
          <button type="button">
            <img src="\assets\search-normal.svg" />
          </button>
          <input
            type="search"
            placeholder="Enter reg. number to search"
            className="outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </form>
        <div className="flex justify-between bg-stone-50  p-3 border-b border-b-secondary600 rounded-tl-xl rounded-tr-xl mt-3">
          <h4 className="mb-0">Reg. Number</h4>
          <h4 className="mb-0 ">status</h4>
        </div>
        {filteredStudents?.length === 0 && (
          <p className="flex justify-center capitalize font-semibold">
            No student found in this faculty
          </p>
        )}
        {isLoading ? (
          <div className="flex justify-center">
            <BlueMiniLoader />
          </div>
        ) : (
          <ul className="divide-y divide-stone-300 my-3 h-[60vh] overflow-auto">
            {filteredStudents?.map((item) => (
              <div key={item.RegNo} className="flex p-4 justify-between">
                <h4 className="mb-0 text-stone-800">
                  {item.registrationNumber}
                </h4>
                <div className="flex gap-x-2">
                  <h4
                    className={`mb-0 ${
                      item.status === "Paid"
                        ? "text-secondary600"
                        : "text-[#07B64A]"
                    }`}
                  >
                    {item.status}
                  </h4>
                  <img src={billType(item.status)} alt="icon" />
                </div>
              </div>
            ))}
          </ul>
        )}
        <div className="flex justify-between">
          <button
            onClick={handlePrevPage}
            disabled={!pagination?.hasPrevPage}
            className={` ${
              !pagination?.hasPrevPage ? " bg-secondary400 " : "bg-secondary600"
            }  px-4 py-1 rounded-md`}
          >
            <img src="\assets\arrow-left2.svg" alt="img" />
          </button>
          {/* Pagination Buttons */}
          <div className="flex gap-2">
            {/* First Button (Always Page 1) */}
            <button
              onClick={() => handlePageChange(1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              1
            </button>

            {/* Dynamic Second Button (Should be 2 when on Page 1) */}
            {totalPages > 2 && (
              <button
                onClick={() =>
                  handlePageChange(
                    currentPage === 1
                      ? 2
                      : Math.min(currentPage, totalPages - 1)
                  )
                }
                className={`px-3 py-1 rounded-full ${
                  currentPage ===
                  (currentPage === 1
                    ? 2
                    : Math.min(currentPage, totalPages - 1))
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {currentPage === 1 ? 2 : Math.min(currentPage, totalPages - 1)}
              </button>
            )}

            {/* Last Page Button (Always the last page) */}
            {totalPages > 2 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={!pagination?.hasNextPage}
            className={` px-4 py-1 rounded-md ${
              !pagination?.hasNextPage ? "bg-secondary400 " : "bg-secondary600"
            }`}
          >
            <img src="\assets\arrow-right2.svg" alt="img" />
          </button>
        </div>
      </div>
    </article>
  );
}





const billType = function(type){
switch(type){
    case "Paid":
    return "/assets/arrange-circle.svg";
    case "Unpaid":
    return "/assets/arrange-circle-2.svg";
      default:
     return ""; 
}
}

;






