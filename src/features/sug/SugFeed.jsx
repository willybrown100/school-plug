import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { getSugPosts } from '../../services/sugApis';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {  Pagination } from "swiper/modules"; 
import PerPost from '../../components/PerPost';
import PageLoader from '../../components/PageLoader';
import useGetRegSchools from '../../hooks/useGetRegSchools';
import useGetSugUser from '../../hooks/useGetSugUser';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';




export default function SugFeed() {
const [open, setOpen] = useState(null);
 const [isExpanded, setIsExpanded] = useState(false);

const { data:sugData } = useGetSugUser();
const uni = sugData?.data?.university
const { school } = useGetRegSchools();
 const schools = school?.schools;
 console.log(schools, uni);
 const sch = schools?.filter((item) => item.university === uni);
 const schObj = sch?.at(0);
 
 const schoolInfoId = schObj?._id;
 console.log(schoolInfoId);
  const { data = [], isLoading } = useQuery({
    queryFn: () => getSugPosts(schoolInfoId),
    queryKey: ["sugposts"],
    enabled: !!schoolInfoId,
  });
console.log(data.posts);
  const toggleText = () => setIsExpanded((prev) => !prev);
if(isLoading)return <PageLoader/>

const trends = [
  {
    id:1,
    type: "post",
    postText: "we are inviting u to our felowship in nyabatwch govt scholllll",
    image: "/images/yabatech.png",
    likes:100,
    comment:1000
  },
  {
      id:2,
    type: "post",
    postText: "we are inviting u to our felowship in nyabatwch govt scholllll",
    image: "/images/yabatech.png",
    likes:100,
    comment:1000
  },
  {
      id:3,
    type: "post",
    postText: "we are inviting u to our felowship in nyabatwch govt scholllll",
    image: "/images/yabatech.png",
    likes:100,
    comment:1000
  },
];
  return (
    <section className="pt-[6.2rem] bg-stone-100 min-h-screen pb-[10rem]">
      {trends && (
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
            spaceBetween={20}
            slidesPerView={trends.length >= 3 ? 2.3 : trends.length}
            navigation={false}
            pagination={false}
          >
            {trends.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="border bg-white border-stone-300 p-1 rounded-md">
                  <p className="mb-0 text-stone-700">post:</p>
                  <p className="  break-words max-full text-sm ">
                    {isExpanded ? item.postText : item.postText.slice(0, 24)}
                    {item.postText.length > 24 && (
                      <span
                        onClick={toggleText}
                        className="text-stone-600 cursor-pointer ml-1"
                      >
                        {isExpanded ? " less" : "..."}
                      </span>
                    )}
                  </p>
                  <img src={item.image} alt={item.type} className="w-full " loading='lazy' />
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-x-1 items-center">
                      <img src="\assets\like2.svg" />
                      <p className="mb-0 text-sm">1k</p>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <img src="\assets\message-3.svg" />
                      <p className="mb-0 text-sm">100</p>
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
