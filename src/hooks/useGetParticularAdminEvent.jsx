import { useQuery } from '@tanstack/react-query'
import useSug from './useSug';
import { getParticularAdminEvents } from '../services/sugApis';


export default function useGetParticularAdminEvent() {
const {  userId }=useSug()
const { data = [], isLoading } = useQuery({
  queryFn: () => getParticularAdminEvents(userId),
  queryKey:["particularAdminEvent"]
});
return { data ,isLoading};
}
