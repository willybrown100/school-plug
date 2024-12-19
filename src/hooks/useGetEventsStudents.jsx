import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/sugApis";
import useSchoolInfoIdStudent from "../hooks/useSchoolInfoIdStudent"

export default function useGetEventsStudents() {

    const { schoolInfoId } = useSchoolInfoIdStudent();
  const { data = [], isLoading } = useQuery({
    queryFn: () => getEvents(schoolInfoId),
    queryKey: ["adminevent"],
    enabled: !!schoolInfoId,
  });
  return { data, isLoading };
}
