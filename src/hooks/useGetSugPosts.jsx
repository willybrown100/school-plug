import { useInfiniteQuery, useQueryClient, } from "@tanstack/react-query";
import useGetRegSchools from "./useGetRegSchools";
import useGetSugUser from "./useGetSugUser";
import { getSugPosts } from "../services/sugApis";
import useSug from "./useSug";


export default function useGetSugPosts() {
    const queryClient = useQueryClient()
 const { data: sugData } = useGetSugUser();
 const {token} = useSug()
 const uni = sugData?.data?.university;
 const { school } = useGetRegSchools();
 const schools = school?.schools;

 const sch = schools?.filter((item) => item.university === uni);
 const schObj = sch?.at(0);

 const schoolInfoId = schObj?._id;



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
  ({ pageParam = 1 }) => getSugPosts(schoolInfoId, pageParam,token),
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
         () => getSugPosts(schoolInfoId, nextPage,token)
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
