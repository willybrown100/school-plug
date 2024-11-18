import React, { useContext, useRef, useState } from 'react'
import Button from '../ui/Button';
import { ModalContext } from './Modals';
import {DateContext }from "../DateContext"
export default function FileImportModal() {
  const { close } = useContext(ModalContext);
  const [selectedOption,setSelectedOption]=useState("")
  const [active,setActive]=useState("")
  // const [disable,setDisable]=useState("")
  
  console.log(selectedOption, active);
  const modalRef = useRef(null)
      const imageRef = useRef(null);

       const { selectedFile, setSelectedFile, setFileName } =
         useContext(DateContext);
console.log(selectedFile)
       // Function to handle the file selection
       const handleFileChange = (event) => {
         const file = event.target.files[0]; // Get the first selected file
         if (file) {
           console.log("Selected file:", file);
           setSelectedFile(file); // Save file to state for further processing
           setFileName(file.name)
         }
         close();
       };

      const handleClick2 = function (e) {
        e.preventDefault();

        if (imageRef.current && selectedOption) {
          imageRef.current.click();
        }
      };

      
  const handleChange = function (e) {
    setSelectedOption(e.target.value);
    // setDisable(false);
  };
  const handleClick = function (i) {
    setActive(i);
  };
  const file = [
    {
      name: "pdf",
      fileName: "file a",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="pdf"
          checked={selectedOption === "pdf"}
        />
      ),
    },
    {
      name: "Spreadsheet",
      fileName: "file b",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="Spreadsheet"
          checked={selectedOption === "Spreadsheet"}
        />
      ),
    },
    {
      name: "doc",
      fileName: "file c",
      Element: (
        <input
          type="radio"
          onChange={handleChange}
          value="Docs"
          checked={selectedOption === "Docs"}
        />
      ),
    },
  ];
    const handleClose = function (e) {
      console.log(e, modalRef.current);
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    };
     
  return (
    <div
      className="fixed  z-50  backdrop-blur-sm bg-opacity-70 inset-0 p-8"
      onClick={handleClose}
    >
      <div className="relative min-h-screen ">
        <div
          ref={modalRef}
          className="bg-white rounded-lg p-4 absolute  right-0 left-0  bottom-[5rem]"
        >
          <h4 className="font-semibold">File import format</h4>
          <p className="text-sm text-stone-500 font-heading">
            Choose a file import format for Student Reg No.{" "}
          </p>
          <ul className="flex justify-between gap-x-3 mb-4">
            {file.map((item, i) => (
              <li
                key={i}
                className={`border relative flex-1 ${
                  active === i ? "border border-secondary500" : "border-stone-100"
                } p-3  rounded-md`}
              >
                <p className="capitalize mb-2 font-heading">{item.fileName}</p>
                <p className="capitalize font-semibold mb-0 font-heading">
                  {item.name}
                </p>
                <div
                  onClick={() => handleClick(i)}
                  className="absolute top-[-0.4rem] right-[-0.4rem]"
                >
                  {item.Element}
                </div>
              </li>
            ))}
          </ul>
          <input
            onChange={handleFileChange}
            ref={imageRef}
            type="file"
            accept=".pdf, .xlsx, .xls, .csv, .docx, .doc"
            className="hidden "
          />

          <Button onClick={handleClick2} className="w-full">
            continue
          </Button>
        </div>
      </div>
    </div>
  );
}
