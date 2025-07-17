import { useQuery } from "@tanstack/react-query";
import { getReceipt } from "../services/contactApi";


export default function useGetReceipt() {


 const refNo =localStorage.getItem("latestTransaction")
 console.log(refNo)
const ref = refNo ? JSON.parse(refNo) : null;
 console.log("ref number",ref?.reference)

 const { data, isLoading } = useQuery({
   queryFn: () => getReceipt(ref?.reference),
   queryKey: ["receipt"],

 });
 return { data, isLoading }; 
}
