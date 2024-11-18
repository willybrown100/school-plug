import React, { useEffect, useRef, useState } from 'react'
import { HiXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useUser from '../hooks/useUser';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentCreatePost } from '../services/contactApi';
import MiniLoader from "../ui/MiniLoader"
import toast from 'react-hot-toast';
import useGetUser from '../hooks/useGetUser';




export default function CreatePost() {
  const imageRef = useRef(null);
  const inputRef = useRef(null);
  const [textContent, setTextContent] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [selectedImage, setselectedImage] = useState([]);
const disable = imagePreview.length===3
console.log(selectedImage);
const queryClient = useQueryClient()
const { userId } = useUser()
const { data } = useGetUser()
const {user}=data
const img = user?.profilePhoto;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: imagePreview.length >= 3 ? 2.5 : imagePreview.length, // Display imagePreview side by side
    slidesToScroll: 1,
    centerMode: imagePreview.length === 1,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: imagePreview.length >= 3 ? 2.5 : imagePreview.length, // Adjust for smaller screens
          centerMode: imagePreview.length === 1, 
        },
      },
    ],
  };

  const {mutate,isLoading}=useMutation({
    mutationFn:studentCreatePost,
    onSuccess:()=>{
      queryClient.invalidateQueries("schoolpost");
      navigate("/home/homePage");
      toast.success("post successful,view")
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })
  const navigate = useNavigate();
  const handleClick = function (e) {
    e.preventDefault();
    navigate(-1);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    console.log(event.target.files)
    if (file) {
        setselectedImage((prevImg)=>[...prevImg,file])

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prevImages) => [...prevImages, reader.result]); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log({ image: selectedImage, text: textContent, userId });
    mutate({ image: selectedImage, text: textContent, userId });
  };
  const handleChange = function (event) {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
    setTextContent(textarea.value);
  };
  const handleButtonClick = function () {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleRemoveImage = (indexToRemove) => {
    setImagePreview(
      (prevImages) => prevImages.filter((_, index) => index !== indexToRemove) // Remove image at the specified index
    );
  };
  return (
    <div className="px-3 mt-4">
      <form className="px-4 " onSubmit={handleSubmit}>
        <div className="h-[70vh]  grid grid-rows-[auto,1fr]">
          <div className="flex border-b-2 items-center justify-between ">
            <button
              onClick={handleClick}
              className="border mb-2 bg-transparent rounded-full  border-stone-400   p-1"
            >
              <HiXMark />
            </button>
            <button
              disabled={!textContent}
              className={` ${
                !textContent ? "bg-secondary400" : "bg-secondary600 "
              }
                 
 mb-2 px-6 capitalize py-1  text-white rounded-full font-heading`}
            >
              {isLoading ? <MiniLoader /> : "post"}
            </button>
          </div>

          <div className="overflow-y-scroll overflow-x-hidden scroll">
            <div className="flex gap-x-2 mt-2">
              <div className="rounded-full w-[4.9rem]  h-[4rem] overflow-hidden">
                <img
                  src={img}
                  alt="img"
                  className=" object-cover w-full h-full  self-start "
                />
              </div>
              <textarea
                ref={inputRef}
                rows={1}
                value={textContent}
                onInput={handleChange}
                type="text"
                className="outline-none placeholder:font-heading placeholder:capitalize w-full resize-none overflow-hidden p-2 text-base font-heading leading-6 rounded  focus:outline-none focus:border-blue-500"
                placeholder="what's happening "
              />
            </div>
            {imagePreview.length > 0 && (
              <Slider {...settings}>
                {imagePreview.map((image, index) => (
                  <div
                    key={index}
                    style={{ padding: "10px" }}
                    className="overflow-x-scroll mt-3 relative previewImg rounded-[2rem]"
                  >
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                      className="object-cover p-2"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-[40%]  left-1/2 translate-x-[-50%] bg-transparent backdrop-blur-md rounded-full p-2 "
                    >
                      <img src="\images\trash.svg" alt="trash" className="" />
                    </button>
                    ;
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>

        <button
          onClick={handleButtonClick}
          disabled={disable}
          type="button"
          className="absolute right-2  bottom-2 "
        >
          <img
            src="\images\camera.svg"
            alt="camera"
            className="bg-stone-100 p-3 border-2 border-stone-200 rounded-xl "
          />
          <input
            type="file"
            className="hidden"
            accept="image"
            ref={imageRef}
            onChange={handleImageChange}
          />
        </button>
      </form>
    </div>
  );
}







 






// export default MultipleImagePreview;







// export default MultipleImagePreview;
