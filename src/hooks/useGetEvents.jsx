import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/sugApis";
import useSchoolInfoInd from "./useSchoolInfoInd";


export default function useGetEvents() {
     const { schoolInfoId } = useSchoolInfoInd();
  const { data = [], isLoading } = useQuery({
    queryFn: () => getEvents(schoolInfoId),
    queryKey: ["adminevent"],
    enabled: !!schoolInfoId,
  });
  return { data ,isLoading};
}
