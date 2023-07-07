'use client'
import React, { useEffect, useState, useContext } from 'react'
import { Html } from '@react-three/drei'
import Swal from 'sweetalert2'
import { UserContext } from '@/context/UserProvider'
import { BookContext } from '@/context/BookProvider'

export function IndexBook({ setBookPage, nextPage }) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Context
  const { user, setUser } = useContext(UserContext)
  const { bookState, setBookState } = useContext(BookContext)

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
  const handleClick = (number, percent) => {
    if (user.progress >= percent) {
      nextPage()
      setBookPage(number)
    } else {
      setBookState({ ...bookState, hint: 'Aún no tienes disponible esta sección, busca llaves y desbloqueala' })
      Swal.fire({
        title: 'NO DISPONIBLE',
        text: 'Aún no tienes disponible esta sección, busca llaves y desbloqueala.',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        color: '#F4DFB0',
        iconColor: '#F4DFB0',
        background: 'rgba(140,111,77)',
        backdrop: false,
        // iconHtml: '<img src="/icons/login/advertencia.svg" alt="error" class="w-20 h-20">',
        customClass: {
          popup: 'rounded-3xl',
          container: 'rounded-xl',
          title: 'text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto',
          htmlContainer: 'text-amarillito text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto',
          confirmButton: 'bg-moradito_palido text-amarillito font-texto text-xl p-4 rounded',
        },
      }).then(() => {
        setBookState({ ...bookState, hint: false })
      })
    }
  }
  return (
    <>
      <Html
        position={[0.2, 0, -1.2]}
        style={{
          width: windowSize.width * 0.18 + 'px',
          height: '250px',
          overflow: 'auto',
        }}
      >
        <h1 className='text-2xl md:text-4xl xl:text-3xl font-bold mb-4 text-center font-texto text-caca_clara'>
          INDICE
        </h1>

        <h3
          className={`text-xl md:text-2xl xl:text-xl font-bold mb-3 xl:mb-3 text-left font-texto hover:cursor-pointer ${
            user.progress < 20 ? 'text-gray-500' : 'text-caca_clara'
          }`}
          onClick={() => handleClick(0, 20)}
        >
          1. Mitologia
        </h3>
        <h3
          className={`text-xl md:text-2xl xl:text-xl font-bold mb-3 xl:mb-3 text-left font-texto hover:cursor-pointer ${
            user.progress < 40 ? 'text-gray-500' : 'text-caca_clara'
          }`}
          onClick={() => handleClick(4, 40)}
        >
          2. Figuras
        </h3>
        <h3
          className={`text-xl md:text-2xl xl:text-xl font-bold mb-3 xl:mb-3 text-left font-texto hover:cursor-pointer ${
            user.progress < 60 ? 'text-gray-500' : 'text-caca_clara'
          }`}
          onClick={() => handleClick(7, 60)}
        >
          3. Estructuras
        </h3>
        <h3
          className={`text-xl md:text-2xl xl:text-xl font-bold mb-3 xl:mb-3 text-left font-texto hover:cursor-pointer ${
            user.progress < 80 ? 'text-gray-500' : 'text-caca_clara'
          }`}
          onClick={() => handleClick(11, 80)}
        >
          4. Herramientas
        </h3>
        <h3
          className={`text-xl md:text-2xl xl:text-xl font-bold mb-3 xl:mb-3 text-left font-texto hover:cursor-pointer ${
            user.progress < 100 ? 'text-gray-500' : 'text-caca_clara'
          }`}
          onClick={() => handleClick(14, 100)}
        >
          5. Recomendaciones
        </h3>
      </Html>
    </>
  )
}
