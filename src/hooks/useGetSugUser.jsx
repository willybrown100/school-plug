import React from 'react'
import useSug from './useSug';
import { useQuery } from '@tanstack/react-query';
import {getAuthSug} from "../services/sugApis"
export default function useGetSugUser() {
const { userId } = useSug();
console.log(userId)


   const { data = [], isLoading } = useQuery({
     queryFn: () => getAuthSug(userId),
     queryKey: ["sug"],
   });

   return { data, isLoading };
}
