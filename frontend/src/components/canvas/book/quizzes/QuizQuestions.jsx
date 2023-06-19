'use client'
import React, { useRef, useEffect, useState } from 'react'
import { DoubleSide, TextureLoader, Vector3 } from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Html, Text } from '@react-three/drei'



// ! DEPRECATED
export default function QuizQuestions() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

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
        style={{
          width: windowSize.width * 0.8 + 'px',
          height: '400px',
          overflow: 'auto',
          backgroundColor: 'red',
        }}
        // scale={[1.2, 3, 3]}
        position={[0, 0, 0]}
        // transform={[0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, -1, 1, 0, 1]}
        top={0}
        left={0}
      >
        <h1 style={{}} className='bg-sin_derechos text-white bg-opacity-20 rounded-md w-full'>
          HOLA MUNDO
        </h1>
      </Html>
    </>
  )
}
