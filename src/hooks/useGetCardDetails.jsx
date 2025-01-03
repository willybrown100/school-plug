import { useQuery } from '@tanstack/react-query'
import { getCardDetails } from '../services/contactApi';
import useGetUser from './useGetUser';


export default function useGetCardDetails() {
    const {data:datas}=useGetUser()
    const email =datas?.user?.email;
    console.log(email)
const { data,isLoading } = useQuery({
  queryFn: ()=>getCardDetails(email),
  queryKey:["cardDetails"],
  enabled:!!email
});
return { data, isLoading }; 
}
