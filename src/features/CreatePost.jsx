import React, { useEffect, useRef, useState } from 'react'
import { HiXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





export default function CreatePost() {
  const imageRef = useRef(null);
  const inputRef = useRef(null);
  const [textContent, setTextContent] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
const disable = imagePreview.length===3

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prevImages) => [...prevImages, reader.result]); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(imagePreview,textContent)
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
              post
            </button>
          </div>

          <div className="overflow-y-scroll overflow-x-hidden scroll">
            <div className="flex gap-x-2 ">
              <img
                src="\images\black-man-with-happy-expression 1.png"
                alt="img"
                className="rounded-full self-start"
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







 

const ImageCarousel = () => {
    const [images, setImages] = useState([]);

    // Handle image upload
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages((prevImages) => [...prevImages, reader.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    // Slider settings
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: images.length >= 3 ? 3 : images.length, // Display images side by side
        slidesToScroll: 1,
        centerMode: images.length === 1, // Center mode for a single image
        centerPadding: '0px', // Removes any padding when centerMode is active
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: images.length >= 3 ? 3 : images.length, // Adjust for smaller screens
                    centerMode: images.length === 1, // Center single image
                }
            }
        ]
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <label
                style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '10px',
                }}
            >
                <span role="img" aria-label="camera" style={{ marginRight: '5px' }}>
                    📷
                </span>
                Add Image
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </label>

            {/* Render the carousel if there are images */}
            {images.length > 0 && (
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index} style={{ padding: '10px' }}>
                            <img
                                src={image}
                                alt={`Preview ${index}`}
                                style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                            />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};




// export default MultipleImagePreview;







// export default MultipleImagePreview;
