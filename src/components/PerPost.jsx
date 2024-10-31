import React from 'react'
import useGetSugUser from '../hooks/useGetSugUser';






import { useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useMutation } from '@tanstack/react-query';
import { sugLikPost } from '../services/sugApis';
import toast from 'react-hot-toast';
import useSug from '../hooks/useSug';


export default function PerPost(item) {
  const { data } = useGetSugUser();
  const { userId } = useSug();
  const sugImg = data?.data?.uniProfilePicture;
  const uni = data?.data?.university;
  const { text, images, createdAt, _id,likes } = item.item;
console.log(item.item)
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Toggle text view
  const toggleText = () => setIsExpanded((prev) => !prev);

  // Time ago format
  const timeAgo = `${formatDistanceToNowStrict(new Date(createdAt))} ago`;

  // Conditionally show full or partial text
  const textContent = isExpanded ? text : text.slice(0, 50);

  // Open the modal overlay
  const openImageModal = (index) => setSelectedImageIndex(index);

  // Close the modal overlay
  const closeImageModal = () => setSelectedImageIndex(null);

  // Navigate to the next or previous image
  const showNextImage = () =>
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  const showPreviousImage = () =>
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

const { mutate, isPending } = useMutation({
  mutationFn:sugLikPost,
  onError: (error) => {
    toast.error(error.message);
  },
});
const handleLike = function(){
  // mutate({ postId: _id ,userId})
  console.log({ postId: _id, userId });
}

  return (
    <li className="bg-white w-full p-3">
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <img src={sugImg} alt="User" className="w-14 h-14 rounded-full" />
          <div className="flex flex-col">
            <h5 className="mb-0 capitalize font-semibold">admin</h5>
            <h5 className="mb-0 capitalize font-semibold">{uni}</h5>
            <h5 className="mb-0 text-sm font-light flex gap-x-2">
              {timeAgo} <img src="/assets/clock.svg" alt="Time" />
            </h5>
          </div>
        </div>
        <img src="/assets/more.svg" alt="More options" className="self-start" />
      </div>

      <p className="text-stone-700 mt-4 break-words max-full">
        {textContent}
        {text.length > 50 && (
          <span
            onClick={toggleText}
            className="text-stone-600 cursor-pointer ml-1"
          >
            {isExpanded ? " Less" : "... More"}
          </span>
        )}
      </p>

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
          <div key={index} className="h-[17rem]">
            <img
              src={img}
              alt="Post"
              className="h-full object-cover cursor-pointer"
              onClick={() => openImageModal(index)}
            />
          </div>
        ))}
      </div>
<div className='mt-4'>

      <p className='mb-0 text-secondary600'>{likes.length} likes</p>
      <div className="flex justify-between  items-center">
        {/* <div> */}
        <button
          onClick={handleLike}
          className="flex items-center bg-transparent gap-x-1"
          >
          <img src="/images/like.svg" className="h-4 w-4" alt="like icon" />
          <span>Like</span>
        </button>
        {/* </div> */}

        <button className="flex items-center bg-transparent gap-x-1">
          <img
            src="/assets/message-2.svg"
            className="h-4 w-4"
            alt="message icon"
            />
          <span>Comment</span>
        </button>
        <button className="flex items-center bg-transparent gap-x-1">
          <img
            src="\assets\programming-arrows.svg"
            className="h-4 w-4"
            alt="share icon"
          />
          <span>repost</span>
        </button>
        <button className="flex items-center bg-transparent gap-x-1">
          <img src="\assets\send-2.svg" className="h-4 w-4" alt="save icon" />
          <span>Share</span>
        </button>
      </div>
            </div>

      {/* Fullscreen Modal for Image View */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full p-4">
            <button
              className="absolute top-1/2 h-8 w-8 grid place-items-center left-4 transform -translate-y-1/2 bg-black text-white rounded-full hover:bg-gray-700"
              onClick={showPreviousImage}
            >
              &#10094; {/* Left arrow */}
            </button>
            <img
              src={images[selectedImageIndex]}
              alt="Expanded view"
              className="w-full h-auto object-contain"
            />
            <button
              className="absolute top-1/2 h-8 w-8 grid place-items-center right-4 transform -translate-y-1/2 bg-black text-white rounded-full hover:bg-gray-700"
              onClick={showNextImage}
            >
              &#10095; {/* Right arrow */}
            </button>
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

