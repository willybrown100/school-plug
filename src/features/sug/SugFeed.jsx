
import React, { useEffect, useRef, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {  Pagination } from "swiper/modules"; 
import PerPost from '../../components/PerPost';
import PageLoader from '../../components/PageLoader';

import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

import useGetSugTrends from '../../hooks/useGetSugTrends';
import useGetSugPosts from '../../hooks/useGetSugPosts';
import BlueMiniLoader from '../../ui/BlueMiniLoader';




export default function SugFeed() {
  const [open, setOpen] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const loadMoreRef = useRef(null);
  const {
    data,
    isLoading,
    hasNextPage,
    isError,
    fetchNextPage,
    error,
    isFetchingNextPage,
    prefetchNextPage,
  } = useGetSugPosts();
  const posts = data?.pages.flatMap((page) => page.posts) || [];
  // Trigger Prefetching
  useEffect(() => {
    if (hasNextPage && data?.pages.length) {
      const lastPage = data.pages[data.pages.length - 1];
      const postsLength = lastPage.posts.length;

      if (postsLength > 0) {
        prefetchNextPage();
      }
    }
  }, [data, hasNextPage]);

  console.log(isFetchingNextPage);
  useEffect(() => {
    const handleObserver = (entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        console.log("Fetching next page...");
        fetchNextPage();
      }
    };

    const loadMoreNode = loadMoreRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (loadMoreNode) {
      observer.observe(loadMoreNode);
    }

    return () => {
      if (loadMoreNode) {
        observer.unobserve(loadMoreNode);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  const toggleText = () => setIsExpanded((prev) => !prev);
  const { data: trendz } = useGetSugTrends();
  const trends = trendz?.trendingPosts;
  console.log(trends);

  if (isLoading) return <PageLoader />;
    if (isError)
      return <div className="text-red-500">Error: {error.message}</div>;
  return (
    <section className="pt-[6.2rem] bg-stone-100 min-h-screen pb-[10rem]">
      {trends?.length >= 1 && (
        <article className="px-4 pb-2 z-[-1]">
          <div className="flex justify-between ">
            <h4 className="font-semibold">trending post</h4>
            <Link
              to="/sughome/sugtrends"
              className="flex items-center text-secondary600 gap-x-2 mb-0 capitalize"
            >
              see all{" "}
              <FaArrowRightLong className="text-secondary600 cursor-pointer text-sm" />
            </Link>
          </div>
          <Swiper
            modules={[Pagination]}
            spaceBetween={6}
            slidesPerView={trends.length >= 3 ? 2.1 : trends.length}
            navigation={false}
            pagination={false}
          >
            {trends.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="border bg-white border-stone-300 p-1 overflow-hidden rounded-md h-[42vh] grid grid-rows-[auto,auto,1fr,auto]">
                  <p className="mb-0 text-stone-700">post:</p>
                  <p className="  break-words max-full text-sm ">
                    {isExpanded ? item.text : item.text.slice(0, 18)}
                    {item.text.length > 18 && (
                      <span
                        onClick={toggleText}
                        className="text-stone-600 cursor-pointer ml-1"
                      >
                        {isExpanded ? " less" : "..."}
                      </span>
                    )}
                  </p>
                  <img
                    src={item.images[0]}
                    alt={item.type}
                    className="w-full h-full"
                    loading="lazy"
                  />
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-x-1 items-center">
                      <img src="\assets\like2.svg" />
                      <p className="mb-0 text-sm">{item.likesCount}</p>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <img src="\assets\message-3.svg" />
                      <p className="mb-0 text-sm">{item.commentsCount}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
      )}
      {data?.posts?.length === 0 && (
        <div className="flex justify-center items-center min-h-[calc(100vh-4.5rem)]">
          <h4 className="capitalize text-stone-700">
            Nothind here yet, start by creating a post
          </h4>
        </div>
      )}
      <ul className="flex flex-col gap-y-2 items-center">
        {posts?.map((item) => {
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
      {isFetchingNextPage && (
        <div className="flex justify-center items-center mt-4">
          <BlueMiniLoader />
        </div>
      )}
      <div
        ref={loadMoreRef}
        style={{ height: "1px", background: "transparent" }}
      ></div>
    </section>
  );
}
