
import useGetRegSchools from './useGetRegSchools';
import {  useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getParticularSchData } from '../services/contactApi';
import useGetUser from './useGetUser';

export default function useGetRegisteredSchools() {
    const queryClient = useQueryClient();
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

//  const { data = [], isLoading } = useQuery({
//    queryFn: () => getParticularSchData(schoolInfoId),
//    queryKey: ["schoolpost"],
//    enabled: !!schoolInfoId,
//  }); 

const {
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isError,
  error,
  isFetchingNextPage,
} = useInfiniteQuery(
  ["schoolpost", schoolInfoId], // Query key
  ({ pageParam = 1 }) => getParticularSchData(schoolInfoId, pageParam),
  {
    enabled: !!schoolInfoId,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  }
);

 const prefetchNextPage = async () => {
   if (hasNextPage) {
     const nextPage = data?.pages[data.pages.length - 1]?.currentPage + 1;

     if (nextPage) {
       await queryClient.prefetchQuery(
         ["schoolpost", schoolInfoId, nextPage], // Unique key for the next page
         () => getParticularSchData(schoolInfoId, nextPage)
       );
     }
   }
 };


 return {
   data,
   isLoading,
   fetchNextPage,
   hasNextPage,
   isError,
   error,
   isFetchingNextPage,
   prefetchNextPage,
 };
}





