/* eslint-disable react/prop-types */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {   studentComment, studentLikePost } from "../services/contactApi";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import useGetUser from "../hooks/useGetUser";

import BlueMiniLoader from "../ui/BlueMiniLoader";
import { timeAgo, timeStampAgo } from "../utils/timeStampAgo";

import { processText } from "../utils/utils";
// import useWebSocket from "../hooks/useWebSocket";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "./SocketProvider";
// import { processText } from "../utils/utils";



export default function StudentPerPost({ item }) {
  const {
    text,
    images,
    createdAt,
    faculty,
    department,
    _id,
    user,
   
    likeCount,

    userId,
    postType,
    university,
  } = item;

  const queryClient = useQueryClient();
  const { data } = useGetUser();
  // const name = data?.user?.name;
  const { userId: studentId } = useUser();
  const postId = _id;

  const [Alllikes, setAllLikes] = useState(likeCount);
  const [hasLiked, setHasLiked] = useState(false);
  const { register, handleSubmit, reset, getValues, setValue} = useForm();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  // const toggleText = () => setIsExpanded((prev) => !prev);
  const openImageModal = (index) => setSelectedImageIndex(index);
  
  // const socket=useWebSocket()
const { socket } = useSocket();
console.log(socket)

  // Toggle between full and truncated text
 const handleToggle = () => {
   setIsExpanded((prev) => !prev);
 };

  const truncatedText = text.length > 100 ? text.slice(0, 100) + "..." : text;

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

    const handleEmojiClick = (emojiData) => {
      const emoji = emojiData.emoji; // Extract emoji
      const currentText = getValues("comments"); // Get the current input value
      setValue("comments", currentText + emoji); // Append emoji to input value
    };
      const handleEmojiClick2 = (emojiData) => {
        const emoji = emojiData.emoji; // Extract emoji
        const currentText = getValues("text"); // Get the current input value
        setValue("text", currentText + emoji); 
      };

  const closeImageModal = () => setSelectedImageIndex(null);

  const showNextImage = () =>
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  const showPreviousImage = () =>
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  // const { mutate, isLoading: isLiking } = useMutation({
  //   mutationFn: studentLikePost,
  //   onSuccess: () => {
  //     // Invalidate only the specific post
  //     queryClient.invalidateQueries(["schoolpost", postId]);
  //   },

  //   onMutate: () => {
  //     // Optimistic update
  //     setHasLiked((prev) => !prev);
  //     setAllLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //     setHasLiked((prev) => {
  //       setAllLikes((likes) => (prev ? likes + 1 : likes - 1)); 
  //       return !prev;
  //     });
  //   },
  // });


// const handleLike = () => {
//   const likeData = {
//     postId: _id,
//     ...(postType === "admin" && { isAdminPost: true }),
//     userId: studentId,
//   };

//   // Send the API request
//   mutate(likeData);

//   // Send the same data to WebSocket if it's open
//   if (socket && socket?.readyState === WebSocket.OPEN) {
//     socket?.send(
//       JSON.stringify({
//         // type: "like-post",
//         ...likeData, // Spread the same data here to send it to the socket
//       })
//     );
//   }
// };


const { mutate, isLoading: isLiking } = useMutation({
  mutationFn: studentLikePost,
  onMutate: async () => {
    // Cancel any outgoing queries for the post to avoid data overwrite
    await queryClient.cancelQueries(["schoolpost", postId]);

    // Get the previous like state and ensure the post data exists
    const previousPostData = queryClient.getQueryData(["schoolpost", postId]);

    if (!previousPostData) return; // Return early if there's no post data

    // Optimistically update the like count and status
    queryClient.setQueryData(["schoolpost", postId], (oldData) => ({
      ...oldData,
      likeCount: hasLiked ? oldData.likeCount - 1 : oldData.likeCount + 1,
    }));

    setHasLiked((prev) => !prev); // Toggle the like status
    setAllLikes((prev) => (hasLiked ? prev - 1 : prev + 1)); // Update the like count optimistically

    // Return the previous state in case of rollback
    return { previousPostData };
  },
  onError: (error, likeData, context) => {
    // Revert the changes using the previous state
    queryClient.setQueryData(["schoolpost", postId], context.previousPostData);

    // Reset UI state
    setHasLiked((prev) => !prev); // Revert like status
    setAllLikes((prev) => (hasLiked ? prev + 1 : prev - 1)); // Revert all likes count

    // Show error notification
    toast.error(error.message);
  },
  onSuccess: () => {
    // Invalidate the specific post query to refetch the updated data
    queryClient.invalidateQueries(["schoolpost", postId]);
 
  },
});

const handleLike = () => {
  const likeData = {
    postId: _id,
    userId: studentId,
    ...(postType === "admin" && { isAdminPost: true }),
  };

  // Optimistic update
  setHasLiked((prev) => !prev); // Toggle the like status
  setAllLikes((prev) => (hasLiked ? prev - 1 : prev + 1)); // Update the like count optimistically

  // Send the API request
  mutate(likeData);

  // Send the same data to WebSocket if it's open
if (socket && socket.readyState === WebSocket.OPEN) {
  socket.send(JSON.stringify({ ...likeData }));
} else {
  // reconnectSocket(); // Attempt to reconnect if the socket is closed
  console.error("WebSocket is not open. Cannot send like data.");
}
};











  const handleOpenCommentModal = function (index) {
    getStudentComments();
    setCommentModalVisible(true);
    setActiveTab(index);
  };
  const handleCloseCommentModal = () => setCommentModalVisible(false);

  const { mutate: comment, isLoading: isCommenting } = useMutation({
    mutationFn: studentComment,
    onSuccess: () => {
      getStudentComments();
      toast.success("comment sent");
      setShowEmojiPicker(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      reset({ comments: "" });
    },
  });

  const onSubmit = function ({ text }) {
    comment({ text, isAdmin: false, userId: studentId, postId: _id });
    console.log({ text, isAdmin: false, userId: studentId, postId: _id });
  };
  const onSubmitLargeScreen = function ({ comments }) {
    comment({
      text: comments,
      isAdmin: false,
      userId: studentId,
      postId: _id,
    });
  };

  return (
    <li className="bg-white w-full p-3 relative">
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
            <h5 className="capitalize">{postType === "admin" && "admin"}</h5>
            <h5 className="mb-0 capitalize font-semibold">{university}</h5>
            {postType === "student" && (
              <h4 className="mb-0 capitalize font-semibold">
                {user?.fullName}
              </h4>
            )}
            {postType === "student" && (
              <h5 className="capitalize tracking-wide text-stone-800">
                faculty of {faculty}, {department} department.
              </h5>
            )}
            <h5 className="mb-0 text-sm  text-stone-700 font-light flex gap-x-2">
              {timeAgo(createdAt)} <img src="/assets/clock.svg" alt="Time" />
            </h5>
          </div>
        </div>
      </div>

      <div>
        <p className="break-words text-stone-500 mt-5">
          {/* Display truncated or full text */}
          {isExpanded ? processText(text) : processText(truncatedText)}
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
      {/* Comment Modal */}
      {commentModalVisible && (
        <div className="fixed bottom-0 inset-0 bg-black md:hidden  bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="absolute bottom-0 bg-white rounded-tl-[1rem] rounded-tr-[1rem] w-full  h-[95dvh] p-4 grid grid-rows-[auto,1fr,auto] overflow-y-auto animate-slideUp"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Comments</h2>
              <button
                onClick={handleCloseCommentModal}
                className="text-xl font-semibold bg-transparent"
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
              <div className="absolute right-3 top-2 z-40 max-h-[20rem] overflow-y-auto">
                <EmojiPicker onEmojiClick={handleEmojiClick2} />
              </div>
            )}
          </form>
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
              className="w-full h-auto object-contain"
            />
            {images?.length > 1 && (
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
      {activeTab === postId && (
        <div className="mt-3 hidden md:block overflow-y-auto">
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
            className="flex items-center gap-x-3"
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
          </form>
          {showEmojiPicker && (
            <div className="absolute right-3 top-2 z-40">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      )}
    </li>
  );
}












