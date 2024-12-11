import { useQuery } from "@tanstack/react-query";
import useSchoolInfoInd from "./useSchoolInfoInd";
import { getPaymentStatus } from "../services/sugApis";
import { useState } from "react";


export default function useGetPaymentStatus() {
  const [currentPage, setCurrentPage] = useState(1);
   const { schoolInfoId } = useSchoolInfoInd();
  const { data, isLoading, isError, error } = useQuery(
    ["paymentstatus", schoolInfoId, currentPage],
    () => getPaymentStatus(schoolInfoId, currentPage),
    {
      enabled: !!schoolInfoId,
    }
  );
  return { data, isLoading, isError, error, setCurrentPage,currentPage };
}
