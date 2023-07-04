'use client'
import React, { useEffect, useState, useContext } from 'react'
import { Html } from '@react-three/drei'
import Swal from 'sweetalert2'

// Config
import axios from 'axios'
import { apiUrl } from '@/config'

// Context
import { UserContext } from '@/context/UserProvider'
import { BookContext } from '@/context/BookProvider'

export function Hints({ setHint }) {
  // Estados
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [keys, setKeys] = useState([])

  // Contexto
  const { user, setUser } = useContext(UserContext)
  const { bookState, setBookState } = useContext(BookContext)

  // Funciones
  const handleClick = (key) => {
    if (key) {
      setBookState({ ...bookState, hint: key.hint })
      Swal.fire({
        title: 'PISTA',
        text: key.hint || 'No hay pistas para esta llave',
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

  // Hacer petición con axios para obtener todas las llaves
  const getKeys = async () => {
    try {
      const res = await axios.get(`${apiUrl}/keys`)
      setKeys(res.data)
    } catch (error) {
      Swal.fire({
        title: 'Error al obtener las llaves',
        // text: 'Hubo un error, comprueba tu conexión.',
        text: error,
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        color: '#F4DFB0',
        iconColor: '#F4DFB0',
        background: 'rgba(140,111,77,0.3)',
        // iconHtml: '<img src="/icons/login/advertencia.svg" alt="error" class="w-20 h-20">',
        customClass: {
          popup: 'rounded-3xl',
          container: 'rounded-xl',
          title: 'text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto',
          htmlContainer: 'text-amarillito text-3xl md:text-4xl xl:text-7xl font-bold mb-11 text-left font-texto',
          confirmButton: 'bg-moradito_palido text-amarillito font-texto text-xl p-4 rounded',
        },
      })
    }
  }

  // Obtener las llaves al cargar el componente
  useEffect(() => {
    getKeys()
  }, [])

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

  return (
    <>
      <Html
        position={[-1.85, 0, -1.2]}
        style={{
          width: windowSize.width * 0.18 + 'px',
          height: '400px',
          overflow: 'auto',
        }}
      >
        <h1 className='text-2xl md:text-4xl xl:text-3xl font-bold mb-4 text-center font-texto text-caca_clara'>
          PISTAS
        </h1>

        {keys.map((key, index) => {
          // Si el usuario no ha encontrado la llave, no se muestra
          if (user.keys.find((k) => k == key._id) == undefined) {
            return (
              <div
                key={`hint_${index}`}
                className='flex items-center justify-center hover:cursor-pointer'
                onClick={() => handleClick(key)}
              >
                <h3
                  className={`text-xl md:text-2xl xl:text-xl font-bold mb-3 xl:mb-3 text-left font-texto hover:cursor-pointer text-gray-500`}
                >
                  Llave #{index + 1}
                </h3>
                <img src='img/world/question.png' className='w-6 h-6 mb-4 ml-4' alt='Chulo' />
              </div>
            )
          } else {
            return (
              <div key={`hint_${index}`} className='flex items-center justify-center hover:cursor-pointer'>
                <h3
                  className={`text-xl md:text-2xl xl:text-xl font-bold mb-3 xl:mb-3 text-left font-texto  text-caca_clara`}
                >
                  Llave #{index + 1}
                </h3>
                <img src='icons/book/check.png' className='w-6 h-6 mb-4 ml-4' alt='Chulo' />
              </div>
            )
          }
        })}
      </Html>
    </>
  )
}
