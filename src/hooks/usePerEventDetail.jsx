import { useQuery } from "@tanstack/react-query";
import { sugEventDetails } from "../services/sugApis";
import { useParams } from "react-router-dom";


export default function usePerEventDetail() {
      const { id } = useParams();
      console.log(id)
  const { data, isLoading } = useQuery({
    queryFn: () => sugEventDetails(id),
    queryKey: ["perEventDetail"],
    staleTime: 0,
  });
  return { data, isLoading };
}
