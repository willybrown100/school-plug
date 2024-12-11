import { useQuery } from "@tanstack/react-query";
import useGetUser from "./useGetUser";
import { getReceipt } from "../services/contactApi";


export default function useGetReceipt() {
 const { data: datas } = useGetUser();
 const email = datas?.user?.email;
 console.log(email);
 const { data, isLoading } = useQuery({
   queryFn: () => getReceipt(email),
   queryKey: ["receipt"],
   enabled: !!email,
 });
 return { data, isLoading }; 
}
