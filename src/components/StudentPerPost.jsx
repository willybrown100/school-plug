/* eslint-disable react/prop-types */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {   studentComment, studentLikePost } from "../services/contactApi";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import useGetUser from "../hooks/useGetUser";
import {WebSocketContext} from "../WebSocketProvider"
import BlueMiniLoader from "../ui/BlueMiniLoader";
import { timeStampAgo } from "../utils/timeStampAgo";


export default function StudentPerPost({ item }) {
  const {
    text,
    images,
    createdAt,
    faculty,
    department,
    _id,
    user,
    likes,
    userId,
    postType,
    university,
  } = item;

  const queryClient = useQueryClient();
  const { data } = useGetUser();
  
  const { userId: studentId } = useUser();
const postId =_id

  const { register, handleSubmit,reset } = useForm();
  const [isExpanded, setIsExpanded] = useState(false);
  const [datas,setDatas]=useState([])
  const [loading,   setLoading]=useState()
   const [activeTab, setActiveTab] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const { socket, notifications } = useContext(WebSocketContext);
console.log(socket, notifications);
  const toggleText = () => setIsExpanded((prev) => !prev);
  const openImageModal = (index) => setSelectedImageIndex(index);


 async function getStudentComments() {
  setLoading(true)
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



console.log(datas)
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
    mutationFn: studentLikePost,
    onSuccess: () => {
      queryClient.invalidateQueries("schoolpost");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });




const handleLike = () => {
  mutate({
    postId: _id,
    ...(postType === "admin" && { isAdminPost: true }), // Include `isAdminPost: true` only if condition is met
    userId: studentId,
  });


    if (socket && socket.readyState === WebSocket.OPEN) {
    
         const message = {
           event: "likePost", // Event type expected by the server
           payload: {
             postId: postId, 
             userId: userId, 
             adminId: null, 
           },
         };

      socket.send(JSON.stringify(message));
      console.log("Like event sent to the server");
    } else {
      console.error("WebSocket connection is not open");
    }



};



  const handleOpenCommentModal = function(index) { 
    getStudentComments()
    setCommentModalVisible(true) 
 setActiveTab(index);

  };
  const handleCloseCommentModal = () => setCommentModalVisible(false);

   const { mutate: comment, isLoading: isCommenting } = useMutation({
     mutationFn: studentComment,
     onSuccess: () => {
   
      getStudentComments()
      toast.success("succesfull")
      reset()
     },
     onError:(error)=>{
      toast.error(error.message)
     }
   });

  const onSubmit = function ({text}) {
    comment({ text, isAdmin:false, userId: studentId, postId: _id });
    console.log({ text, isAdmin: false, userId: studentId, postId: _id });
  };
  const onSubmitLargeScreen = function ({comments}) {
    comment({
      text: comments,
      isAdmin: false,
      userId: studentId,
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

      {/* Text Content */}
      <p className="text-stone-700 mt-4 break-words max-full">
        {isExpanded ? text : text.slice(0, 50)}
        {text?.length > 50 && (
          <span
            onClick={toggleText}
            className="text-stone-600 cursor-pointer ml-1"
          >
            {isExpanded ? " less" : "...more"}
          </span>
        )}
      </p>

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
        <p className="mb-0 text-secondary600">{likes.length} likes</p>
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
        // <div className=" ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="fixed rounded-tl-[1rem] md:hidden rounded-tr-[1rem] grid grid-rows-[auto,1fr,auto] inset-0 z-50 bg-stone-100 w-full  p-4 h-full  overflow-y-scroll animate-slideUp"
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
          <div className="flex items-center gap-x-2 mt-2">
            <img
              src={data?.user?.profilePhoto}
              alt="aadmin"
              className="w-8 h-8 rounded-full"
            />
            <input
              type="text"
              {...register("text")}
              placeholder="Add Your Comment Here"
              className="w-full  bg-stone-100 outline-none placeholder:text-sm rounded-md"
            />
            <button
              disabled={isCommenting}
              className="bg-secondary600 px-3 p-[1px]  rounded-xl text-white"
            >
              &uarr;
            </button>
          </div>
        </form>
        //  </div>
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
                        item.user?.profilePhoto
                          ? item.user.profilePhoto
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
              disabled={isCommenting}
              className="bg-secondary600 px-3 p-[1px]  rounded-xl text-white"
            >
              &uarr;
            </button>
          </form>
        </div>
      )}
    </li>
  );
}

