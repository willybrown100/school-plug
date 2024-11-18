import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { getSugPosts } from '../../services/sugApis';

import PerPost from '../../components/PerPost';

import useSchool from '../../hooks/useSchool';
import PageLoader from '../../components/PageLoader';

export default function SugFeed() {
const {id}=useSchool()

const [open, setOpen] = useState(null);
 
  const {data=[],isLoading} = useQuery({
    queryFn: ()=>getSugPosts(id),
    queryKey:["sugposts"]
  });
console.log(data.posts);
if(isLoading)return <PageLoader/>


  return (
    <section className="mt-[4.5rem] min-h-screen pb-[10rem]">
      {data?.posts?.length === 0 && (
        <div className="flex justify-center items-center min-h-[calc(100vh-4.5rem)]">
          <h4 className="capitalize text-stone-700">
            Nothind here yet, start by creating a post
          </h4>
        </div>
      )}
      <ul className="flex flex-col gap-y-2 items-center">
        {data?.posts?.map((item) => {
          const postId = item?._id;
          if (!postId) return null; // Skip the item if there's no ID

          return (
            <PerPost
              item={item}
              key={postId}
              open={open === postId}
              onClick={() =>
                setOpen((prev) => (prev === postId ? null : postId))
              }
            />
          );
        })}
      </ul>
    </section>
  );
}
