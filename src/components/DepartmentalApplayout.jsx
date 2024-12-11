import React from 'react'
import { Outlet } from 'react-router-dom';
import DeptNavbar from './DeptNavbar';
import DeptFooter from './DeptFooter';

export default function DepartmentalApplayout() {
  return (
    <div>
        <DeptNavbar/>
      <main >
        <Outlet />
      </main>
      <DeptFooter/>
    </div>
  );
}
