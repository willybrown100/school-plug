import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getSugPosts } from '../../services/sugApis';
import useSug from '../../hooks/useSug';
import PerPost from '../../components/PerPost';
import Loader from '../../components/Loader';

export default function SugFeed() {
  const { userId } = useSug();
  const {data=[],isLoading} = useQuery({
    queryFn: ()=>getSugPosts(userId),
    queryKey:["sugposts"]
  });
console.log(data);
if(isLoading)return <Loader/>

  return (
    <section className="py-4 min-h-screen bg-stone-100">
      <ul className="flex flex-col gap-y-2 items-center">
        {data.length === 0 ? (
          <div className='flex justify-center items-center'>
            <p>Nothind here yet, start by creating a post </p>
          </div>
        ) : (
          data?.posts?.map((item) => <PerPost item={item} />)
        )}
      </ul>
    </section>
  );
}
