
import useGetUser from './useGetUser';
import { useQuery } from '@tanstack/react-query';
import { getEventCardDetails } from '../services/contactApi';

export default function useGetEventPaymentDetails(eventId) {

    const { data: datas } = useGetUser();
    const email = datas?.user?.email;
     const { data: dataz, isLoading: isComing,refetch,isRefetching } = useQuery({
       queryFn: () => getEventCardDetails(email, eventId),
       queryKey: ["eventCardDetails"],
       enabled: !!email || !!eventId,
        refetchOnWindowFocus: false,
     });
  return { dataz ,isComing,refetch,isRefetching};
}






