'use client'

import React, { useState, useContext } from 'react'
import { UserContext } from '@/context/UserProvider'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

export const Modal = ({ setIsChangeAvatarOpen }) => {
  const { user, setUser } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseMenu = () => {
    setIsOpen(false)
  }

  console.log(user)

  return (
    <>
      <div
        className='cursor-pointer absolute right-5 top-5 rounded-full bg-blue-500 h-20 w-20 flex items-center justify-center'
        onClick={handleToggleMenu}
      >
        {user && (
          <img src={user.avatar} alt='Foto de perfil' className='z-20 w-full h-full object-cover rounded-full' />
        )}
      </div>

      {isOpen && (
        <div className='absolute right-4 top-28'>
          <ul className='font-texto shadow-lg rounded-lg py-2 bg-sin_derechos bg-opacity-75'>
            <li className='px-4 py-2 text-amarillito'>Conocimiento: {user ? user.points : 0}</li>
            <div className='w-full h-[2px] bg-amarillito' />
            <li
              className='block px-4 py-2 text-con_derechos hover:bg-gray-200'
              onClick={() => setIsChangeAvatarOpen(true)}
            >
              Cambiar avatar
            </li>
            <li>
              <Link
                href='/initialS'
                className='block px-4 py-2 text-con_derechos hover:bg-gray-200'
                onClick={handleCloseMenu}
              >
                Cerrar sesión
              </Link>
            </li>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: ' 20px solid transparent',
                borderRight: ' 20px solid transparent',
                borderBottom: '40px solid #0E0F15',
                opacity: 0.75,
              }}
              className='z-10 absolute right-[28px] -top-[39px] w-8 h-8 transform'
            />
          </ul>
          {/* <div className="absolute right-5 -top-2 w-8 h-8">
              <div className="bg-sin_derechos opacity-50 w-full h-full transform rotate-45" />
            </div> */}
        </div>
      )}
    </>
  )
}
