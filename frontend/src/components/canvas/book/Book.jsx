'use client'

import React, { useEffect, useRef, useState, useContext } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { Vector3, TextureLoader, DoubleSide } from 'three'
import dynamic from 'next/dynamic'
import ImageWall from '../stickers/ImageWall'
import { GLTFLoader } from 'three-stdlib'

// Context
import { UserContext } from '@/context/UserProvider'
import { BookContext } from '@/context/BookProvider'

// Data
import { stickers } from 'public/data/stickers'
import { videos } from 'public/data/videos'
import { questions } from 'public/data/quices'

const sections = [
  {
    title: 'Sección 1, mitología',
    description: 'En esta sección encontrarás información sobre los dioses y cr más importantes de la mitología griega',
    start: 0,
    end: 4,
  },
  {
    title: 'Sección 2, figuras',
    description: 'En esta sección encontrarás información sobre las figuras más importantes de la antigua grecia',
    start: 4,
    end: 7,
  },
  {
    title: 'Sección 3, estructuras',
    description: 'En esta sección encontrarás información sobre las estructuras y edificaciones más importantes de la antigua grecia',
    start: 7,
    end: 11,
  },
  {
    title: 'Sección 4, herramientas',
    description: 'En esta sección encontrarás información sobre las herramientas más importantes de la antigua grecia',
    start: 21,
    end: 27,
  },
  {
    title: 'Sección 5, recomendaciones',
    description: 'En esta sección encontrarás recomendaciones de libros, peliculas y juegos relacionados con la antigua grecia',
    start: 28,
    end: 34,
  },
]

// Modelo Libro 3D
export function Book({ isBookOpen, setAnimationPage, animationPage }) {
  // Referencias
  const group = useRef()
  const sticker = useRef()
  const indexRef = useRef()

  // modelo
  const { nodes, materials, animations } = useGLTF('/models/book/book.glb')
  const { actions } = useAnimations(animations, group)
  const zeus_img = '/img/world/zeus.jpeg'
  const texture_zeus = useLoader(TextureLoader, zeus_img)
  const arrow_img = '/img/world/arrow.png'
  const texture_arrow = useLoader(TextureLoader, arrow_img)
  const lore = 'Zeus, ruler of all Gods'

  // Importaciones de elementos 3D
  const Sticker = dynamic(() => import('@/components/canvas/stickers/Sticker').then((mod) => mod.ZeusWall), {
    ssr: false,
  })
  const Video = dynamic(() => import('@/components/canvas/videos/Video').then((mod) => mod.AphroditeWall), {
    ssr: false,
  })
  const Quiz = dynamic(() => import('@/components/canvas/book/quizzes/Quiz').then((mod) => mod.Quiz), {
    ssr: false,
  })
  const IndexB = dynamic(() => import('@/components/canvas/book/IndexBook').then((mod) => mod.IndexBook), {
    ssr: false,
  })
  const NextPage = dynamic(() => import('@/components/canvas/book/NextPage').then((mod) => mod.NextPage), {
    ssr: false,
  })
  const PreviousPage = dynamic(() => import('@/components/canvas/book/PreviousPage').then((mod) => mod.PreviousPage), {
    ssr: false,
  })

  // Estados del libro
  const [sectionsUnlocked, setSectionsUnlocked] = useState(3)
  const [bookPage, setBookPage] = useState(0)
  const [isImgOpen, setIsImgOpen] = useState(false)
  const [isVidOpen, setIsVidOpen] = useState(false)
  const [visibleStickers, setVisibleStickers] = useState([])
  const [visibleVideos, setVisibleVideos] = useState([])
  const [visibleQuizzes, setVisibleQuizzes] = useState([])
  const [arrowTexture, setArrowTexture] = useState(texture_arrow)

  const [flagPageBookState, setFlagPageBookState] = useState(false)

  const updateState = (newValue) => {
    setFlagPageBookState(newValue)
  }

  // Contextos
  const { user, setUser } = useContext(UserContext)
  const { bookState, setBookState } = useContext(BookContext)

  // Verificar que quizzes el usuario a finalizado
  useEffect(() => {
    const quizzes = bookState.quizzes

    // Actualizar el estado del libro, para ocultar los quizzes que el usuario ya completó de acuerdo a los puntos que tiene
    if (user?.points === 100) {
      quizzes[0].isFinished = true
    }

    if (user?.points === 200) {
      quizzes[1].isFinished = true
    }

    if (user?.points === 300) {
      quizzes[2].isFinished = true
    }

    if (user?.points === 400) {
      quizzes[3].isFinished = true
    }

    // Actualizar el estado del libro, para ocultar los quizzes que el usuario ya completó
    setBookState({
      ...bookState,
      quizzes,
    })

    // Actualizar las zonas desbloqueadas
    if (user.progress == 0) setSectionsUnlocked(0)
    if (user.progress == 20) setSectionsUnlocked(1)
    if (user.progress == 40) setSectionsUnlocked(2)
    if (user.progress == 60) setSectionsUnlocked(3)
    if (user.progress == 80) setSectionsUnlocked(4)
    if (user.progress == 100) setSectionsUnlocked(5)
  }, [user])

  // Filtrar los sticker, videos y quizzes visibles por página
  useEffect(() => {
    if (bookPage == -1) {
      setBookPage(0)
    } else if (bookPage == sections[sectionsUnlocked - 1].end + 1) {
      setBookPage(sections[sectionsUnlocked - 1].end)
    } else {
      const filteredStickers = stickers.filter((sticker) => {
        return sticker.page === bookPage
      })
      setVisibleStickers(filteredStickers)

      const filteredVideos = videos.filter((video) => {
        return video.page === bookPage
      })
      setVisibleVideos(filteredVideos)

      const filteredQuizzes = bookState.quizzes.filter((quiz) => {
        return quiz.page === bookPage && !quiz.isFinished
      })
      setVisibleQuizzes(filteredQuizzes)
    }
  }, [bookPage, bookState])

  useEffect(() => {
    if (!isBookOpen) {
      setFlagPageBookState(false)

      // Ocultar el sticker y el video
      setIsImgOpen(false)
      setIsVidOpen(false)
    } else {
      // Mostrar el sticker y el video después de 3 segundos
      setTimeout(() => {
        setIsImgOpen(true)
        setIsVidOpen(true)
        setFlagPageBookState(true)
      }, 3000)
    }
  }, [isBookOpen])

  const [isReproduceAnimation, setReproduceAnimation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { camera } = useThree()

  const nextPage = () => {
    if (bookPage == sections[sectionsUnlocked - 1].end) return
    setAnimationPage(true)
    // console.log("AAA", isReproduceAnimation);
    actions['NextPage'].repetitions = 1 // Repetir animación una vez
    actions['NextPage'].reset() // Detener la animación en el último frame
    actions['NextPage'].timeScale = 1 // No poner la animación en reversa
    actions['NextPage'].play() // Reproducir animación si hay una definida en el modelo

    // Ocultar el sticker y el video
    setIsImgOpen(false)
    setIsVidOpen(false)

    // Esperar a que termine la animación para cambiar de página
    setTimeout(() => {
      setBookPage(bookPage + 1)
    }, 1000)

    // Mostrar el sticker y el video
    setTimeout(() => {
      setIsImgOpen(true)
      setIsVidOpen(true)
      setAnimationPage(false)
    }, 1000)
  }

  const nextPageIndex = () => {
    if (bookPage == sections[sectionsUnlocked - 1].end) return
    setAnimationPage(true)
    // console.log("AAA", isReproduceAnimation);
    actions['NextPage'].repetitions = 1 // Repetir animación una vez
    actions['NextPage'].reset() // Detener la animación en el último frame
    actions['NextPage'].timeScale = 1 // No poner la animación en reversa
    actions['NextPage'].play() // Reproducir animación si hay una definida en el modelo

    // Ocultar el sticker y el video
    setIsImgOpen(false)
    setIsVidOpen(false)

    // Mostrar el sticker y el video
    setTimeout(() => {
      setIsImgOpen(true)
      setIsVidOpen(true)
      setAnimationPage(false)
    }, 1000)
  }

  const previousPage = () => {
    if (bookPage == 0) return
    setAnimationPage(true)
    // console.log("AAA", isReproduceAnimation);
    actions['NextPage'].repetitions = 1 // Repetir animación una vez
    actions['NextPage'].reset() // Detener la animación en el último frame
    actions['NextPage'].timeScale = -1 // Poner la animación en reversa
    actions['NextPage'].play() // Reproducir animación si hay una definida en el modelo

    // Ocultar el sticker y el video
    setIsImgOpen(false)
    setIsVidOpen(false)

    // Esperar a que termine la animación para cambiar de página
    setTimeout(() => {
      setBookPage(bookPage - 1)
    }, 1000)

    // Mostrar el sticker y el video
    setTimeout(() => {
      setIsImgOpen(true)
      setIsVidOpen(true)
      setAnimationPage(false)
    }, 1000)
  }

  useEffect(() => {
    // console.log("aaa",isReproduceAnimation);
    if (isReproduceAnimation) {
      const action = actions['NextPage']
      action.reset().fadein(0.1).play().repetitions = 1

      return () => {
        action.fadeout(0.5)
      }
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const loader = new GLTFLoader()
    loader.load('/models/book/book.glb', (gltf) => {
      // Aquí puedes realizar cualquier operación adicional en el modelo cargado

      // Desactiva el estado de carga cuando el modelo esté completamente cargado
      setIsLoading(false)
    })
    actions['ArmatureAction'].repetitions = 1 // Repetir animación una vez
    actions['ArmatureAction'].clampWhenFinished = true // Detener la animación en el último frame
    actions['ArmatureAction'].play() // Reproducir animación si hay una definida en el modelo
    group.current.rotation.z += Math.PI / 2 // Rotación de 90 grados alrededor del eje Y
    // sticker.current.rotation.x -= Math.PI /2;

    // actions["ArmatureAction"].isRunning() ? funtionsS : null
    // actions["ArmatureAction"].isRunning()? updateState(true) : null
    // updateState(true)

    setTimeout(() => {
      updateState(true)
    }, 3000)
  }, [isBookOpen])

  useFrame(() => {
    const distanceFromCamera = 3.5 // Distancia deseada del libro a la cámara

    const cameraDirection = camera.getWorldDirection(new Vector3())
    const targetPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera))
    // const targetImgPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera-0.5));
    group.current.position.copy(targetPosition)
    if (bookPage == 0 && indexRef.current) {
      indexRef.current.position = [targetPosition.x, targetPosition.y, targetPosition.z]
    }
    group.current.lookAt(camera.position)

    // const stickerOffsetX = 1; // Offset horizontal hacia la derecha
    // const stickerOffsetY = 0.5; // Offset vertical hacia arriba
    // const stickerOffsetZ = 3; // Offset vertical hacia arriba
    // sticker.current.position.copy(targetImgPosition);
    // sticker.current.position.x = camera.position.x;
    // sticker.current.position.y = camera.position.y;
    // sticker.current.position.z = camera.position.z;
    // sticker.current.lookAt(camera.position);
  }, [])

  return (
    <>
      {/* Mostrar stickers */}
      {isImgOpen &&
        visibleStickers.map((sticker) => {
          return <Sticker key={'sticker_' + sticker.stickerId} {...sticker} />
        })}

      {/* Mostrar videos */}
      {isVidOpen &&
        visibleVideos.map((video) => {
          return <Video key={'video_' + video.videoId} {...video} />
        })}

      <NextPage flagPageBookState={flagPageBookState} />
      <PreviousPage flagPageBookState={flagPageBookState} />

      <group ref={group} dispose={null}>
        {/* <mesh visible={isImgVisible} ref={sticker} receiveShadow dispose={null} onClick={handleImage}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={currentTexture} color='whitered' side={DoubleSide} />
        </mesh>
        <ImageWall
          visible={isWallVisible}
          onClick={() => {
            setWallVisibility(false)
            setText('')
            setImgVisibility(true)
          }}
          texture={currentTexture}
          text={text}
        /> */}
        <group rotation-x={Math.PI / 2} name='Scene'>
          <group name='Armature'>
            <primitive object={nodes.Base} />
            <primitive object={nodes.RFlap} />
            <skinnedMesh
              name='Plano'
              geometry={nodes.Plano.geometry}
              material={materials['Material.005']}
              skeleton={nodes.Plano.skeleton}
            />
            <skinnedMesh
              name='Plano001'
              geometry={nodes.Plano001.geometry}
              material={materials['Material.005']}
              skeleton={nodes.Plano001.skeleton}
            />
            {/* Mostrar quizzes y siguiente sección */}
            {!animationPage &&
              visibleQuizzes.map((quiz) => {
                return (
                  <>
                    <Quiz key={'quiz_' + quiz.quizId} quiz={quiz} />
                  </>
                )
              })}
            {bookPage == 0 && <IndexB setBookPage={setBookPage} nextPage={nextPageIndex} />}

            {/* Mensaje de introducción para la sección 2, la cual trata sobre figuras de la antigua grecia*/}
            {sections.map((section, index) => {
              if (bookPage == section.start && !bookState.isQuizOpen && index !== 0) {
                return (
                  <Html key={`section_${index}`} position={[0.2, 0.5, -0.5]}>
                    <div className=' w-[200px] h-40'>
                      <div className=''>
                        <h1 className='text-xl xxl:text-4xl font-texto text-caca_clara text-center'>{section.title}</h1>
                        <p className='font-texto text-caca_clara text-center'>{section.description}</p>
                      </div>
                    </div>
                  </Html>
                )
              }
            })}
            <group name='Magic_Book'>
              <skinnedMesh
                name='Cube005'
                geometry={nodes.Cube005.geometry}
                material={materials['book.004']}
                skeleton={nodes.Cube005.skeleton}
              />
              <skinnedMesh
                name='Cube005_1'
                geometry={nodes.Cube005_1.geometry}
                material={materials['lock.004']}
                skeleton={nodes.Cube005_1.skeleton}
              />
              <skinnedMesh
                name='Cube005_2'
                geometry={nodes.Cube005_2.geometry}
                material={materials['center eye.004']}
                skeleton={nodes.Cube005_2.skeleton}
              />
              <skinnedMesh
                name='Cube005_3'
                geometry={nodes.Cube005_3.geometry}
                material={materials['crystals.004']}
                skeleton={nodes.Cube005_3.skeleton}
              />
              <skinnedMesh
                name='Cube005_4'
                geometry={nodes.Cube005_4.geometry}
                material={materials['venzels.004']}
                skeleton={nodes.Cube005_4.skeleton}
              />
              <skinnedMesh
                name='Cube005_5'
                geometry={nodes.Cube005_5.geometry}
                material={materials['corners.004']}
                skeleton={nodes.Cube005_5.skeleton}
              />
              <skinnedMesh
                name='Cube005_6'
                geometry={nodes.Cube005_6.geometry}
                material={materials['pages.004']}
                skeleton={nodes.Cube005_6.skeleton}
              />
            </group>
          </group>
          <mesh
            name='Plano002'
            visible={flagPageBookState}
            castShadow
            receiveShadow
            geometry={nodes.Plano002.geometry}
            material={materials['Material.002']}
            // material={materials['lock.004']}
            scale={[0.2, 0.27, 0.13]}
            position={[1.4, 0.3, 1.1]}
            rotation={[0, 0, -1.54]}
            onClick={() => {
              nextPage()
            }}
          />
          <mesh
            name='Plano003'
            visible={flagPageBookState}
            castShadow
            receiveShadow
            geometry={nodes.Plano002.geometry}
            material={arrowTexture}
            // material={materials['lock.004']}
            scale={[0.2, 0.27, 0.13]}
            position={[-1.75, 0.7, 1]}
            rotation={[0, 0, -1.54]}
            onClick={() => {
              // console.log('CLICKEEEED')
              previousPage()
            }}
          />
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/book.glb')
