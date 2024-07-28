import React, { useState } from 'react'
import Button from '../ui/Button'

export default function UserProfile() {
  const [showImg,setShowImg]=useState(true)
  return (
    <main className="profile  grid place-items-center">
      <div className="md:bg-stone-50 md:shadow-lg w-full rounded-[1.5rem] pb-20 p-12 md:w-[500px] px-10 py-28 ">
        {
        showImg?
        <>
        <div className="mb-[2rem]">
          <img src="\images\animIMG.gif" alt="img " className="m-auto" />
          <h3 className="font-fontHeading  text-center md:px-10 text-[1.4rem]">
            upload your profile picture
          </h3>
        </div>
        <div className="md:grid md:grid-cols-2 flex flex-col gap-3">
          <Button className="md:hidden  capitalize rounded-md px-6 py-[0.4rem]">
            continue
          </Button>
          <button className="border-secondary400 border-[1px] capitalize rounded-md px-6 py-1">
            skip for later
          </button>
          <Button onClick={()=>setShowImg(false) } className="px-6 hidden md:block bg-secondary400">continue</Button>
        </div>
        </>
      : <UserImage />
      }
       
      </div>
    </main>
  );
}

function UserImage(){
  return <div>
    <form>
<button>choose image</button>
<Button>use image</Button>
    </form>
  </div>
}
