/* eslint-disable react/prop-types */
import React from "react";
import useGetSugUser from "../hooks/useGetSugUser";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sugCommentPost, sugLikPost } from "../services/sugApis";
import toast from "react-hot-toast";
import useSug from "../hooks/useSug";
import { useForm } from "react-hook-form";
import { sugDeletePost } from "../services/contactApi";
import {timeStampAgo} from "../utils/timeStampAgo"
import BlueMiniLoader from "../ui/BlueMiniLoader";

import {  processTextSug } from "../utils/utils";
import MiniLoader from "../ui/MiniLoader";
import EmojiPicker from "emoji-picker-react";

export default function PerPost({ item, onClick, open }) {
  
  const queryClient = useQueryClient();
  const { data } = useGetSugUser();

  const { userId: sugId, token } = useSug();
  const sugImg = data?.data?.uniProfilePicture;
  const uni = data?.data?.university;
  const {
    text,
    images,
    createdAt,
    _id,
    isLike,
    likes,
    user,
    userId,
    faculty,
    department,
    postType,
  } = item;
  const { register, handleSubmit, reset, getValues, setValue} = useForm();
  const [commentContents, setCommentContent] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
   const [Alllikes, setAllLikes] = useState(likes.length);
   const [hasLiked, setHasLiked] = useState(isLike);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const postId = _id;
  
 const handleToggle = () => {
   setIsExpanded((prev) => !prev);
 };


    const handleEmojiClick2 = (emojiData) => {
      const emoji = emojiData.emoji; // Extract emoji
      const currentText = getValues("text"); // Get the current input value
      setValue("text", currentText + emoji); // Append emoji to input value
    };

 const truncatedText = text.length > 100 ? text.slice(0, 100) + "..." : text;
  const openImageModal = (index) => setSelectedImageIndex(index);

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

  const closeImageModal = () => setSelectedImageIndex(null);

  const showNextImage = () =>
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  const showPreviousImage = () =>
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  const timeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const differenceInSeconds = Math.floor((now - createdDate) / 1000);

    const isYesterday =
      differenceInSeconds >= 86400 && differenceInSeconds < 172800;
    if (isYesterday) {
      return "Yesterday";
    }

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} second${
        differenceInSeconds !== 1 ? "s" : ""
      } ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 604800) {
      // less than a week
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 2419200) {
      // less than a month
      const weeks = Math.floor(differenceInSeconds / 604800);
      return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
    } else if (differenceInSeconds < 29030400) {
      // less than a year
      const months = Math.floor(differenceInSeconds / 2419200);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(differenceInSeconds / 29030400);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  };
  const { mutate, isLoading: isLiking } = useMutation({
    mutationFn: sugLikPost,
    onSuccess: () => {
 
   queryClient.invalidateQueries(["sugposts", postId]);
  
    },
    onError: (error) => {
      toast.error(error.message);
          setHasLiked((prev) => {
            setAllLikes((likes) => (prev ? likes + 1 : likes - 1)); // Revert likes count
            return !prev;
          });
    },
    onMutate: () => {
      // Optimistic update
      setHasLiked((prev) => !prev);
      setAllLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
    },
  });

  const { mutate: isDelete, isLoading: isDeleting } = useMutation({
    mutationFn: sugDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries("sugposts");
      toast.success("delete successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: isComment, isLoading: isCommenting } = useMutation({
    mutationFn: sugCommentPost,
    onSuccess: () => {
      getAllComments();
         toast.success("comment sent");
         setShowEmojiPicker(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLike = () => {

    mutate({ postId: _id, userId: sugId ,...(postType === "admin" && { isAdminPost: true }),});
    console.log({ postId: _id, userId: sugId });

  };

  const handleDelete = function () {
    console.log({ postId: _id, token });
    isDelete({ postId: _id, token });
  };

  const handleOpenCommentModal = function () {
    getAllComments();
    setCommentModalVisible(true);
  };

  const handleCloseCommentModal = function () {
    setCommentModalVisible(false);
  };

  const onSubmit = function ({ text }) {
    console.log({
      // isAdmin: false,
      ...(postType === "admin" ? { isAdmin: false }:{ isAdmin: true }),
      userId: sugId,
      text,
      postId: _id,
    });
    isComment({
      // isAdmin: false,
      ...(postType === "admin" ? { isAdmin: true } : { isAdmin: false }),
      userId: sugId,
      text,
      postId: _id,
    });
  };
  return (
    <li className="bg-white w-full p-3">
      {/* Post Content */}
      <div className="flex justify-between relative">
        <div className="flex gap-x-2 items-center">
          <img
            src={
              userId?.profilePicture
                ? userId?.profilePicture
                : "/images/profile-circle.svg"
            }
            alt="User"
            className="w-14 h-14 rounded-full"
          />
          <div className="flex flex-col">
            {postType === "admin" && (
              <h5 className="mb-0 capitalize font-semibold">admin</h5>
            )}
            {postType === "student" && (
              <h4 className="mb-0 capitalize font-semibold">
                {user?.fullName}
              </h4>
            )}
            {postType === "admin" && (
              <h5 className="mb-0 capitalize font-semibold">{uni}</h5>
            )}
            {postType === "student" && (
              <h5 className="capitalize text-stone-800">
                faculty of {faculty},{department} departrment.
              </h5>
            )}
            <h5 className="mb-0 text-stone-700 text-sm font-light flex gap-x-2">
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

      {/* Text Content */}
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
          images.length === 2
            ? "grid-cols-2"
            : images.length === 1
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
              onClick={() => openImageModal(index)}
            />
          </div>
        ))}
      </div>

      {/* Like, Comment, Share Buttons */}
      <div className="mt-4">
        <p className="mb-0 text-secondary600">{Alllikes} likes</p>
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
            onClick={handleOpenCommentModal}
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

      {/* Comment Modal */}
      {commentModalVisible && (
        <div className="fixed bottom-0 inset-0 bg-black md:hidden  bg-opacity-50 z-50">
          <div className="absolute bottom-0 bg-white rounded-tl-[1rem] rounded-tr-[1rem] w-full h-[95vh] p-4 grid grid-rows-[auto,1fr,auto] overflow-y-auto animate-slideUp">
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
              {loading && (
                <div className="flex justify-center">
                  <BlueMiniLoader />
                </div>
              )}
              {!commentContents?.length ? (
                <div className="flex justify-center">
                  <p className="capitalize text-stone-700">no comment yet</p>
                </div>
              ) : (
                commentContents?.map((item) => (
                  <li key={item?._id} className="mb-3">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={
                          item.user?.profilePhoto
                            ? item.user.profilePhoto
                            : "/images/profile-circle.svg"
                        }
                        alt="img"
                        className="h-[3rem] w-[3rem] rounded-full"
                      />
                      <div>
                        <p className="mb-0  flex gap-x-1 items-center">
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center gap-x-2 mt-2"
            >
              <img
                src={sugImg}
                alt="aadmin"
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                // onChange={(e) => setTextContent(e.target.value)}
                {...register("text")}
                placeholder="Add Your Comment Here"
                className="w-full  bg-transparent outline-none placeholder:text-sm rounded-md"
              />

              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="text-xl"
              >
                😊
              </button>
              <button
                disabled={isCommenting}
                className="bg-secondary600 px-3 p-[1px]  rounded-xl text-white"
              >
                {isCommenting ? <MiniLoader /> : <span>&uarr;</span>}
              </button>
              {showEmojiPicker && (
                <div className="absolute right-3 top-2 z-40">
                  <EmojiPicker onEmojiClick={handleEmojiClick2} />
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full p-4">
            {images.length > 1 && (
              <button
                className="absolute top-1/2 h-8 w-8 grid place-items-center left-4 transform -translate-y-1/2 bg-black text-white rounded-full hover:bg-gray-700"
                onClick={showPreviousImage}
              >
                &#10094; {/* Left arrow */}
              </button>
            )}
            <img
              src={images[selectedImageIndex]}
              alt="Expanded view"
              className="w-full h-auto  object-contain"
            />
            {images.length > 1 && (
              <button
                className="absolute top-1/2 h-8 w-8 grid place-items-center right-4 transform -translate-y-1/2 bg-black text-white rounded-full hover:bg-gray-700"
                onClick={showNextImage}
              >
                &#10095; {/* Right arrow */}
              </button>
            )}
            <button
              className="absolute top-2 right-2 bg-black w-8 h-8 grid place-items-center text-white rounded-full text-2xl"
              onClick={closeImageModal}
            >
              &times; {/* Close button */}
            </button>
          </div>
        </div>
      )}
    </li>
  );
}


 