/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { timeAgo, timeStampAgo } from "../../utils/timeStampAgo";
import useSug from "../../hooks/useSug";
import { sugCommentPost, sugLikPost } from "../../services/sugApis";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import BlueMiniLoader from "../../ui/BlueMiniLoader";
import useGetSugUser from "../../hooks/useGetSugUser";
import { processTextSug } from "../../utils/utils";

import { sugDeletePost } from "../../services/contactApi";
// import { sugDeletePost } from "../../services/contactApi";

export default function SugPerTrends({ item,onClick,open }) {
  const [loading,setLoading]=useState()
  const { userId: sugId, token } = useSug();
    const { data } = useGetSugUser();
    const uni =data.data.university
  const queryClient =useQueryClient()

      const [isExpanded, setIsExpanded] = useState(false);
   const [commentContents, setCommentContent] = useState([]);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { images, likes, poster, createdAt, text, postId,postType} = item;
      const handleToggle = () => {
        setIsExpanded((prev) => !prev);
      };

      const truncatedText =
        text.length > 100 ? text.slice(0, 100) + "..." : text;
    const handleOpenCommentModal = function () {
      getAllComments();
      setCommentModalVisible(true);
      // setActiveTab(index);
    };
    const handleCloseCommentModal = () => setCommentModalVisible(false);
      async function getAllComments() {
        setLoading(true);
        try {
          const response = await fetch(
            `https://student-plug.onrender.com/api/add/posts/${postId}`
          );

          const result = await response.json();
          setCommentContent(result.comments);
          console.log(result);
          return result;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      }
        const { mutate: isComment, isLoading: isCommenting } = useMutation({
          mutationFn: sugCommentPost,
          onSuccess: () => {
            getAllComments();
            toast.success("comment successful");
            reset();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
       const onSubmit = function ({ text }) {
         console.log({ isAdmin: true, userId: sugId, text, postId });
         isComment({
           ...(postType === "admin" ? { isAdmin: true } : { isAdmin: false }),
           userId: sugId,
           text,
           postId,
         });
       };
        const { mutate: isDelete, isLoading: isDeleting } = useMutation({
          mutationFn: sugDeletePost,
          onSuccess: () => {
            queryClient.invalidateQueries("sugtrends");
            toast.success("delete successful");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
 const handleDelete = function () {
   console.log({ postId, token });
   isDelete({ postId, token });
 };
 const { mutate, isLoading: isLiking } = useMutation({
   mutationFn: sugLikPost,
   onSuccess: () => {
     queryClient.invalidateQueries("sugtrends");
     toast.success("like successful");
   },
   onError: (error) => {
     toast.error(error.message);
   },
 });
  const handleLike = () => {
  
    mutate({ postId, userId: sugId });
   
  };
  return (
    <li className="bg-white p-3 mb-3 rounded-lg ">
      <div className="flex justify-between relative">
        <div className="flex gap-x-2 items-center">
          <img
            src={
              poster?.profilePicture
                ? poster?.profilePicture
                : "/images/profile-circle.svg"
            }
            alt="img"
            className="w-14 h-14 rounded-full"
          />
          <div className="flex flex-col">
            <h4 className="mb-0 font-semibold">
              {postType === "admin" ? "admin" : poster?.name}
            </h4>

            {postType === "admin" && (
              <h5 className="mb-0 capitalize font-semibold">{uni}</h5>
            )}
            {postType === "student" && (
              <h5 className="capitalize text-stone-800">
                faculty of {poster.faculty},{poster.department} departrment.
              </h5>
            )}
            <h5 className="mb-0 text-sm  text-stone-700 font-light flex gap-x-2">
              {timeAgo(createdAt)} <img src="/assets/clock.svg" alt="Time" />
            </h5>
          </div>
        </div>
        <button onClick={onClick} className="bg-transparent">
          <img
            src="/assets/more.svg"
            alt="More options"
            className="self-start cursor-pointer"
          />
        </button>
        {open && (
          <div className="p-2 absolute pr-6 shadow-md bg-white rounded-md bottom-[-2.5rem] right-2">
            {" "}
            <div className="bg-stone-100 flex gap-x-3 pr-8 rounded-md items-center p-1">
              <img
                src="\assets\trash.svg"
                alt="trash"
                className="border border-[#f5c662] p-2 w-[2.2rem] h-[2.2rem] rounded-full"
              />
              <button
                disabled={isDeleting}
                onClick={handleDelete}
                className="capitalize"
              >
                delete post
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <div>
          <p className="break-words text-stone-500 mt-5">
            {/* Display truncated or full text */}
            {isExpanded ? processTextSug(text) : processTextSug(truncatedText)}
            {!isExpanded && text.length > 100 && (
              <span
                className="text-stone-500 cursor-pointer ml-1"
                onClick={handleToggle}
              >
                More
              </span>
            )}
          </p>
          {isExpanded && (
            <button
              onClick={handleToggle}
              className="text-stone-500 bg-transparent  mt-2"
            >
              Less
            </button>
          )}
        </div>
        <div
          className={`grid gap-x-2 mt-2 ${
            images?.length === 2
              ? "grid-cols-2"
              : images?.length === 1
              ? "grid-cols-1"
              : "grid-cols-3"
          }`}
        >
          {images?.map((img, index) => (
            <div key={index} className="h-[17rem] ">
              <img
                src={img}
                alt="Post"
                loading="lazy"
                className="h-full object-cover w-full rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="mb-0 text-secondary600">{likes} likes</p>
        <div className="flex justify-between items-center">
          <button
            onClick={handleLike}
            className="flex bg-transparent items-center gap-x-1"
            disabled={isLiking}
          >
            <img src="/images/like.svg" className="h-4 w-4" alt="like icon" />
            <span>Like</span>
          </button>
          <button
            onClick={() => handleOpenCommentModal(postId)}
            className="flex bg-transparent items-center gap-x-1"
          >
            <img
              src="/assets/message-2.svg"
              className="h-4 w-4"
              alt="message icon"
            />
            <span>Comment</span>
          </button>
          <button className="flex bg-transparent items-center gap-x-1">
            <img
              src="/assets/programming-arrows.svg"
              className="h-4 w-4"
              alt="share icon"
            />
            <span>Repost</span>
          </button>
          <button className="flex bg-transparent items-center gap-x-1">
            <img src="/assets/send-2.svg" className="h-4 w-4" alt="save icon" />
            <span>Share</span>
          </button>
        </div>
      </div>
      {commentModalVisible && (
        <div className="fixed bottom-0 inset-0 bg-black md:hidden  bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="absolute bottom-0 bg-white rounded-tl-[1rem] rounded-tr-[1rem] w-full h-[95vh] p-4 grid grid-rows-[auto,1fr,auto] overflow-y-auto animate-slideUp"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Comments</h2>
              <button
                onClick={handleCloseCommentModal}
                className="text-xl font-semibold"
              >
                &times;
              </button>
            </div>

            <ul className="mt-4 overflow-y-auto">
              {!commentContents && (
                <div className="flex justify-center">
                  <p className="capitalize text-stone-700">no comment yet</p>
                </div>
              )}
              {loading ? (
                <div className="flex justify-center">
                  <BlueMiniLoader />
                </div>
              ) : (
                commentContents?.map((item) => (
                  <li key={item?._id} className="mb-4">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={
                          item.user?.profilePicture
                            ? item.user.profilePicture
                            : "/images/profile-circle.svg"
                        }
                        alt="img"
                        className="h-[3rem] w-[3rem] rounded-full"
                      />
                      <div>
                        <p className="mb-0 flex gap-x-1 items-center">
                          <span className="font-semibold">
                            {" "}
                            {item?.user?.fullName}
                          </span>
                          <span className="text-[0.7rem] text-stone-600">
                            {timeStampAgo(item?.createdAt)}
                          </span>
                        </p>
                        <p className="mb-0 font-medium capitalize text-stone-900">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div className="flex items-center gap-x-2 mt-2">
              <img
                src={data?.data?.uniProfilePicture}
                alt="admin"
                className="w-8 h-8 rounded-full"
              />
              <input
                type="text"
                {...register("text")}
                placeholder="Add Your Comment Here"
                className="w-full bg-transparent outline-none placeholder:text-sm rounded-md"
              />
              <button
                disabled={isCommenting}
                className="bg-secondary600 px-3 p-[1px] rounded-xl text-white"
              >
                &uarr;
              </button>
            </div>
          </form>
        </div>
      )}
    </li>
  );
}