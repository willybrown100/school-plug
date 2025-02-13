
import useGetUser from './useGetUser';
import { useQuery } from '@tanstack/react-query';
import { getEventCardDetails } from '../services/contactApi';

export default function useGetEventPaymentDetails(eventId) {
  console.log(eventId)
    const { data: datas } = useGetUser();
    const email = datas?.user?.email;
     const { data: dataz, isLoading: isComing } = useQuery({
       queryFn: () => getEventCardDetails(email, eventId),
       queryKey: ["eventCardDetails"],
       enabled: !!email || eventId,
     });
  return { dataz ,isComing};
}
