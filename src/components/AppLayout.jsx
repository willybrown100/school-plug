import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function AppLayout() {
  return (
    <div className="  ">
      <Navbar />
      <main className="bg-stone-100 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
