import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../services/contactApi';
import useUser from './useUser';

export default function useGetUser() {
   const { authUserData} = useUser();
   const token = authUserData?.token
   console.log(token)
   const { data=[], isLoading } = useQuery({
     queryFn: () => getAuthUser(token),
     queryKey: ["user"],
     
   });

   return { data, isLoading };
}
