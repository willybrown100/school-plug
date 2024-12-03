import { useInfiniteQuery, useQueryClient, } from "@tanstack/react-query";
import useGetRegSchools from "./useGetRegSchools";
import useGetSugUser from "./useGetSugUser";
import { getSugPosts } from "../services/sugApis";


export default function useGetSugPosts() {
    const queryClient = useQueryClient()
 const { data: sugData } = useGetSugUser();
 const uni = sugData?.data?.university;
 const { school } = useGetRegSchools();
 const schools = school?.schools;
 console.log(schools, uni);
 const sch = schools?.filter((item) => item.university === uni);
 const schObj = sch?.at(0);

 const schoolInfoId = schObj?._id;
 console.log(schoolInfoId);
//  const { data = [], isLoading } = useQuery({
//    queryFn: () => getSugPosts(schoolInfoId),
//    queryKey: ["sugposts"],
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
  ["sugposts", schoolInfoId], // Query key
  ({ pageParam = 1 }) => getSugPosts(schoolInfoId, pageParam),
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
         () => getSugPosts(schoolInfoId, nextPage)
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
