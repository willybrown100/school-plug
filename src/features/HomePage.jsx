import React, { useEffect, useRef, useState } from 'react'
import UserDetails from '../components/UserDetails'
import { GoPlus } from 'react-icons/go';
import Bills from '../components/Bills';
import DefaultSchool from '../components/DefaultSchool';
import DesktopCreatingPostButton from '../components/DesktopCreatingPostButton';
import { Outlet } from 'react-router-dom';

export default function HomePage() {
  const className = "md:max-w-[1170px]   md:w-[90vw]  m-auto";
  return (
    <div>
      <Outlet />
    </div>
  )
}










