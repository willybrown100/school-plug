import { useQuery } from "@tanstack/react-query";
import { getReceipt } from "../services/contactApi";


export default function useGetReceipt() {


 const refNo =localStorage.getItem("prevRefNumber")
 console.log(refNo)



 const { data, isLoading } = useQuery({
   queryFn: () => getReceipt(refNo),
   queryKey: ["receipt"],
 refetchOnWindowFocus: false,
 });
 return { data, isLoading }; 
}
