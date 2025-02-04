
import useSug from './useSug';
import { useQuery } from '@tanstack/react-query';
import {getAuthSug} from "../services/sugApis"
export default function useGetSugUser() {
const { userId ,token} = useSug();



   const { data = [], isLoading } = useQuery({
     queryFn: () => getAuthSug(userId,token),
     queryKey: ["sug"],
   });

   return { data, isLoading };
}
