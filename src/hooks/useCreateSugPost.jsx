
import { createSugPost } from '../services/sugApis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useCreateSugPost() {
    const [selectedFee, setSelectedFee] = useState({});
    const navigate = useNavigate()
    const queryClient = useQueryClient()
 const { mutate, isLoading:postLoading } = useMutation({
   mutationFn: createSugPost,
   onSuccess: () => {
     toast.success("post sucessfull,view");
         navigate(`${selectedFee?"":"/sughome"}`);
     queryClient.invalidateQueries("sugposts");
   },
   onError: (error) => {
     toast.error(error.message);
   },
 });

   useEffect(() => {
     // Parse the query string whenever the location changes
     const params = new URLSearchParams(location.search);
     const selectedOption = params.get("option");
     const selectedContent = selectedOption
       ? JSON.parse(decodeURIComponent(selectedOption))
       : null;
     setSelectedFee(selectedContent);
   }, [location.search]);
 
 return { mutate, postLoading, selectedFee, setSelectedFee }; 
 
}
