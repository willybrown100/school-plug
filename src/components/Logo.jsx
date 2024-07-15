import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

export default function Logo() {
  return (
    <>
    <Link to="/">
        <img src='/images/shool-pluglogo.png' alt='img'/>
    </Link>
    <Loader/>
    </>
  )
}



