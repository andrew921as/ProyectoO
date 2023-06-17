'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { Vector3, TextureLoader, DoubleSide } from 'three'
import dynamic from 'next/dynamic'
import ImageWall from '../stickers/ImageWall'
import { GLTFLoader } from 'three-stdlib'

export function Book({
  updateState,
  flagPageBookState,
  setIsImgOpen,
  setIsVidOpen,
  bookPage,
  setBookPage,
  setAnimationPage,
}) {
  const group = useRef()
  const sticker = useRef()
  const indexRef = useRef()
  const { nodes, materials, animations } = useGLTF('/models/book/book.glb')
  const { actions } = useAnimations(animations, group)
  const zeus_img = '/img/world/zeus.jpeg'
  const texture_zeus = useLoader(TextureLoader, zeus_img)
  const lore = 'Zeus, ruler of all Gods'
  const NextPage = dynamic(() => import('@/components/canvas/book/NextPage').then((mod) => mod.NextPage), {
    ssr: false,
  })
  const PreviousPage = dynamic(() => import('@/components/canvas/book/PreviousPage').then((mod) => mod.PreviousPage), {
    ssr: false,
  })
  const [currentTexture, setCurrentTexture] = useState(texture_zeus)
  const [isWallVisible, setWallVisibility] = useState(false)
  const [isReproduceAnimation, setReproduceAnimation] = useState(false)
  const [isImgVisible, setImgVisibility] = useState(true)
  const [text, setText] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const { camera } = useThree()

  const handleImage = (event) => {
    event.stopPropagation()
    if (isWallVisible == false) {
      // setCurrentTexture(texture_flash);
      setWallVisibility(true)
      setImgVisibility(false)
      setText(lore)
    }
  }

  const nextPage = () => {
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

  const previousPage = () => {
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
  }, [updateState])

  useFrame(() => {
    const distanceFromCamera = 3.5 // Distancia deseada del libro a la cámara

    const cameraDirection = camera.getWorldDirection(new Vector3())
    const targetPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera))
    // const targetImgPosition = camera.position.clone().add(cameraDirection.multiplyScalar(distanceFromCamera-0.5));
    group.current.position.copy(targetPosition) 
    if(bookPage == 0){
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
      <NextPage flagPageBookState={flagPageBookState} />
      <PreviousPage flagPageBookState={flagPageBookState} />

      <group ref={group} dispose={null}>
        <mesh visible={isImgVisible} ref={sticker} receiveShadow dispose={null} onClick={handleImage}>
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
        />
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
            position={[1.26, 0.3, 1]}
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
            // material={materials['Material.002']}
            material={materials['lock.004']}
            scale={[0.2, 0.27, 0.13]}
            position={[-1.83, 0.3, 1]}
            rotation={[0, 0, -1.54]}
            onClick={() => {
              // console.log('CLICKEEEED')
              previousPage()
            }}
          />
          {bookPage == 0 && (
            <>
              <Html ref={indexRef}>
                <h1 onClick={console.log("1")}>Hello world</h1>
              </Html>
            </>
          )}
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/book.glb')
