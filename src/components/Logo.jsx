import React from 'react'
import { Link } from 'react-router-dom'
import Loader from './Loader'

export default function Logo() {
  return (
    <div className=''>
    <Link to="/">
        <img src='/images/shool-pluglogo.png' alt='schoolLogo'/>
    </Link>

    </div>
  )
}



