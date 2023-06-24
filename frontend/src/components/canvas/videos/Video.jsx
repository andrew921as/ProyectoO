'use client'
import React, { useRef, useState, useEffect } from 'react'
import { DoubleSide, Vector3, TextureLoader } from 'three'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import VideoWall from './VideoWall'

export function AphroditeWall(props) {
  const videoUrl = props.videoUrl || 'https://www.youtube.com/watch?v=3hKapv64tGs'
  const { camera } = useThree()
  const videoRef = useRef()
  const aphrodite_img = props.texture || '/img/world/Aphrodite.jpg'
  const texture_aphrodite = useLoader(TextureLoader, aphrodite_img)

  const [currentTexture, setCurrentTexture] = useState(texture_aphrodite)
  const [isWallVisible, setWallVisibility] = useState(false)
  const [isImgVisible, setImgVisibility] = useState(true)

  const handleImage = (event) => {
    event.stopPropagation()
    if (isWallVisible == false) {
      setWallVisibility(true)
      setImgVisibility(false)
    }
  }

  useEffect(() => {
    videoRef.current.rotation.x -= Math.PI / 2
  }, [])
  useFrame(() => {
    const distanceFromCamera = 3.1 // Distancia deseada del libro a la cámara
    const offsetX = props.position[0] || -0.8 // Desplazamiento hacia la derecha en el eje X
    const offsetY = props.position[1] || -0.5 // Desplazamiento hacia arriba
    const offsetZ = props.position[2] || -0.25 // Desplazamiento hacia adelante

    const cameraDirection = camera.getWorldDirection(new Vector3())
    const offset = cameraDirection.clone().multiplyScalar(distanceFromCamera)

    // Aplicar desplazamiento hacia adelante
    const offsetForward = cameraDirection.clone().multiplyScalar(offsetZ)
    offset.add(offsetForward)

    // Aplicar desplazamiento hacia la derecha solo en X y Z
    const cameraRight = new Vector3(cameraDirection.z, 0, -cameraDirection.x).normalize()
    offset.add(cameraRight.clone().multiplyScalar(offsetX))

    // Calcular la dirección hacia arriba relativa
    const cameraUp = new Vector3().crossVectors(cameraRight, cameraDirection).normalize()
    offset.add(cameraUp.clone().multiplyScalar(offsetY))

    const targetPosition = camera.position.clone().add(offset)
    videoRef.current.position.copy(targetPosition)

    // Ajustar la rotación para mantener la imagen recta
    const targetRotation = cameraDirection.clone().multiplyScalar(-1)
    videoRef.current.lookAt(targetRotation.add(videoRef.current.position))
  }, [])

  return (
    <>
      <mesh ref={videoRef} visible={isImgVisible} onClick={handleImage} receiveShadow dispose={null}>
        <planeGeometry args={[1.4, 0.8]} />
        <meshBasicMaterial map={currentTexture} side={DoubleSide} />
      </mesh>
      <VideoWall
        visible={isWallVisible}
        onContextMenu={() => {
          setWallVisibility(false)
          setImgVisibility(true)
        }}
        url={videoUrl}
      />
    </>
  )
}
