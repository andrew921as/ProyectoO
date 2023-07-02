'use client'

import React, { useState, useContext } from 'react'
import { UserContext } from '@/context/UserProvider'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export const Music = ({ onClick }) => {
    const { user, setUser } = useContext(UserContext)
    const [isClicked, setIsClicked] = useState(false)
  
    const handleClick = () => {
      setIsClicked(!isClicked)
    }
  
    return (
      <div onClick={handleClick} className='absolute cursor-pointer bottom-4 left-4 w-20 h-20 rounded-md'>
        <div className='flex justify-center items-center w-full h-full'>
          <img src={isClicked ? '/img/world/sonido.png' : '/img/world/no-sonido.png'} alt='GIF' className='w-16 h-16 object-cover' />
        </div>
      </div>
    )
  }
