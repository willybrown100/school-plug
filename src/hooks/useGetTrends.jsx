import { useQuery } from '@tanstack/react-query'

import { getTrends } from '../services/contactApi';
import useGetUser from './useGetUser';
import useGetRegSchools from './useGetRegSchools';

export default function useGetTrends() {
      const { data: authStudent } = useGetUser();
      const { studentInfo } = authStudent;
      const uni = studentInfo?.university;
      console.log(uni);
      const { school } = useGetRegSchools();
       
  const schools = school?.schools;
  const sch = schools?.filter((item) => item.university === uni);
  const schObj = sch?.at(0);
  const schoolInfoId = schObj?._id;
  console.log(schoolInfoId);
const { data = [], isLoading } = useQuery({
  queryFn: () => getTrends(schoolInfoId),
  queryKey: ["trends"],
  enabled: !!schoolInfoId,
});
  return { data, isLoading };
}
