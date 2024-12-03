import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SugPerTrends from './SugPerTrends';
import useGetSugTrends from '../../hooks/useGetSugTrends';

export default function SugTrends() {
    const navigate = useNavigate()
    const [open,setOpen]=useState(null)
    const handleClick = function () {
      navigate(-1);
    };
     const { data } = useGetSugTrends();
     const trends = data?.trendingPosts
     console.log(trends)
  return (
    <article className=" bg-stone-50 pb-20">
      <div className="flex gap-x-2 items-center pt-5 mb-5 px-3">
        <button onClick={handleClick} className="bg-transparent">
          <img src="\assets\arrow-left.svg" alt="icon" />
        </button>
        <p className="mb-0 font-semibold capitalize">Trending posts</p>
      </div>
      <ul className="flex flex-col gap-y-[0.01rem]">
        {trends?.map((item) => (
          <SugPerTrends
            item={item}
            key={item.postId}
            open={open === item.postId}
            onClick={() =>
              setOpen((prev) => (prev === item.postId ? null : item.postId))
            }
          />
        ))}
      </ul>
    </article>
  );
}
