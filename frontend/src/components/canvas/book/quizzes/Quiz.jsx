'use client'
import React, { useEffect, useRef, useState, useContext } from 'react'
import { DoubleSide, TextureLoader } from 'three'
import { useLoader, useThree, useFrame } from '@react-three/fiber'
// import ImageWall from './ImageWall'
import { Vector3 } from 'three'
import { Html } from '@react-three/drei'
import QuizQuestions from './QuizQuestions'

// Context
import { BookContext } from '@/context/BookProvider'

export function Quiz(props) {
  // Refs
  const quizRef = useRef()
  const imgWallRef = useRef()
  const { camera } = useThree()

  // Texturas
  const quizImage = '/img/book/quiz.png'
  const quizTexture = useLoader(TextureLoader, quizImage)
  const lore =
    props.text ||
    'Zeus, dios supremo del cielo, el trueno y el rayo,  padre de los dioses y los hombres.  Posee gran poder y es representado como un hombre barbudo con una poderosa figura.'

  // Estados
  const [currentTexture, setCurrentTexture] = useState(quizTexture)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  // Contextos
  const { bookState, setBookState } = useContext(BookContext)

  useEffect(() => {
    imgWallRef.current.rotation.x -= Math.PI / 2
  }, [])

  return (
    <>
      <mesh
        {...props}
        visible={!isQuizOpen}
        ref={imgWallRef}
        position={[-0.8, 0.5, -0.25]}
        onClick={() => {
          console.log('CLICKED QUIZ')
          setBookState({ ...bookState, isQuizOpen: true, quiz: props.quiz })
          setIsQuizOpen(true)
        }}
      >
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial map={currentTexture} color='white' side={DoubleSide} />
      </mesh>
    </>
  )
}
