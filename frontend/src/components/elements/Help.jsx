'use client'

import React, { useState, useContext } from 'react'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Contextos
import { UserContext } from '@/context/UserProvider'
import { BookContext } from '@/context/BookProvider'

export const Help = ({ onClick }) => {

  // Estados
  const [showMessage, setShowMessage] = useState(false);

  // Contextos
  const { bookState, setBookState } = useContext(BookContext);

  const handleOnClick = () => {
    setShowMessage(true);
    setBookState({ ...bookState, isHelpOpen: true });
  };

  const handleOnClose = () => {
    setShowMessage(false);
    setBookState({ ...bookState, isHelpOpen: false })
  };
  

  if (showMessage){
    return (
      <div className="relative flex items-center justify-center w-full h-full bg-sin_derechos bg-opacity-80 z-50">

        {/* Botón de cerrar */}
        <div className="absolute font-texto text-6xl text-amarillito top-20 right-20 cursor-pointer" onClick={() => handleOnClose()}>X</div>

        <div className="w-10/12 h-10/12 z-60">
          <img src='/img/world/guia.png'alt="Guía de usuario" />
        </div>
      </div>
    )
  }
  


  return (
    <div
      onClick={handleOnClick}
      className='absolute cursor-pointer top-4 left-4 w-20 h-20 rounded-md'
    >
      <div className='flex justify-center items-center w-full h-full'>
        <img src='/img/world/question.png' alt='GIF' className='w-16 h-16 object-cover' />
      </div>
      {showMessage && (
        <div className="absolute top-6 left-20 bg-white p-2 rounded-md shadow">
          <p> Usalo en caso de necesitar ayuda</p>
        </div>
      )}
    </div>
  );
};