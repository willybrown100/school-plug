import React, { useEffect, useRef, useState } from 'react'
import DesktopCreatingPostButton from './DesktopCreatingPostButton';
import DefaultSchool from './DefaultSchool';
import Bills from './Bills';
import UserDetails from './UserDetails';


import useGetRegisteredSchools from "../hooks/useGetRegisteredSchools"
import StudentPerPost from './StudentPerPost';

import PageLoader from './PageLoader';
import BlueMiniLoader from '../ui/BlueMiniLoader';
import { useSocket } from './SocketProvider';
import { useQueryClient } from '@tanstack/react-query';




export default function UsersFeed() {
  const [open, setOpen] = useState(null);
  const loadMoreRef = useRef(null);
    const {  newPost,setNewPost} = useSocket();

const queryClient = useQueryClient()
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
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
queryClient.invalidateQueries("schoolpost");
setNewPost(false)
  };

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
    <article className="min-h-screen max-sm:pt-[7.5rem] md:pt-[9.8rem] lg:pt-[5.4rem] pb-[15rem]">
      <div className=" md:w-[90vw] mx-auto flex justify-center lg:grid-cols-[16rem,25rem,20rem] xl:grid-cols-[16rem,1fr,auto] md:grid grid-cols-[16rem,28rem]  gap-x-3">
        <UserDetails />
        {newPost && (
          <button
            onClick={handleScrollToTop}
            className="fixed bg-white p-2 font-medium shadow-lg rounded-xl capitalize top-40 z-10 "
          >
            new post
          </button>
        )}
        <div className="w-full">
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
            <div className="flex justify-center items-center mt-4">
              <BlueMiniLoader />
            </div>
          )}
          <div
            ref={loadMoreRef}
            style={{ height: "1px", background: "transparent" }}
          ></div>
        </div>

        <Bills />
      </div>
    </article>
  );
}







//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <button 
//       onClick={handleScrollToTop} 
//       style={{ position: 'fixed', bottom: '20px', right: '20px' }}
//     >
//       Scroll to Top
//     </button>
//   );
// };











