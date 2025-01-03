/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { timeAgo, timeStampAgo } from "../utils/timeStampAgo";
import useGetUser from "../hooks/useGetUser";
import BlueMiniLoader from "../ui/BlueMiniLoader";
import { studentComment, studentLikePost } from "../services/contactApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { processText } from "../utils/utils";
import EmojiPicker from "emoji-picker-react";

export default function TrendPerPost({ item }) {
    const { data } = useGetUser();
    const uni=data.studentInfo.university
    const { createdAt, text, poster, images, likes, postId,postType } = item;
    const [Alllikes, setAllLikes] = useState(likes);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
     const [activeTab, setActiveTab] = useState(0);
  const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState();
      const [isExpanded, setIsExpanded] = useState(false);
      const { userId: studentId } = useUser();

 const handleToggle = () => {
   setIsExpanded((prev) => !prev);
 };

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji; 
    const currentText = getValues("comments");
    setValue("comments", currentText + emoji);
  };
  const handleEmojiClick2 = (emojiData) => {
    const emoji = emojiData.emoji; 
    const currentText = getValues("text");
    setValue("text", currentText + emoji); 
  };

 const truncatedText = text.length > 100 ? text.slice(0, 100) + "..." : text;

  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const queryClient = useQueryClient()
const handleOpenCommentModal = function (index) {
  getStudentComments();
  setCommentModalVisible(true);
  setActiveTab(index);
};

 const handleCloseCommentModal = () => setCommentModalVisible(false);
 async function getStudentComments() {
   setLoading(true);
   try {
     const response = await fetch(
       `https://student-plug.onrender.com/api/add/posts/${postId}`
     );

     const result = await response.json();

     console.log(result);
     setDatas(result.comments);
     return result;
   } catch (error) {
     console.log(error);
     throw error;
   } finally {
     setLoading(false);
   }
 }
   const { mutate: comment, isLoading: isCommenting } = useMutation({
     mutationFn: studentComment,
     onSuccess: () => {
       getStudentComments();
       toast.success("comment sent");
       setShowEmojiPicker(false)
      reset()
     },
     onError: (error) => {
       toast.error(error.message);
     },
     onSettled:()=>{
        reset({ comments: "" });
     }
   });
const { mutate, isLoading: isLiking } = useMutation({
  mutationFn: studentLikePost,
  onSuccess: () => {
    // queryClient.invalidateQueries("schoolpost");
        queryClient.invalidateQueries(["schoolpost", postId]);
  },

    onMutate: () => {
      setHasLiked((prev) => !prev);
      setAllLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
    },
    onError: (error) => {
      toast.error(error.message);
      setHasLiked((prev) => {
        setAllLikes((likes) => (prev ? likes + 1 : likes - 1)); 
        return !prev;
      });
    },


});
   const handleLike = () => {
     mutate({
       postId,
       ...(postType === "admin" && { isAdminPost: true }),  
       userId: studentId,
     });


   };

 const onSubmit = function ({ text }) {
   comment({ text, isAdmin: false, userId: studentId, postId });
   console.log({ text, isAdmin: false, userId: studentId, postId });
 };
   const onSubmitLargeScreen = function ({ comments }) {
     comment({
       text: comments,
       isAdmin: false,
       userId: studentId,
       postId,
     });
   };
  return (
    <div className="bg-white p-3 mb-3 rounded-lg relative">
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

      <div>
        {/* <p className="text-stone-700 mt-4 break-words max-full">
          {isExpanded ? processText(text) : processText(text).slice(0, 50)}
          {text?.length > 50 && (
            <span
              onClick={toggleText}
              className="text-stone-600 cursor-pointer ml-1"
            >
              {isExpanded ? " less" : "...more"}
            </span>
          )}
        </p> */}
        <div>
          <p>
            {/* Display truncated or full text */}
            {isExpanded ? processText(text) : processText(truncatedText)}
            {!isExpanded && text.length > 100 && (
              <span
                className="text-blue-500 cursor-pointer ml-1"
                onClick={handleToggle}
              >
                Show More
              </span>
            )}
          </p>
          {isExpanded && (
            <button
              onClick={handleToggle}
              className="text-blue-500 underline mt-2"
            >
              Show Less
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
              {!datas && (
                <div className="flex justify-center">
                  <p className="capitalize text-stone-700">no comment yet</p>
                </div>
              )}
              {loading ? (
                <div className="flex justify-center">
                  <BlueMiniLoader />
                </div>
              ) : (
                datas?.map((item) => (
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
                src={data?.user?.profilePhoto}
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
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="text-xl"
              >
                😊
              </button>
              <button
                disabled={isCommenting}
                className="bg-secondary600 px-3 p-[1px] rounded-xl text-white"
              >
                &uarr;
              </button>
            </div>
            {showEmojiPicker && (
              <div className="absolute right-3 top-2 z-40">
                <EmojiPicker onEmojiClick={handleEmojiClick2} />
              </div>
            )}
          </form>
        </div>
      )}

      {activeTab === postId && (
        <div className="mt-3 hidden md:block overflow-y-auto ">
          <ul className="mt-4 overflow-y-auto">
            {loading && (
              <div className="flex justify-center">
                <BlueMiniLoader />
              </div>
            )}
            {!datas?.length ? (
              <div className="flex justify-center">
                <p className="capitalize text-stone-700">no comment yet</p>
              </div>
            ) : (
              datas?.map((item) => (
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
                      <p className="mb-0 font-semibold">
                        {item?.user?.fullName}
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
            className="flex items-center gap-x-3 "
            onSubmit={handleSubmit(onSubmitLargeScreen)}
          >
            <img
              src={data?.user?.profilePhoto}
              alt="img"
              className="w-8 h-8 rounded-full"
            />
            <input
              type="text"
              {...register("comments")}
              placeholder="Add Your Comment Here"
              className="border w-full border-stone-600 p-1 placeholder:text-stone-600 placeholder:text-sm pl-2  rounded-2xl"
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
              &uarr;
            </button>

            {showEmojiPicker && (
              <div className="absolute right-3 top-2 z-40">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}









