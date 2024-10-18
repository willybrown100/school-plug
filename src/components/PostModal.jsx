import React, { useContext, useRef, useState } from 'react'
import useGetUser from '../hooks/useGetUser';
import { ModalContext } from './Modals';

export default function PostModal() {
  const { close } = useContext(ModalContext)
  const imageRef = useRef(null)
  const [textContent, setTextContent] = useState("")
  const [selectedImage, setselectedImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const { data } = useGetUser();
  const { user, studentInfo } = data
  const img = data?.user?.profilePhoto;
  console.log(imagePreview, selectedImage);
  const disable =
    imagePreview.length === 3 || selectedImage.length === 3;
  const handleClick = function (e) {

    if (imageRef.current) {
      imageRef.current.click();
    }
  }

  const handleImageChange = (event) => {
    const file = Array.from(event.target.files);
    if (file.length) {
      setselectedImage((prevImg) => [...prevImg, file]);

      file.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((prevImages) => [...prevImages, reader.result]); // Update preview state
        };
        reader.readAsDataURL(file); // Read the file content
      });
    }

  };

  const handleSubmit = function (e) {
    e.preventDefault();
  };
  const handleRemoveImage = function (index) {
    setImagePreview((prevImages) => prevImages.filter((curEl, i) => i !== index));
    setselectedImage((prevImages) =>
      prevImages.filter((curEl, i) => i !== index)
    );
  }
  return (
    <div className="">
      {/* Background overlay */}
      <div className="fixed z-10 inset-0 pointer-events-auto grid place-items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Separate background overlay */}
        {/* Content div */}
        <div className="relative w-[600px] lg:w-[700px] rounded-lg z-20 bg-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <img
                src={img ? img : ""}
                alt={user?.name}
                className="w-[3rem] h-[3rem] rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h4 className="mb-0 font-semibold capitalize">{user?.name}</h4>
                <h4 className="mb-0">
                  faculty of arts,
                  <span>{studentInfo?.department} department</span>
                </h4>
              </div>
            </div>
            <button onClick={() => close()} className="h-8 w-8 border border-stone-500 rounded-full p-[0.6rem]  bg-transparent">
              <img src="\images\close-circle.svg" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="what's happening"
              onChange={(e) => setTextContent(e.target.value)}
              value={textContent}
              className="placeholder:capitalize p-2 h-[19rem] w-full border  border-stone-400 rounded-lg mt-3 focus:outline-none"
            />
            <div>
              {imagePreview && (
                <div className="flex my-3 items-center gap-x-4">
                  {imagePreview?.map((image, i) => (
                    <div className="relative">
                      <img
                        src={image}
                        alt={`Selected ${i}`}
                        className="h-[11rem] w-[7rem] object-cover rounded-lg"
                        key={i}
                      />
                      <button
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-[40%]  left-1/2 translate-x-[-50%] bg-transparent backdrop-blur-md rounded-full p-2 "
                      >
                        <img src="\images\trash.svg" alt="trash" className="" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <button onClick={handleClick} disabled={disable}>
                <img
                  src="\images\camera.svg"
                  alt="icon "
                  className="border border-secondary400 rounded-full p-2"
                />
              </button>
              <input
                type="file"
                accept="image"
                multiple
                ref={imageRef}
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                className={` py-2 px-8 rounded-[1.3rem] text-white ${textContent ? "bg-secondary600" : "bg-secondary400"
                  }`}
              >
                post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
