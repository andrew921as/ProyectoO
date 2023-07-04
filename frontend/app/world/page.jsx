'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import { Color, MeshStandardMaterial } from 'three'
import { Html, KeyboardControls, Loader, Environment } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/UserProvider'
import { BookContext } from '@/context/BookProvider'
// React Components
import { Modal } from '../../src/components/elements/Modal'
import { Book } from '../../src/components/elements/Book'
import { QuizInterface } from '@/components/elements/QuizInterface'

// Data
import { labels } from 'public/data/labels'
import { apiUrl } from '@/config'

// React Three Fiber Components
const BookModel = dynamic(() => import('@/components/canvas/book/Book').then((mod) => mod.Book), { ssr: false })

const TiamatStatue = dynamic(() => import('@/components/canvas/world/decorations/Tiamat').then((mod) => mod.Tiamat), { ssr: false })
const Crane = dynamic(() => import('@/components/canvas/world/decorations/Crane').then((mod) => mod.Crane), { ssr: false })
const Dagger = dynamic(() => import('@/components/canvas/world/decorations/Dagger').then((mod) => mod.Dagger), { ssr: false })
const Kratos = dynamic(() => import('@/components/canvas/world/decorations/Kratos').then((mod) => mod.Kratos), { ssr: false })
const Sword = dynamic(() => import('@/components/canvas/world/decorations/Sword').then((mod) => mod.Sword), { ssr: false })
const Shield = dynamic(() => import('@/components/canvas/world/decorations/Shield').then((mod) => mod.Shield), { ssr: false })
const Key = dynamic(() => import('@/components/canvas/world/Keys').then((mod) => mod.Key), { ssr: false })


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
const Player = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Player), { ssr: false })
const keyboardControls = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
]
// cambio para el commit

export default function Page() {
  const [isShiftPressed, setIsShiftPressed] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Estados del libro
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [animationPage, setAnimationPage] = useState(false)

  // Estado de las llaves
  const [visibleKeys, setVisibleKeys] = useState([])

  const book = <BookModel isBookOpen={isBookOpen} animationPage={animationPage} setAnimationPage={setAnimationPage} />

  const router = useRouter()
  const loaderRef = useRef()

  // Contextos
  const { user, setUser } = useContext(UserContext)
  const { bookState, setBookState } = useContext(BookContext)

  // Variable HDRI para el cielo
  const env = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/industrial_sunset_02_puresky_4k.hdr'

  //Verifica que haya un usuario en el localstorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      //Si no hay usuario en el localstorage, lo redirige al login
      router.push('/login')
    }
  }, [])

  // Filtra las llaves que tiene el usuario
  useEffect(() => {
    if (user) {
      axios.get(apiUrl + '/keys').then((response) => {
        const allKeys = response.data

        // Quita del array de llaves visibles las llaves que ya tiene el usuario
        const keys = user.keys
        const visibleKeys = allKeys.filter((key) => !keys.includes(key._id))

        setVisibleKeys(visibleKeys)

        // Quita
        console.log('RESPUESTA:', response.data)
      })

      // Guarda el usuario actualizado en el localStorage
      localStorage.setItem('user', JSON.stringify(user))

    }
  }, [user])

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

  // Verifica si el usuario presiona la tecla shift
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Shift') {
        setIsShiftPressed(true)
      }
    }

    const handleKeyUp = (event) => {
      if (event.key === 'Shift') {
        setIsShiftPressed(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    // Limpia los listeners al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <Suspense fallback={<Loader />}>
      {/* <div className='absolute z-20 top-0 right-[400px] left-0 bottom-[300px] flex items-center justify-center'>
        <div className='bg-red-500 w-32 h-32'></div>
      </div > */}

      {/* Modal */}
      <div className='absolute z-20 top-0 right-0'>
        <Modal />
      </div>

      {/* Book */}
      <div className='absolute z-20 bottom-0 right-0'>
        <Book
          onClick={() => {
            // handleshowImg()
            setIsBookOpen(!isBookOpen)
          }}
        />
      </div>

      {/* Quiz interface */}
      {bookState.isQuizOpen && (
        <div
          style={{
            width: windowSize.width * 0.8 + 'px',
            height: windowSize.height * 0.9 + 'px',
          }}
          className='fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        >
          <QuizInterface />
        </div>
      )}

      {!animationPage && (
        <div className='absolute z-20 right-0 left-0 top-0 bottom-0 m-auto w-1 h-1'>
          <Loader />
        </div>
      )}
      <div className='z-10 mx-auto flex w-full h-full flex-col flex-wrap items-center'>
        <View
          orbit
          className='absolute flex h-full w-full flex-col items-center justify-center bg-blue-700 bg-opacity-50'
          isBookOpen={isBookOpen}
          castShadow={false}
        >
          <Environment files={env} ground={{ height: 5, radius: 4096, scale: 400 }} />
          <KeyboardControls map={keyboardControls}>
            <Suspense>
              <World isBookOpen={isBookOpen} labels={labels} castShadow={false}/>

              <TiamatStatue />
              <Crane />
              {/* <Dagger /> */}
              <Kratos />
              <Sword />
              <Shield />

              {visibleKeys.map((key, index) => (
                <Key key={'key_' + index} scale={0.02} position={key.position} _id={key._id} />
              ))}

              <Player walkVelocity={isShiftPressed ? 15 : 5} />
              {isBookOpen && book}

              <Common />
            </Suspense>
          </KeyboardControls>
        </View>
        {/* <div className='absolute z-20 right-0 left-0 top-0 bottom-0 m-auto w-1 h-1'>
          <Loader />
        </div> */}

        {/* </div> */}
      </div>
    </Suspense>
  )
}
