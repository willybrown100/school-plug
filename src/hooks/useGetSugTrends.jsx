import useGetSugUser from './useGetSugUser';
import useGetRegSchools from './useGetRegSchools';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../services/contactApi';

export default function useGetSugTrends() {
 const { data: sugData } = useGetSugUser();
 const uni = sugData?.data?.university;
 const { school } = useGetRegSchools();
 const schools = school?.schools;

 const sch = schools?.filter((item) => item.university === uni);
 const schObj = sch?.at(0);

 const schoolInfoId = schObj?._id;
 console.log(schoolInfoId);
 const { data = [], isLoading } = useQuery({
   queryFn: () => getTrends(schoolInfoId),
   queryKey: ["sugtrends"],
   enabled: !!schoolInfoId,
 });

 return {data,isLoading}
}
