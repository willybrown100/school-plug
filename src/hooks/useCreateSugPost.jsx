
import { createSugPost } from '../services/sugApis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useCreateSugPost() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
 const { mutate, isLoading:postLoading } = useMutation({
   mutationFn: createSugPost,
   onSuccess: () => {
     toast.success("post sucessfull,view");
         navigate("/sughome");
     queryClient.invalidateQueries("sugposts");
   },
   onError: (error) => {
     toast.error(error.message);
   },
 });

 
 return { mutate, postLoading }; 
 
}
