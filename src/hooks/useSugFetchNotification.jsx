import { useQuery, useQueryClient } from '@tanstack/react-query';
import  { useEffect } from 'react'
import { getUserNotification } from '../services/contactApi';
import useSug from "../hooks/useSug"
import { useSocket } from '../components/SocketProvider';
export default function useSugFetchNotification() {

  const queryClient=useQueryClient()
  const { setSugNotification } = useSocket(); // Assuming setSugNotification is from context
  const { userId } = useSug();


  const { data = [],isLoading } = useQuery({
    queryFn: () => getUserNotification(userId),
    queryKey: ["sugnotification"],
    staleTime:0,
    cacheTime:0,
  
  });

  useEffect(() => {
    if (data.length > 0) {
      setSugNotification(data);
    }
  }, [data, setSugNotification]); 

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries("sugnotification");
      
    }, 60 * 1000); 

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [queryClient]);

  return { data, isLoading };
}

