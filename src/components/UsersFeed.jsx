import React, { useEffect, useRef, useState } from 'react'
import DesktopCreatingPostButton from './DesktopCreatingPostButton';
import DefaultSchool from './DefaultSchool';
import Bills from './Bills';
import UserDetails from './UserDetails';


import useGetRegisteredSchools from "../hooks/useGetRegisteredSchools"
import StudentPerPost from './StudentPerPost';

import PageLoader from './PageLoader';
import BlueMiniLoader from '../ui/BlueMiniLoader';




export default function UsersFeed() {
  const [open, setOpen] = useState(null);
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
  } = useGetRegisteredSchools();


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

  if (isLoading) return <PageLoader />;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen max-sm:pt-[7.5rem] md:pt-[9.8rem] lg:pt-[5.4rem] pb-[8rem]">
      <div className="md:max-w-[1250px] md:w-[90vw] m-auto md:grid lg:grid-cols-[16rem,1fr,auto] md:grid-cols-[16rem,1fr] gap-x-3">
        <UserDetails />
        <div>
          <DefaultSchool data={data} />
          <DesktopCreatingPostButton />
          <ul className="flex flex-col gap-y-2">
            {posts.map((item) => (
              <StudentPerPost
                key={item._id}
                item={item}
                open={open === item._id}
                onClick={() =>
                  setOpen((prev) => (prev === item._id ? null : item._id))
                }
              />
            ))}
          </ul>
          {isFetchingNextPage && (
            <div
           className='flex justify-center items-center mt-4'
            >
              <BlueMiniLoader/>
            </div>
          )}
          <div
            ref={loadMoreRef}
            style={{ height: "1px", background: "transparent" }}
          ></div>
        </div>
        <Bills />
      </div>
    </div>
  );
}
