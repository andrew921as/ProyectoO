'use client'

import React, { useState, useContext } from 'react'
import { UserContext } from '@/context/UserProvider'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export const Help = ({ onClick }) => {
  const { user, setUser } = useContext(UserContext)

  return (
    <div onClick={onClick} className='absolute cursor-pointer top-4 left-4 w-20 h-20 rounded-md'>
      <div className='flex justify-center items-center w-full h-full'>
        <img src='/img/world/question.png' alt='GIF' className='w-16 h-16 object-cover' />
      </div>
    </div>
  )
}
