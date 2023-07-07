'use client'

import React, { useState, useContext, useEffect } from 'react'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Contextos
import { UserContext } from '@/context/UserProvider'
import { BookContext } from '@/context/BookProvider'

export const Help = ({ onClick }) => {

  // Estados
  const [showMessage, setShowMessage] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

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

  //Obtener el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Agregar un listener para actualizar el tamaño de la ventana
    if (typeof window !== 'undefined') {
      handleResize() // Obtener el tamaño de la ventana inicial
      window.addEventListener('resize', handleResize) // Actualizar el tamaño de la ventana al cambiar su tamaño
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize) // Eliminar el evento de cambio de tamaño al desmontar el componente
      }
    }
  }, [])


  if (showMessage) {
    return (
      <div className="relative flex items-center justify-center w-screen h-screen bg-sin_derechos bg-opacity-80 z-50">

        {/* Botón de cerrar */}
        <div className="absolute font-texto text-6xl text-amarillito top-[40px] right-[230px] cursor-pointer" onClick={() => handleOnClose()}>X</div>

        <img style={{ height: windowSize.height * 0.95 }} src='/img/world/guia.png' alt="Guía de usuario" />
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