import { useQuery } from "@tanstack/react-query";
import { getRegisteredSchools } from "../services/sugApis";


export default function useGetRegSchools() {
    const { data: school = [] } = useQuery({
      queryFn: getRegisteredSchools,
      queryKey: ["regSchools"],
    }); 
    return { school };
}
