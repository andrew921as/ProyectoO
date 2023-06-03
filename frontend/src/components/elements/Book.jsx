'use client'

import React, { useState, useContext } from 'react'
import { UserContext } from '@/context/UserProvider'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export const Book = ({ onClick }) => {
  const { user, setUser } = useContext(UserContext)

  return (
    <div
      onClick={onClick}
      className='absolute cursor-pointer bottom-14 right-8 bg-sin_derechos bg-opacity-75 w-40 h-40 rounded-md'
    >
      <div className='flex justify-center items-center w-full h-full'>
        <img src='/img/world/bookGif.gif' alt='GIF' className='w-52 h-52 object-cover' />
      </div>
      <div className='relative rounded-lg text-center w-full bg-neutral-200 dark:bg-neutral-600 h-6'>
        {user?.progress == 0 ? (
          <>
            <div
              className='rounded-lg mt-4 bg-neutral-600 p-0.5 text-center text-sm font-texto leading-none text-sin_derechos h-6'
              style={{ width: `100%` }}
            ></div>
            <div className='flex justify-center'>
              <span className='absolute top-0 font-texto text-md'>{user ? user.progress : 0}%</span>
            </div>
          </>
        ) : (
          <>
            <div
              className=' rounded-lg mt-4 bg-green-500 p-0.5 text-center text-sm font-texto leading-none text-sin_derechos h-6'
              style={{ width: `${user ? user.progress : 0}%` }}
            ></div>
            <div className='flex justify-center'>
              <span className='absolute top-0 font-texto text-md'>{user ? user.progress : 0}%</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
