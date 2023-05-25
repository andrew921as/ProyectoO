'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'
import { Html } from '@react-three/drei'

// React Components
import { Modal } from '../../src/components/elements/Modal'
import { Book } from '../../src/components/elements/Book'

// React Three Fiber Components
const World = dynamic(() => import('@/components/canvas/world/World').then((mod) => mod.ModelWorld), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
// cambio para el commit
export default function Page() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

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
  // const [windowSize, setWindowSize] = useState({
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   });

  // useEffect(() => {
  //     function handleResize() {
  //         setWindowSize({
  //             width: window.innerWidth,
  //             height: window.innerHeight
  //         });
  //     }

  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <>
      <div className='z-10 mx-auto flex w-full h-full flex-col flex-wrap items-center'>
        <View
          orbit
          className='relative flex h-full w-full flex-col items-center justify-center bg-blue-700 bg-opacity-50'
        >
          <Html
            as='div'
            style={{
              width: '100vw',
              height: '100vh',
              position: 'relative',
              top: -windowSize.height / 2,
              left: -windowSize.width / 2,
            }}
          >
            <Modal />
            <Book />
          </Html>

          {/* <Logo route='/blob' scale={0.6} position={[0, 0, 0]} /> */}
          <World />

          <Common />
        </View>
        {/* </div> */}
      </div>
    </>
  )
}
