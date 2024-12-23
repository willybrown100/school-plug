/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import useGetSugUser from "../../hooks/useGetSugUser";
import useSug from "../../hooks/useSug";

import MiniLoader from "../../ui/MiniLoader";
import useCreateSugPost from "../../hooks/useCreateSugPost";
import useSchool from "../../hooks/useSchool";
import { useMutation } from "@tanstack/react-query";
import { sugCreateEvent, sugCreatePaidEvent } from "../../services/sugApis";
import toast from "react-hot-toast";
import Modals from "../../components/Modals";
import SugEventTicketModal from "../../components/SugEventTicketModal";

export default function SugCreatePost() {
  const { userId } = useSug();
  const { id } = useSchool();
  const [price, setPrice] = useState("");

  console.log(userId,price);
  const { data } = useGetSugUser();
  const uniProfilePicture = data?.data?.uniProfilePicture;

  const { mutate, postLoading, selectedFee } = useCreateSugPost();
  console.log(selectedFee?.selectedValue);

  const { mutate: createEvent, isLoading: creatingEvent } = useMutation({
    mutationFn: sugCreateEvent,
    onSuccess: () => {
      navigate("/sughome/sugevents");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: createPaidEvent, isLoading: creatingPaidEvent } = useMutation(
    {
      mutationFn: sugCreatePaidEvent,
      onSuccess: () => {
        navigate("/sughome/sugevents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const imageRef = useRef(null);

  const inputRef = useRef(null);
  const [textContent, setTextContent] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [selectedImage, setselectedImage] = useState([]);
  const disable = imagePreview.length === 3;
  // const queryClient = useQueryClient()
  // Slider settings
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

  const navigate = useNavigate();
  const handleClick = function (e) {
    e.preventDefault();
    navigate(-1);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setselectedImage((prevImg) => [...prevImg, file]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    if (selectedFee?.selectedValue ==="unpaidevent") {
      createEvent({
        title: textContent,
        image: selectedImage,
        schoolInfoId: id,
        adminId: userId,
      });
    } else if (selectedFee?.selectedValue === "paidevent") {
      createPaidEvent({
        adminId: userId,
        image: selectedImage,
        title: textContent,
        schoolInfoId: id,
        price:Number(price)
      });
    } else {
      mutate({
        adminId: userId,
        image: selectedImage,
        text: textContent,
        schoolInfoId: id,
      });
    }
  };

  const handleChange = function (event) {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set it to the scroll height
    setTextContent(textarea.value);
  };
  const handleButtonClick = function () {
    // e.preventDefault()
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
    setselectedImage(
      (prevImages) => prevImages.filter((_, index) => index !== indexToRemove) // Remove image at the specified index
    );
  };
  return (
    <div className="px-3 mt-4">
      <form className="px-4 " onSubmit={handleSubmit}>
        <div className="h-[70vh]  grid grid-rows-[auto,1fr]">
          <div className="flex border-b-2 items-center mb-2">
            <button
              onClick={handleClick}
              className="border mb-2 bg-transparent rounded-full  border-stone-400   p-1"
            >
              <HiXMark />
            </button>
            {selectedFee?.selectedValue === "paidevent" ? (
              <OpenModal
                price={price}
                setPrice={setPrice}
                textContent={textContent}
                creatingPaidEvent={creatingPaidEvent}
              />
            ) : (
              <button
                disabled={!textContent || postLoading}
                className={` ${
                  !textContent ? "bg-secondary400" : "bg-secondary600 "
                }
                 
 mb-2 px-6 capitalize py-1 ml-auto text-white rounded-full font-heading`}
              >
                {postLoading || creatingEvent || creatingPaidEvent ? (
                  <MiniLoader />
                ) : selectedFee?.selectedValue ? (
                  "publish"
                ) : (
                  "post"
                )}
              </button>
            )}
          </div>

          <div className="overflow-y-scroll overflow-x-hidden scroll">
            <div className="flex gap-x-2 ">
              <img
                src={
                  uniProfilePicture
                    ? uniProfilePicture
                    : "/images/profile-circle.svg"
                }
                alt="img"
                className="rounded-full self-start w-16 h-16"
              />
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
                        height: "",
                        borderRadius: "10px",
                      }}
                      className="object-cover h-[10rem] p-2"
                    />
                    <button
                      type="button"
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

function OpenModal({ price, setPrice, textContent, creatingPaidEvent }) {
  return (
    <Modals>
      <Modals.Open opens="openPrice">
  
<div className="ml-auto">

        <button
          type="button"
          disabled={!textContent}
          className={`${
            !textContent ? "bg-secondary400" : "bg-secondary600 "
          }  mb-2 px-4 py-1 rounded-full text-white capitalize  `}
          >
          publish
        </button>
            </div>
       
      </Modals.Open>
      <Modals.Window name="openPrice">
        <SugEventTicketModal
          price={price}
          setPrice={setPrice}
          creatingPaidEvent={creatingPaidEvent}
        />
      </Modals.Window>
    </Modals>
  );
}
