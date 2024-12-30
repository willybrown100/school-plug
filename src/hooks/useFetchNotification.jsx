import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserNotification } from "../services/contactApi";
import useUser from "./useUser";
import { useSocket } from "../components/SocketProvider";


// export default function useFetchNotification() {
//     const {setNotification}=useSocket()
//     const {userId}=useUser()
//  const { data=[],isLoading } = useQuery({
//    queryFn: () => getUserNotification(userId),
//    queryKey:["notification"]
//  });
// setNotification(data);

//  return { data, isLoading };
// }


import { useEffect } from "react";
export default function useFetchNotification() {
  const queryClient = useQueryClient();
  const { setNotification } = useSocket();
  const { userId } = useUser();

  const { data = [], isLoading } = useQuery({
    queryFn: () => getUserNotification(userId),
    queryKey: ["notification"],
  });

  useEffect(() => {
    if (data.length > 0) {
      setNotification(data);
    }
  }, [data, setNotification]);

  const refetchNotifications = () =>
    queryClient.invalidateQueries("notification");

  return { data, isLoading, refetchNotifications };
}
// export default function useFetchNotification() {
//   const { setNotification } = useSocket(); // Assuming setNotification is from context
//   const { userId } = useUser();

//   const { data = [], isLoading } = useQuery({
//     queryFn: () => getUserNotification(userId),
//     queryKey: ["notification"],
//   });

//   useEffect(() => {
//     if (data.length > 0) {
//       setNotification(data); // Update the notification state only when the data changes
//     }
//   }, [data, setNotification]); // This effect depends on `data` to run only when it changes

//   return { data, isLoading };
// }
